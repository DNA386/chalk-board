'use client'

import React, { useContext } from "react"
import {ChalkBoardContext, ChalkLink, ChalkEntrance, useEraseBoardThenNavigate} from "@/components/ChalkTransition"
import {GitHubIcon} from "@/components/icons";
import {useWorld} from "@/components/useWorld";
import { PAGES } from "@/app/_index/pageIndex";


export default function Home() {
  const chalkboard = useContext(ChalkBoardContext);
  const worldExists = useWorld()
  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  const handleClick = () => {
    if (worldExists) {
      eraseBoardThenNavigate(chalkboard, "/mindmap")
    } else {
      eraseBoardThenNavigate(chalkboard, PAGES[0])
    }
  }

  return (
    <div className="w-full h-full relative flex justify-center">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center py-32 px-16" onClick={handleClick}>
        <h1>Colin Krawchuk</h1>
        <h3 className="text-3xl">Underappreciated genius, looking for work.</h3>

        <div className={"flex flex-col justify-center items-center mt-32" + (worldExists ? ' text-xl' : '')}>
          Click anywhere to begin.
          {worldExists ? <>
            <div className="m-4"></div>
            <div className="text-center">
              Navigate the blackboard by using the items on the ledge.
              Zoom into sections by clicking on them or pressing number keys.
              Press space to return to the main view.
            </div>
          </>: <></>}
        </div>
      </main>
    </div>
  )
}
