import Experience from '@/app/mindmap/experience'
import Quantum from '@/app/mindmap/quantum'
import Math from '@/app/mindmap/math'
import Papers from '@/app/mindmap/papers'
import MindmapHeading from "@/components/MindmapHeading";

export const PAGES = [
  'bio',
  'papers',
  'lorem_ipsum',
]

export const MINDMAP_GRID = {
  rows: "grid-rows-5",
  columns: "grid-cols-8",
}
export const SECTIONS = {
  heading: {
    component: MindmapHeading,
    classNames: "col-start-3 col-span-4 row-3 text-center",
  },
  quantum: {
    component: Quantum,
    classNames: "col-span-3 row-span-2 col-start-1"
  },
  math: {
    component: Math,
    classNames: "col-span-3 row-span-2 col-start-6"
  },
  experience: {
    component: Experience,
    classNames: "col-span-3 row-span-1 row-start-5"
  },
  papers: {
    component: Papers,
    classNames: "col-span-5 row-span-1 row-start-5"
  },
}
