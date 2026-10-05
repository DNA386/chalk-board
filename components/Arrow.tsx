'use client'

import React from 'react'


export function ChalkArrow(props: {from: {x: number; y: number}, to: {x: number; y: number}, curvature: number}) {
  // Simple quadratic Bézier with one control point controlled by props.curvature.
  // Assume coords are given with origin at the top left of the board.

  // In absolute screen coords
  const rawDims = {
    width: props.to.x - props.from.x,
    height: props.to.y - props.from.y,
  }
  // curvature away from the midpoint of the line, perpendicular to the line.
  const theta = rawDims.width !== 0 ? Math.atan(rawDims.width / rawDims.height) : Math.PI / 2
  const controlPoint = {
    x: props.from.x + rawDims.width / 2 + (props.curvature * Math.cos(theta)),
    y: props.from.y + rawDims.height / 2 - (props.curvature * Math.sin(theta)),
  }
  // Arrow computed relative to the control point direction
  const arrowTheta = controlPoint.x - props.to.x !== 0 ? Math.atan((props.to.x - controlPoint.x) / (props.to.y - controlPoint.y)) : Math.PI / 2
  const arrowLength = 15
  const arrowAngle = (props.to.y - controlPoint.y > 0) ? Math.PI/3 : - Math.PI/3
  const arrowPoints = {
    left: {
      x: props.to.x + arrowLength * Math.cos(arrowAngle + arrowTheta),
      y: props.to.y - arrowLength * Math.sin(arrowAngle + arrowTheta),
    },
    right: {
      x: props.to.x - arrowLength * Math.cos(arrowAngle - arrowTheta),
      y: props.to.y - arrowLength * Math.sin(arrowAngle - arrowTheta),
    }
  }

  // Build the viewbox as the smallest bounding box around all the points
  const allPoints = [props.from, props.to, controlPoint, arrowPoints.left, arrowPoints.right]
  const boundingBox = {
    minX: Math.min(...allPoints.map(p => p.x)),
    minY: Math.min(...allPoints.map(p => p.y)),
    maxX: Math.max(...allPoints.map(p => p.x)),
    maxY: Math.max(...allPoints.map(p => p.y)),
  }
  const width = boundingBox.maxX - boundingBox.minX
  const height = boundingBox.maxY - boundingBox.minY
  const viewBox = `0 0 ${width} ${height}`;

  // SVG coords have the origin at the top left.
  const getRelativeSVGCoord = (c: number, axis: string) => {
    return axis == 'x' ? c - boundingBox.minX : c - boundingBox.minY
  }

  // Quadratic bézier via the control point we defined
  const d = `
  M ${getRelativeSVGCoord(props.from.x, "x")} ${getRelativeSVGCoord(props.from.y, "y")} 
  Q ${getRelativeSVGCoord(controlPoint.x, "x")} ${getRelativeSVGCoord(controlPoint.y, "y")}
    ${getRelativeSVGCoord(props.to.x, "x")} ${getRelativeSVGCoord(props.to.y, "y")}`;
  const dash = `0, 12, 6, 0`

  const arrow = `
  M ${getRelativeSVGCoord(arrowPoints.left.x, "x")} ${getRelativeSVGCoord(arrowPoints.left.y, "y")}
  L ${getRelativeSVGCoord(props.to.x, "x")} ${getRelativeSVGCoord(props.to.y, "y")}
  L ${getRelativeSVGCoord(arrowPoints.right.x, "x")} ${getRelativeSVGCoord(arrowPoints.right.y, "y")}
  `

  return <div className="absolute opacity-30" style={{
    top: boundingBox.minY,
    left: boundingBox.minX,
    width: `${width}px`,
    height: `${height}px`
  }}>
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="none" strokeWidth="3" stroke={"var(--color-zinc-200)"}>
      <path d={d} strokeDasharray={dash}></path>
      <path d={arrow}></path>
      {/*<circle id="cp" cx={getRelativeSVGCoord(controlPoint.x, "x")} cy={getRelativeSVGCoord(controlPoint.y, "y")} r={3} stroke="transparent" fill="var(--color-emerald-400)"></circle>*/}
      {/*<circle id="from" cx={getRelativeSVGCoord(props.from.x, "x")} cy={getRelativeSVGCoord(props.from.y, "y")} r={3} stroke="transparent" fill="var(--color-violet-200)"></circle>*/}
      {/*<circle id="to" cx={getRelativeSVGCoord(props.to.x, "x")} cy={getRelativeSVGCoord(props.to.y, "y")} r={50} stroke="transparent" fill="var(--color-violet-600)"></circle>*/}
      {/*<circle id=" left" cx={getRelativeSVGCoord(arrowPoints.left.x, "x")} cy={getRelativeSVGCoord(arrowPoints.left.y, "y")} r={3} stroke="transparent" fill="var(--color-lime-600)"></circle>*/}
      {/*<circle id="right" cx={getRelativeSVGCoord(arrowPoints.right.x, "x")} cy={getRelativeSVGCoord(arrowPoints.right.y, "y")} r={3} stroke="transparent" fill="var(--color-red-600)"></circle>*/}
    </svg>
  </div>
}


export function MindMapArrow(props: {from: string, to: string, curvature: number, mindmap: React.RefObject<HTMLDivElement | null>}) {
  // (Attempt at) automagic placing of arrows in the mindmap.
  const [fromEl, setFromEl] = React.useState<HTMLDivElement | null>(null)
  const [toEl, setToEl] = React.useState<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (props.mindmap !== null) {
      setFromEl(Array.from(props.mindmap.children).find(child => child.id == props.from))
    }
  }, [props.mindmap, props.from])
  React.useEffect(() => {
    if (props.mindmap !== null) {
      setToEl(Array.from(props.mindmap.children).find(child => child.id == props.to))
    }
  }, [props.mindmap, props.to])

  if (fromEl && toEl) {
    // Detect the closest cardinal direction for the connection by midpoints.
    // Connection origin sticks to the edges according to the aspect ratio of the div.
    const offsets = {
      from: {
        x: fromEl.clientWidth > fromEl.clientHeight ? 0.3 : 0,
        y: fromEl.clientWidth > fromEl.clientHeight ? 0 : 0.3,
      } ,
      to: {
        x: toEl.clientWidth > toEl.clientHeight ? 0.3 : 0,
        y: toEl.clientWidth > toEl.clientHeight ? 0 : 0.3,
      },
    }
    // From set based on midpoints
    const fromCoords = {
      x: fromEl.offsetLeft + ((fromEl.offsetLeft + fromEl.clientWidth/2 > toEl.offsetLeft + toEl.clientWidth/2) ? offsets.from.x : 1 - offsets.from.x) * fromEl.clientWidth,
      y: fromEl.offsetTop + ((fromEl.offsetTop + fromEl.clientHeight/2 > toEl.offsetTop + toEl.clientHeight/2) ? offsets.from.y : 1 - offsets.from.y) * fromEl.clientHeight,
    }
    // Set target based on the front coord
    const toCoords = {
      x: toEl.offsetLeft + ((fromCoords.x > toEl.offsetLeft + toEl.clientWidth/2) ? 1 - offsets.to.x : offsets.to.x) * toEl.clientWidth,
      y: toEl.offsetTop + ((fromCoords.y > toEl.offsetTop + toEl.clientHeight/2) ? 1 - offsets.to.y : offsets.to.y) * toEl.clientHeight,
    }

    return <ChalkArrow from={fromCoords} to={toCoords} curvature={props.curvature}/>
  }
  return <></>
}