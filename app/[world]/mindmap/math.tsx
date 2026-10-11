'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h3 id="mathresearch">Math Research</h3>
<p>I use representation theory to study combinatorial and geometric structures, 
including cluster algebras and symmetric groups.</p>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}