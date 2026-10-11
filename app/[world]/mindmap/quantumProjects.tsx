'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<p><strong>Projects</strong></p>
<ul>
<li>Decoded Quantum Interferometry (DQI)</li>
<li>Quantum Topological Data Analysis (QTDA)</li>
<li>Quantum Geometric Deep Learning (QGDL)</li>
<li>Knot invariants via TQFTs</li>
<li>Predicting QEC code performance</li>
</ul>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}