'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h3 id="experience">Experience</h3>
<p><strong>PhD</strong>
: <em>Categorifications of Cluster Varieties</em>, University of Cambridge</p>
<p><strong>2024-Present</strong>
: Sr. research scientist, Quantinuum</p>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}