'use client'

import { useContext } from "react"
import { ChalkBoardContext, ChalkLink, ChalkEntrance } from "@/components/ChalkTransition"


export default function Home() {
  const chalkboard = useContext(ChalkBoardContext);
  return (
    <div className="w-full h-full relative flex justify-center">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 sm:items-start">
        <h1 className="py-2 text-center text-6xl text-indigo-300 text-bold w-full">Remi Ganth</h1>
        <h3 className="text-center text-indigo-400 text-xl w-full">Assassin, looking for work</h3>
      </main>
    </div>
  )
}
