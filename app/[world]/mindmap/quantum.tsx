'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h3 id="quantum">Quantum</h3>
<p>Interested in quantum algorithms where symmetry and geometry are not just tools, 
but the point.
This includes optimisation (VQAs, DQI), variational trainability 
(barren plateaus, DLA expressivity), and problems in algebra &amp; topology (homology, knot invariants, HSPs).</p>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}