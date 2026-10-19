export const BOARD_WIDTH = 1200;
export const BOARD_HEIGHT = 650;
export const MAX_STROKES = 240;
export const MAX_POINTS = 24000;
export const MAX_STROKE_POINTS = 4000;
export const STORAGE_KEY = "chalk-board.drawing.v1";
export const COLOURS = { white: "#EEEEEB", green: "#BBF7D0", lavender: "#C4B5FD" } as const;
export type Colour = keyof typeof COLOURS;
export type Point = { x: number; y: number; pressure: number };
export type Stroke = { tool: "chalk" | "eraser"; colour: Colour; size: number; seed: number; points: Point[] };
export type Drawing = Stroke[];

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function makePoint(x: number, y: number, pressure = 0.5): Point {
  return {
    x: Math.round(clamp(x, 0, BOARD_WIDTH) * 10) / 10,
    y: Math.round(clamp(y, 0, BOARD_HEIGHT) * 10) / 10,
    pressure: Math.round(clamp(pressure, 0.1, 1) * 100) / 100,
  };
}

export function boardViewport(width: number, height: number) {
  const scale = Math.max(0.001, Math.min(width / BOARD_WIDTH, height / BOARD_HEIGHT));
  return { scale, x: (width - BOARD_WIDTH * scale) / 2, y: (height - BOARD_HEIGHT * scale) / 2 };
}

export function boundDrawing(strokes: Drawing): { strokes: Drawing; trimmed: boolean } {
  const bounded = strokes.slice(-MAX_STROKES);
  let points = bounded.reduce((sum, stroke) => sum + stroke.points.length, 0);
  while (points > MAX_POINTS && bounded.length > 1) points -= bounded.shift()!.points.length;
  return { strokes: bounded, trimmed: bounded.length !== strokes.length };
}

export function serialiseDrawing(strokes: Drawing): string {
  return JSON.stringify({ version: 1, strokes: boundDrawing(strokes).strokes });
}

export function parseDrawing(raw: string): Drawing {
  if (raw.length > 2500000) throw new Error("Drawing exceeds the storage limit");
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== "object" || !("version" in data) || data.version !== 1 || !("strokes" in data) || !Array.isArray(data.strokes) || data.strokes.length > MAX_STROKES) throw new Error("Invalid drawing");
  let count = 0;
  const strokes = data.strokes.map((value: unknown): Stroke => {
    if (!value || typeof value !== "object") throw new Error("Invalid stroke");
    const stroke = value as Record<string, unknown>;
    if ((stroke.tool !== "chalk" && stroke.tool !== "eraser") || typeof stroke.colour !== "string" || !Object.hasOwn(COLOURS, stroke.colour) || typeof stroke.size !== "number" || !Number.isFinite(stroke.size) || stroke.size < 1 || stroke.size > 60 || typeof stroke.seed !== "number" || !Number.isSafeInteger(stroke.seed) || !Array.isArray(stroke.points) || stroke.points.length < 1 || stroke.points.length > MAX_STROKE_POINTS) throw new Error("Invalid stroke");
    count += stroke.points.length;
    if (count > MAX_POINTS) throw new Error("Too many points");
    const points = stroke.points.map((value: unknown) => {
      if (!value || typeof value !== "object") throw new Error("Invalid point");
      const point = value as Record<string, unknown>;
      if (typeof point.x !== "number" || !Number.isFinite(point.x) || typeof point.y !== "number" || !Number.isFinite(point.y) || typeof point.pressure !== "number" || !Number.isFinite(point.pressure)) throw new Error("Invalid point");
      return makePoint(point.x, point.y, point.pressure);
    });
    return { tool: stroke.tool, colour: stroke.colour as Colour, size: stroke.size, seed: stroke.seed, points };
  });
  return strokes;
}

function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export type ChalkStamp = { x: number; y: number; radius: number; opacity: number };

export function segmentStamps(stroke: Stroke, index: number): ChalkStamp[] {
  const end = stroke.points[index];
  const start = stroke.points[Math.max(0, index - 1)];
  if (!start || !end) return [];
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const steps = Math.max(1, Math.ceil(distance / Math.max(1, stroke.size * 0.2)));
  const rng = random(stroke.seed + index * 1013904223);
  const stamps: ChalkStamp[] = [];
  for (let step = index === 0 ? 0 : 1; step <= steps; step++) {
    const t = step / steps;
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t;
    const size = stroke.size * (0.7 + (start.pressure + (end.pressure - start.pressure) * t) * 0.6);
    if (stroke.tool === "eraser") {
      stamps.push({ x, y, radius: size / 2, opacity: 1 });
      continue;
    }
    stamps.push({ x, y, radius: size * 0.4, opacity: 0.14 });
    for (let grain = 0; grain < 9; grain++) {
      const angle = rng() * Math.PI * 2;
      const radius = Math.sqrt(rng()) * size * 0.5;
      stamps.push({ x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius, radius: 0.35 + rng() * size * 0.14, opacity: 0.2 + rng() * 0.45 });
    }
  }
  return stamps;
}

export function paintSegment(context: CanvasRenderingContext2D, stroke: Stroke, index: number) {
  context.save();
  context.beginPath();
  context.rect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  context.clip();
  context.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
  context.fillStyle = COLOURS[stroke.colour];
  for (const stamp of segmentStamps(stroke, index)) {
    context.globalAlpha = stamp.opacity;
    context.beginPath();
    context.arc(stamp.x, stamp.y, stamp.radius, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

export function paintDrawing(context: CanvasRenderingContext2D, strokes: Drawing) {
  for (const stroke of strokes) for (let index = 0; index < stroke.points.length; index++) paintSegment(context, stroke, index);
}
