'use client'

import React, {useEffect} from "react"
import {ChalkEntrance, useEraseBoardThenNavigate, useWriteBoard} from "@/components/ChalkTransition"
import {useWorld} from "@/components/useWorld";
import {WORLD_EXISTS_STATE, WORLD_NOT_EXISTS_STATE} from "@/app/consts";


export default function Home() {
  const worldExists = useWorld()
  const scope = React.useRef<HTMLDivElement>(null)
  const eraseBoardThenNavigate = useEraseBoardThenNavigate()
  useEffect(() => {
    if (typeof worldExists === 'boolean') {
      eraseBoardThenNavigate(scope, worldExists ? WORLD_EXISTS_STATE : WORLD_NOT_EXISTS_STATE)
    }
  }, [worldExists])
  useWriteBoard(scope, [])
  return (
    <ChalkEntrance className="w-full h-full absolute flex justify-center" key="loading-page" ref={scope}>
      <main className="flex items-center justify-center py-32 px-16">
        <h1>...</h1>
      </main>
    </ChalkEntrance>
  )
}
