'use client'

import React from "react"
import { SECTIONS, MINDMAP_GRID } from '@/app/_index/pageIndex'
import Forbidden from '@/components/Forbidden'
import { useWorld } from "@/components/useWorld";

export default function Mindmap() {
  const worldExists = useWorld()
  if (!worldExists) {
    return <Forbidden />
  }

  return (
    <div className={`w-full h-full relative grid grid-flow-row ${MINDMAP_GRID.rows} ${MINDMAP_GRID.columns} gap-8 justify-center`}>
      {Object.entries(SECTIONS).map(([section, Section]) => {
        return <div className={Section.classNames + ' items-center'} key={section}>
          <Section.component/>
        </div>
      })}
    </div>
  )
}
