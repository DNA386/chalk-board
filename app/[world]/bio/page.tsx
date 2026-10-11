'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h1 id="research">Research</h1>
<h3 id="math">Math</h3>
<p>I use representation theory to study combinatorial and geometric structures, 
including cluster algebras and symmetric groups.</p>
<p>Topics: categorifications, cluster structures on algebraic varieties, 
and modular representation theory of symmetric groups.</p>
<p>other: Convolution weights on 2-spaces,
combinatorics on words,
algorithms and complexity.</p>
<h3 id="quantum">Quantum</h3>
<p>Interested in quantum algorithms where symmetry and geometry are not just tools, but the point.</p>
<p>This includes optimisation (VQAs, DQI), variational trainability (barren plateaus, DLA expressivity),
and QML generalisation via symmetry.</p>
<p>Projects: Decoded Quantum Interferometry (DQI),
Quantum Topological Data Analysis (QTDA),
Quantum Geometric Deep Learning (QGDL)
talks?</p>`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center overflow-auto">
      <main className="flex w-full max-w-4xl max-h-90% flex-col items-center justify-between sm:items-start">
        <ChalkyScroll>
          <Markdown html={htmlContent}></Markdown>
        </ChalkyScroll>
      </main>
    </div>
  )
}