import {JSX} from 'react'
import Experience from '@/app/[world]/mindmap/experience'
import Quantum from '@/app/[world]/mindmap/quantum'
import QuantumProjects from '@/app/[world]/mindmap/quantumProjects'
import Math from '@/app/[world]/mindmap/math'
import MathTopics from '@/app/[world]/mindmap/mathTopics'
import Papers from '@/app/[world]/mindmap/papers'
import MindmapHeading from "@/components/MindmapHeading";


export const PAGES = [
  'bio',
  'papers',
  'experience',
]

export const MINDMAP_GRID = {
  rows: "grid-rows-5",
  columns: "grid-cols-8",
}
export type SectionDef = {
  name: string,
  component: () => JSX.Element,
  classNames: string,
  arrow?: {curvature: number, from: string}
}
export const SECTIONS: SectionDef[] = [
  {
    name: "heading",
    component: MindmapHeading,
    classNames: "col-start-3 col-span-4 row-3 text-center mt-8",
    arrow: undefined,
  },
  {
    name: "math",
    component: Math,
    classNames: "col-span-3 row-span-1 col-start-1",
    arrow: {
      curvature: 50,
      from: "heading",
    },
  },
  {
    name: "math-topics",
    component: MathTopics,
    classNames: "col-span-2 row-span-2 col-start-1 row-start-3",
    arrow: {
      curvature: -50,
      from: "math",
    },
  },
  {
    name: "quantum",
    component: Quantum,
    classNames: "col-span-4 row-span-1 col-start-5",
    arrow: {
      curvature: -20,
      from: "heading",
    },
  },
  {
    name: "quantum-projects",
    component: QuantumProjects,
    classNames: "col-span-2 row-span-1 col-start-7 row-start-3",
    arrow: {
      curvature: 20,
      from: "quantum",
    },
  },
  {
    name: "experience",
    component: Experience,
    classNames: "col-span-4 row-span-2 row-start-5",
    arrow: {
      curvature: 50,
      from: "heading",
    },
  },
  {
    name: "papers",
    component: Papers,
    classNames: "col-span-5 row-span-1 row-start-5",
    arrow: {
      curvature: 20,
      from: "heading",
    },
  },
]
