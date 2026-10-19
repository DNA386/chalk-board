'use client'

import React, { useContext } from "react"
import { ChalkBoardContext, ChalkLink, useEraseBoardThenNavigate } from "@/components/ChalkTransition"
import { PAGES } from "@/app/_index/pageIndex";
import { CHALKWORLD_URL, WORLD_EXISTS_STATE } from "@/app/consts";



export default function Home({ params }:  {
  params: Promise<{ world: string }>
}) {
  const worldState =  React.use(params).world
  const worldExists = worldState == WORLD_EXISTS_STATE
  const { scope: chalkboard, enqueue } = useContext(ChalkBoardContext);
  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  const handleClick = () => {
    if (worldExists) {
      eraseBoardThenNavigate(chalkboard, enqueue, `/${worldState}/mindmap`)
    } else {
      eraseBoardThenNavigate(chalkboard, enqueue, `/${worldState}/${PAGES[0]}`)
    }
  }

  return (
    <div className="w-full h-full relative flex justify-center">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center py-32 px-16 text-center" onClick={handleClick}>
        <h1>Colin Krawchuk</h1>
        {/* <h3 className="text-3xl">Underappreciated genius, looking for work.</h3> */}
        <h3 className="text-3xl">Mathematician and quantum computing researcher.</h3> 

        <div className={"flex flex-col justify-center items-center mt-32" + (worldExists ? ' text-xl' : '')}>
          Click anywhere to begin.
          {worldExists ? <>
            <div className="text-center mt-8">
              Navigate the blackboard by using the items on the ledge.
              Zoom into sections by clicking on them or pressing number keys.
              Press space to return to the main view.
            </div>
          </>: <>
            <div className="text-center mt-8">
              Note: this site is best experienced
            </div>
            <ChalkLink scope={chalkboard} enqueue={enqueue} href={CHALKWORLD_URL} isInternalNav={false}>in 3D</ChalkLink>
          </>}
        </div>
      </main>
    </div>
  )
}
