import assert from "node:assert/strict";
import test from "node:test";
import { BOARD_HEIGHT, BOARD_WIDTH, MAX_POINTS, MAX_STROKES, boardViewport, boundDrawing, makePoint, paintSegment, parseDrawing, segmentStamps, serialiseDrawing } from "./drawing.ts";

const stroke = (seed = 123) => ({ tool: "chalk", colour: "lavender", size: 8, seed, points: [makePoint(50, 50), makePoint(75, 60), makePoint(80, 90, 0.8)] });

test("persistence restores both chalk and eraser strokes exactly", () => {
  const strokes = [stroke(), { ...stroke(456), tool: "eraser", size: 24 }];
  assert.deepEqual(parseDrawing(serialiseDrawing(strokes)), strokes);
});

test("untrusted or obsolete saved drawings are rejected", () => {
  for (const raw of ["broken", "null", '{"version":2,"strokes":[]}', JSON.stringify({ version: 1, strokes: [{ ...stroke(), colour: "__proto__" }] }), JSON.stringify({ version: 1, strokes: [{ ...stroke(), points: [{ x: 1, y: null, pressure: 0.5 }] }] })]) {
    assert.throws(() => parseDrawing(raw));
  }
});

test("coordinates clamp to the drawing area, including captured pointers outside it", () => {
  assert.deepEqual(makePoint(-10, 10000, 0), { x: 0, y: BOARD_HEIGHT, pressure: 0.1 });
  assert.deepEqual(makePoint(9999, -100, 2), { x: BOARD_WIDTH, y: 0, pressure: 1 });
});

test("resize fits the same logical board without changing its aspect ratio", () => {
  const portrait = boardViewport(300, 600);
  assert.equal(portrait.scale, 0.25);
  assert.equal(portrait.x, 0);
  assert.equal(portrait.y, (600 - BOARD_HEIGHT * 0.25) / 2);
  const wide = boardViewport(1800, 650);
  assert.equal(wide.scale, 1);
  assert.equal(wide.x, 300);
});

test("bounded storage discards the oldest complete strokes", () => {
  const strokes = Array.from({ length: MAX_STROKES + 2 }, (_, index) => stroke(index));
  const bounded = boundDrawing(strokes);
  assert.equal(bounded.trimmed, true);
  assert.equal(bounded.strokes.length, MAX_STROKES);
  assert.equal(bounded.strokes[0].seed, 2);
  const longStrokes = Array.from({ length: 10 }, (_, index) => ({ ...stroke(index), points: Array.from({ length: 4000 }, () => makePoint(1, 2)) }));
  assert.ok(boundDrawing(longStrokes).strokes.reduce((count, value) => count + value.points.length, 0) <= MAX_POINTS);
});

test("chalk grain is deterministic and independent of later stroke points", () => {
  const original = stroke();
  const grain = segmentStamps(original, 1);
  assert.ok(grain.length > 0);
  assert.deepEqual(segmentStamps(original, 1), grain);
  assert.deepEqual(segmentStamps({ ...original, points: [...original.points, makePoint(90, 100)] }, 1), grain);
  assert.notDeepEqual(segmentStamps(stroke(456), 1), grain);
  assert.ok(grain.every((stamp) => Number.isFinite(stamp.x) && Number.isFinite(stamp.y) && stamp.radius > 0 && stamp.opacity > 0 && stamp.opacity <= 1));
});

test("both live chalk and eraser segments clip to the logical board before painting", () => {
  for (const tool of ["chalk", "eraser"]) {
    let clipped = false;
    let restored = false;
    const context = {
      save() {},
      beginPath() {},
      rect(x, y, width, height) { assert.deepEqual([x, y, width, height], [0, 0, BOARD_WIDTH, BOARD_HEIGHT]); },
      clip() { clipped = true; },
      arc() { assert.equal(clipped, true); },
      fill() { assert.equal(clipped, true); },
      restore() { restored = true; },
    };
    paintSegment(context, { ...stroke(), tool }, 1);
    assert.equal(restored, true);
    assert.equal(context.globalCompositeOperation, tool === "eraser" ? "destination-out" : "source-over");
  }
});
