'use client'

import React from "react"
import { SECTIONS, MINDMAP_GRID } from '@/app/_index/pageIndex'
import Forbidden from '@/components/Forbidden'
import {SectionDetail, useWorld, useWorldSections} from "@/components/useWorld";
import MindmapSection from "@/components/MindmapSection";
import { WORLD_NOT_EXISTS_STATE } from "@/app/consts";

export default function Mindmap() {
  const worldExists = useWorld()
  const [mindmap, setMindmap] = React.useState<HTMLDivElement | null>(null)

  const sections = React.useRef<SectionDetail[]>([])
  useWorldSections(sections)

  const mindmapCallback = React.useCallback((node: HTMLDivElement | null) => {
    setMindmap(node)

    if (node && node.children) {
      // Once DOM is loaded, we can send over the mindmap section details to the world for zooming in on.
      // World expects the section positions to be in board pixels relative to the bottom left corner.
      const newSections = Array.from(node.children)
        // .filter(child => child.id !== "heading")
        .map((child, i) => {
          const boundingRect = child.getBoundingClientRect()
          return {
            name: child.id,
            index: i,
            pointTarget: {
              x: boundingRect.left + child.clientWidth / 2,
              y: window.innerHeight - (boundingRect.top + child.clientHeight / 2),
            }
          } as SectionDetail
        })
      sections.current = newSections
    }
  }, [])

  if (worldExists === false) {
    return <Forbidden baseUrl={'/' + WORLD_NOT_EXISTS_STATE} />
  }

  return (
    <div ref={mindmapCallback} className={`w-full h-full relative grid grid-flow-row ${MINDMAP_GRID.rows} ${MINDMAP_GRID.columns} gap-4 px-8 justify-center`}>
      {SECTIONS.map((section, i) => {
        return <MindmapSection key={section.name} index={i} details={section} mindmap={mindmap} />
      })}
    </div>
  )
}
