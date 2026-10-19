import { GitHubIcon, EmailIcon } from "@/components/icons";
import { useContext } from "react";
import { ChalkBoardContext, ChalkLink, ChalkEntrance } from "@/components/ChalkTransition"



export default function MindmapHeading() {
  const chalkboard = useContext(ChalkBoardContext);

  return <div className="col-start-3 col-span-2 row-1 items-center text-center">
    <h1>Colin Krawchuk</h1>
    <div className="flex flex-row justify-center items-center gap-4 -mt-4">
      <div className="flex flex-row justify-center items-center">
        <GitHubIcon className="w-6 h-6 m-2  mr-1 text-white"/>
        <ChalkLink scope={chalkboard} isInternalNav={false} href="https://github.com/cgkrawchuk">/ cgkrawchuk</ChalkLink>
      </div>
      <div className="flex flex-row justify-center items-center">
        <EmailIcon className="w-6 h-6 m-2 mr-1 text-white"/>
        <ChalkLink scope={chalkboard} href="mailto://" isInternalNav={false}>
          / Colin . Krawchuk @ quantinuum . com
        </ChalkLink>
      </div>
    </div>
    <div className="flex flex-row flex-wrap justify-center items-center gap-x-6 -mt-2">
      <ChalkLink scope={chalkboard} isInternalNav={false} href="https://orcid.org/0009-0006-7929-9157">
        <span className="inline-flex items-center gap-2 whitespace-nowrap" title="ORCID iD: 0009-0006-7929-9157">
          <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.369 4.378c.525 0 .947.431.947.947a.95.95 0 0 1-.947.947.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.159H8.09v10.029H6.647V7.537zm3.413 0h3.9c3.712 0 5.437 2.625 5.437 5.006 0 2.634-2.128 5.025-5.419 5.025H10.06V7.537zm1.444 1.294v7.463h2.297c3.272 0 4.106-2.484 4.106-3.731 0-2.026-1.294-3.732-4.181-3.732h-2.222z" />
          </svg>
          <span>/ ORCID</span>
        </span>
      </ChalkLink>
      <ChalkLink scope={chalkboard} isInternalNav={false} href="https://scholar.google.com/citations?user=cAVZTpgAAAAJ">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A9.99 9.99 0 0 1 12 10c2.8 0 5.33 1.15 7.162 3.44L24 9.5 12 0z" />
          </svg>
          <span>/ Google Scholar</span>
        </span>
      </ChalkLink>
    </div>
  </div>
}