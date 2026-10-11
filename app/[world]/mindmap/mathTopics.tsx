'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<p><strong>Topics</strong></p>
<ul>
<li>Categorifications</li>
<li>Cluster structures on algebraic varieties</li>
<li>Modular representation theory of symmetric groups</li>
<li>Convolution weights on 2-spaces</li>
<li>Combinatorics on words</li>
<li>Algorithms and complexity</li>
</ul>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}