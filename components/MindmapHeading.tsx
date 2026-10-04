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
  </div>
}