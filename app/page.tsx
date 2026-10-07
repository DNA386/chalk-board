'use client'

import React, {useContext, useEffect} from "react"
import {ChalkBoardContext, ChalkLink, ChalkEntrance, useEraseBoardThenNavigate} from "@/components/ChalkTransition"
import {GitHubIcon} from "@/components/icons";
import {useWorld} from "@/components/useWorld";
import { PAGES } from "@/app/_index/pageIndex";
import {WORLD_EXISTS_STATE, WORLD_NOT_EXISTS_STATE} from "@/app/consts";
import {useAnimate} from "motion/react";


export default function Home() {
  const worldExists = useWorld()
  const [scope, animate] = useAnimate()
  const eraseBoardThenNavigate = useEraseBoardThenNavigate()
  useEffect(() => {
    if (typeof worldExists === 'boolean') {
      eraseBoardThenNavigate(scope, worldExists ? WORLD_EXISTS_STATE : WORLD_NOT_EXISTS_STATE)
    }
  }, [worldExists])
  return (
    <ChalkEntrance className="w-full h-full absolute flex justify-center" key="loading-page" ref={scope}>
      <main className="flex items-center justify-center py-32 px-16">
        <h1>...</h1>
      </main>
    </ChalkEntrance>
  )
}
