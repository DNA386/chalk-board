'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h1 id="papers">Papers</h1>
<h1 id="papers-1">Papers</h1>
<h2 id="decodedquantuminterferometrybeyondhammingrankmetricandtranslationassociationschemeshttpsarxivorghtml260604843v1"><a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/html/2606.04843v1">Decoded Quantum Interferometry Beyond Hamming: Rank-Metric and Translation Association Schemes</a></h2>
<p>A. Krajenbrink, C. Krawchuk, A. Rosmanis, M. Rosenkranz, 2026.</p>
<h2 id="compositionalquantumheuristicsformaxcliquedetectionhttpsiopscienceioporgarticle10108820589565aeaf7b"><a target="_blank" rel="noopener noreferrer" href="https://iopscience.iop.org/article/10.1088/2058-9565/aeaf7b">Compositional Quantum Heuristics for Max-Clique Detection</a></h2>
<p>T. Duneau, C. Krawchuk, A. Pearson, 2026.</p>
<h2 id="boundsondecoratedsweepcoversintreeposetshttpsarxivorgabs260403165"><a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2604.03165">Bounds on Decorated Sweep Covers in Tree Posets</a></h2>
<p>B. A. Wilson, C. Krawchuk, 2026.</p>
<h2 id="quantumcomputingfrontiersausecasetimelineforquantumchemistryandtopologicaldataanalysishttpswwwsoftbankjpencorptechnologyresearchtopics220"><a target="_blank" rel="noopener noreferrer" href="https://www.softbank.jp/en/corp/technology/research/topics/220/">Quantum Computing Frontiers: A Use-Case Timeline for Quantum Chemistry and Topological Data Analysis</a></h2>
<p>A. Connolly, A. Bhayat, C. Kargı, C. Krawchuk et al., 2026.</p>
<h2 id="efficientgenerationofparameterisedquantumcircuitsfromlargetextshttpsarxivorgabs250513208"><a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2505.13208">Efficient Generation of Parameterised Quantum Circuits from Large Texts</a></h2>
<p>C. Krawchuk, N. Khatri, N. J. Ortega, D. Kartsaklis, 2025.</p>
<h2 id="categorificationsofclustervarietieshttpswwwrepositorycamacukitems50620c3257f942c5b7aae0ae82afc5b4"><a target="_blank" rel="noopener noreferrer" href="https://www.repository.cam.ac.uk/items/50620c32-57f9-42c5-b7aa-e0ae82afc5b4">Categorifications of Cluster Varieties</a></h2>
<p>C. Krawchuk, 2024.</p>
<h2 id="agluingoperationfordimerquivershttpsarxivorgabs240202784"><a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2402.02784">A gluing operation for dimer quivers</a></h2>
<p>K. Baur, C. Krawchuk, 2024.</p>
<h2 id="techniquesforconstructingclusterstructuresonvarieties">Techniques for Constructing Cluster Structures on Varieties</h2>
<p>C. Krawchuk, 2023.</p>
<p>Arbeitsgemeinschaft: Cluster Algebras. <em>Oberwolfach Rep.</em> 20 (2023), no. 4, pp. 2637–2680.</p>
<h2 id="cycliccomplexityofsomeinfinitewordsandgeneralizationshttpsmathcolgateeduintegersvol18ahtml"><a target="_blank" rel="noopener noreferrer" href="https://math.colgate.edu/~integers/vol18a.html">Cyclic Complexity of Some Infinite Words and Generalizations</a></h2>
<p>C. Krawchuk, N. Rampersad, 2018.</p>
<p><em>Integers</em> 18A, Paper A12.</p>
<p><strong>I can't decide how to format these.</strong>
T. Duneau, 2026</p>`


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