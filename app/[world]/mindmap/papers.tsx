'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h3 id="selectedpapers">Selected Papers</h3>
<p>A. Krajenbrink, C. Krawchuk, A. Rosmanis, M. Rosenkranz, 2026 <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/html/2606.04843v1">Decoded Quantum Interferometry Beyond Hamming: Rank-Metric and Translation Association Schemes</a></p>
<p>T. Duneau, C. Krawchuk, A. Pearson, 2026 <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2605.07611">Compositional Quantum Heuristics for Max-Clique Detection</a></p>
<!-- C. Krawchuk, 2024 [Categorifications of Cluster Varieties](https://www.repository.cam.ac.uk/items/50620c32-57f9-42c5-b7aa-e0ae82afc5b4)
 -->`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}