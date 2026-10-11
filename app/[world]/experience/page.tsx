'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = `<h1 id="experience">Experience</h1>
<h2 id="programmingexperience">Programming Experience</h2>
<p>C++, Rust, Python, MATLAB, CUDA, PyTorch, TensorFlow, TorchQuantum.</p>
<h2 id="education">Education</h2>
<p><strong>PhD in Mathematics, University of Cambridge — 2020–2024</strong><br />
<em>Supervised by Professor Stuart Martin.</em></p>
<p><strong>Master of Advanced Study (Part III), University of Cambridge — 2019–2020</strong><br />
<em>Essay: Blocks with a Cyclic Defect Group.</em></p>
<p><strong>BSc Honours, Mathematics and Computer Science, University of Winnipeg — 2015–2019</strong><br />
<em>Gold Medals for Highest GPA in Mathematics and the Faculty of Sciences.</em></p>
<h2 id="editorialandreviewingactivities">Editorial and Reviewing Activities</h2>
<p><strong>Reviewer — Quantum Physics and Logic — 2025</strong></p>
<ul>
<li>Refereed submissions in quantum error correction and geometric foundations.</li>
</ul>
<p><strong>Quantinuum Internal Reviews — 2025</strong></p>
<ul>
<li>F. Sauvage, M. Larocca, <em>Equivariance in Quantum Machine Learning</em>.</li>
<li>T. Duneau, <em>Towards a Comparative Framework for Compositional Models</em>.</li>
<li>T. Duneau, <em>A Compositional Approach to Reading Comprehension Tasks Using the DisCoCirc Natural Language Processing Framework</em>.</li>
</ul>
<p><strong>Reviewer — Selecta Mathematica — 2025</strong></p>
<ul>
<li>Refereed manuscripts on Grassmannian geometry and representation theory.</li>
</ul>
<h2 id="selectedtalks">Selected Talks</h2>
<p><strong>Simplifying circuits via semantic symmetries — Dec 2024</strong><br />
Quantinuum Oxford Seminar.</p>
<p><strong>Geometric deep learning in theory and in practice — Nov 2024</strong><br />
Medical University of Vienna (invited).</p>
<p><strong>Higher friezes and higher AR Theory — Feb 2024</strong><br />
University of Edinburgh — Hodge Seminar (invited).</p>
<p><strong>Techniques for constructing cluster structures on varieties — Oct 2023</strong><br />
Oberwolfach — Arbeitsgemeinschaft: Cluster Algebras.</p>
<p><strong>Higher friezes and higher AR Theory — May 2023</strong><br />
University of Leeds — Algebra Seminar (invited).</p>
<p><strong>A gluing operation for dimer quivers — Oct 2022</strong><br />
University of Glasgow (invited).</p>
<p><strong>Silting and cosilting objects in triangulated categories — July 2022</strong><br />
ISM Discovery School: From Cluster Algebras to Representation Theory.</p>
<p><strong>Boundary algebras arising from uniform Postnikov diagrams — Mar 2022</strong><br />
Laboratoire de Mathématiques de Versailles (invited).</p>
<p><strong>Boundary algebras arising from uniform Postnikov diagrams — Nov 2021</strong><br />
Imperial College London — Junior London Algebra Colloquium (invited).</p>
<p><strong>Decomposition numbers of Symmetric Groups — Sept 2021</strong><br />
EPFL — Young Algebraist Conference.</p>
<h2 id="researchvisits">Research Visits</h2>
<p><strong>Université de Versailles Saint-Quentin-en-Yvelines — Sept 2023–Aug 2024</strong><br />
<em>Visiting Professor Pierre-Guy Plamondon.</em></p>
<p><strong>University of Glasgow — Oct 2022</strong><br />
<em>Visiting Dr. Matthew Pressland.</em></p>
<p><strong>Université de Versailles Saint-Quentin-en-Yvelines — Mar 2022–May 2022</strong><br />
<em>Visiting Professor Pierre-Guy Plamondon.</em></p>
<p><strong>Isaac Newton Institute: Cluster algebras and representations — Sept 2021–Dec 2021</strong><br />
<em>Collaborating with Professor Karin Baur and Dr. Véronique Bazier-Matte.</em></p>
<h2 id="awardsandscholarships">Awards and Scholarships</h2>
<p><strong>Fondation Mathématique Jacques Hadamard Scientific visibility award — 2022</strong><br />
Competitive award supporting a two-month stay at a research institution in Paris.</p>
<p><strong>NSERC Alexander Graham Bell Postgraduate Doctoral Scholarship — 2021</strong><br />
The highest doctoral scholarship offered by the Canadian research council.</p>
<p><strong>Cambridge Trust Scholarship — 2020</strong><br />
Competitive doctoral scholarship from the University of Cambridge.</p>
<p><strong>NSERC Postgraduate Doctoral Scholarship (PGSD3) — 2020</strong><br />
Doctoral scholarship supporting study at a foreign research institution.</p>
<p><strong>CUMC Award for Excellence (declined) — 2019</strong><br />
Awarded on the basis of research potential and mathematical community involvement.</p>`


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