"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BOARD_HEIGHT, BOARD_WIDTH, COLOURS, MAX_STROKE_POINTS, STORAGE_KEY, boardViewport, boundDrawing, makePoint, paintDrawing, paintSegment, parseDrawing, serialiseDrawing, type Colour, type Drawing, type Stroke } from "./drawing";
import styles from "./DrawingBoard.module.css";

const SIZES = [{ name: "Fine", value: 4 }, { name: "Medium", value: 8 }, { name: "Broad", value: 15 }];
const DEFAULT_STATUS = "";

export default function DrawingBoard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<Drawing>([]);
  const history = useRef<Drawing[]>([]);
  const future = useRef<Drawing[]>([]);
  const active = useRef<{ stroke: Stroke; pointerId: number } | null>(null);
  const dimensions = useRef({ width: 0, height: 0, ratio: 1 });
  const ready = useRef(false);
  const [colour, setColour] = useState<Colour>("white");
  const [size, setSize] = useState(8);
  const [tool, setTool] = useState<"chalk" | "eraser">("chalk");
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [available, setAvailable] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [boardBounds, setBoardBounds] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [counts, setCounts] = useState({ undo: 0, redo: 0, strokes: 0 });

  const updateCounts = useCallback(() => {
    setCounts({ undo: history.current.length, redo: future.current.length, strokes: drawing.current.length });
  }, []);

  const configureContext = useCallback(() => {
    const context = canvas.current?.getContext("2d");
    if (!context) return null;
    const { width, height, ratio } = dimensions.current;
    const view = boardViewport(width, height);
    context.setTransform(ratio * view.scale, 0, 0, ratio * view.scale, ratio * view.x, ratio * view.y);
    return context;
  }, []);

  const redraw = useCallback(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, element.width, element.height);
    configureContext();
    paintDrawing(context, drawing.current);
    if (active.current) paintDrawing(context, [active.current.stroke]);
  }, [configureContext]);

  const save = useCallback(() => {
    if (!ready.current) return;
    try {
      const strokes = active.current ? boundDrawing([...drawing.current, active.current.stroke]).strokes : drawing.current;
      window.sessionStorage.setItem(STORAGE_KEY, serialiseDrawing(strokes));
      setStatus(DEFAULT_STATUS);
    } catch {
      setStatus("Your drawing still works here, but this browser cannot save it when you leave or reload.");
    }
  }, []);

  const commit = useCallback((strokes: Drawing) => {
    history.current = [...history.current.slice(-39), drawing.current];
    future.current = [];
    const bounded = boundDrawing(strokes);
    drawing.current = bounded.strokes;
    updateCounts();
    save();
    if (bounded.trimmed) {
      setStatus("Some older strokes were removed to keep this drawing responsive.");
      redraw();
    }
  }, [redraw, save, updateCounts]);

  const finishStroke = useCallback(() => {
    if (!active.current) return;
    const current = active.current;
    active.current = null;
    setIsDrawing(false);
    if (canvas.current?.hasPointerCapture(current.pointerId)) canvas.current.releasePointerCapture(current.pointerId);
    commit([...drawing.current, current.stroke]);
  }, [commit]);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        drawing.current = parseDrawing(stored);
        const restoredUndoCount = Math.min(40, drawing.current.length);
        history.current = Array.from({ length: restoredUndoCount }, (_, index) => drawing.current.slice(0, drawing.current.length - restoredUndoCount + index));
      }
    } catch {
      setStatus("The previous drawing could not be restored. You can start a fresh one here.");
    }
    ready.current = true;
    updateCounts();
    const element = canvas.current;
    if (!element || !element.getContext("2d")) {
      setAvailable(false);
      return;
    }
    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2, 4096 / Math.max(width, height), Math.sqrt(8000000 / (width * height)));
      dimensions.current = { width, height, ratio };
      const view = boardViewport(width, height);
      setBoardBounds({ left: view.x, top: view.y, width: BOARD_WIDTH * view.scale, height: BOARD_HEIGHT * view.scale });
      element.width = Math.max(1, Math.round(width * ratio));
      element.height = Math.max(1, Math.round(height * ratio));
      redraw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener("resize", resize);
    window.addEventListener("pagehide", save);
    resize();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pagehide", save);
      try {
        const strokes = active.current ? [...drawing.current, active.current.stroke] : drawing.current;
        window.sessionStorage.setItem(STORAGE_KEY, serialiseDrawing(strokes));
      } catch {}
    };
  }, [redraw, save, updateCounts]);

  const pointFromEvent = (event: PointerEvent) => {
    const element = canvas.current!;
    const view = boardViewport(dimensions.current.width, dimensions.current.height);
    const bounds = event.target === element ? null : element.getBoundingClientRect();
    const x = bounds ? (event.clientX - bounds.left) * element.clientWidth / bounds.width : event.offsetX;
    const y = bounds ? (event.clientY - bounds.top) * element.clientHeight / bounds.height : event.offsetY;
    return { x: (x - view.x) / view.scale, y: (y - view.y) / view.scale, pressure: event.pointerType === "pen" && event.pressure > 0 ? event.pressure : 0.5 };
  };

  const startStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    if (active.current || !event.isPrimary || event.button !== 0 || !available || !ready.current) return;
    const point = pointFromEvent(event.nativeEvent);
    if (point.x < 0 || point.y < 0 || point.x > BOARD_WIDTH || point.y > BOARD_HEIGHT) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const stroke: Stroke = { tool, colour, size: tool === "eraser" ? size * 3 : size, seed: Math.floor(Math.random() * 2147483647), points: [makePoint(point.x, point.y, point.pressure)] };
    active.current = { stroke, pointerId: event.pointerId };
    setIsDrawing(true);
    const context = configureContext();
    if (context) paintSegment(context, stroke, 0);
  };

  const moveStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    const current = active.current;
    if (!current || current.pointerId !== event.pointerId) return;
    event.preventDefault();
    const events = typeof event.nativeEvent.getCoalescedEvents === "function" ? event.nativeEvent.getCoalescedEvents() : [];
    const context = configureContext();
    for (const sample of events.length ? events : [event.nativeEvent]) {
      const point = pointFromEvent(sample);
      const next = makePoint(point.x, point.y, point.pressure);
      const previous = current.stroke.points[current.stroke.points.length - 1];
      if (Math.hypot(next.x - previous.x, next.y - previous.y) < 0.75) continue;
      current.stroke.points.push(next);
      if (context) paintSegment(context, current.stroke, current.stroke.points.length - 1);
      if (current.stroke.points.length >= MAX_STROKE_POINTS) {
        finishStroke();
        setStatus("That was a long stroke! Lift your pointer and continue drawing.");
        break;
      }
    }
  };

  const undo = () => {
    finishStroke();
    const previous = history.current.pop();
    if (!previous) return;
    future.current.push(drawing.current);
    drawing.current = previous;
    updateCounts();
    redraw();
    save();
  };

  const redo = () => {
    finishStroke();
    const next = future.current.pop();
    if (!next) return;
    history.current.push(drawing.current);
    drawing.current = next;
    updateCounts();
    redraw();
    save();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && !event.altKey && ["z", "y"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key.toLowerCase() === "y" || event.shiftKey) redo(); else undo();
    }
  };

  return <section className={styles.page} aria-label="Drawing board" onKeyDown={handleKeyDown}>
    <aside className={styles.sidebar}>
      <div className={styles.toolbar} role="toolbar" aria-label="Drawing tools" aria-orientation="vertical"> 
      <div className={styles.group} role="group" aria-label="Chalk width">
        {SIZES.map((value) => <button type="button" key={value.value} aria-pressed={size === value.value} onClick={() => setSize(value.value)}>{value.name}</button>)}
      </div>
      <div className={styles.group} role="group" aria-label="Brush tool">
        <button type="button" aria-pressed={tool === "chalk"} onClick={() => setTool("chalk")}>Chalk</button>
        <button type="button" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")}>Eraser</button>
      </div>
      <div className={styles.group} role="group" aria-label="Drawing history">
        <button type="button" onClick={undo} disabled={!counts.undo} title="Undo (Ctrl/Cmd+Z)">Undo</button>
        <button type="button" onClick={redo} disabled={!counts.redo} title="Redo (Ctrl/Cmd+Shift+Z)">Redo</button>
        <button type="button" disabled={!counts.strokes} onClick={() => { finishStroke(); commit([]); redraw(); }}>Clear</button>
      </div>
      <div className={styles.group} role="group" aria-label="Chalk colour">
        {(Object.keys(COLOURS) as Colour[]).map((value) => <button type="button" key={value} className={styles.swatch} style={{ "--swatch": COLOURS[value] } as React.CSSProperties} aria-label={`${value[0].toUpperCase() + value.slice(1)} chalk`} title={`${value[0].toUpperCase() + value.slice(1)} chalk`} aria-pressed={colour === value && tool === "chalk"} onClick={() => { setColour(value); setTool("chalk"); }}><span aria-hidden="true" /></button>)}
      </div>
      </div>
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
    </aside>
    <div className={styles.surface}>
      <div className={styles.boundary} style={boardBounds} aria-hidden="true" />
      {!counts.strokes && !isDrawing && <div className={styles.hint} aria-hidden="true">Leave a thought, a diagram or a doodle.</div>}
      <canvas ref={canvas} className={`${styles.canvas} ${tool === "eraser" ? styles.eraser : ""}`} aria-label="Chalk drawing area. Use a mouse, pen or touch to draw. Undo and Clear are available in the sidebar." tabIndex={0} onPointerDown={startStroke} onPointerMove={moveStroke} onPointerUp={(event) => { event.stopPropagation(); if (active.current?.pointerId === event.pointerId) { moveStroke(event); finishStroke(); } }} onPointerCancel={(event) => { event.stopPropagation(); if (active.current?.pointerId === event.pointerId) finishStroke(); }} onLostPointerCapture={() => finishStroke()} onContextMenu={(event) => event.preventDefault()}>Your browser needs canvas support to draw on this chalkboard.</canvas>
      {!available && <p className={styles.unavailable}>Drawing is not available in this browser. Please try a current browser.</p>}
    </div>
  </section>;
}
