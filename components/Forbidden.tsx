'use client'

import { useContext } from "react"
import { ChalkBoardContext, ChalkLink } from "@/components/ChalkTransition"
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "403 - Forbidden",
  description: "You don't have the required permissions to see this page.",
}


export default function Forbidden({baseUrl}: {baseUrl: string}) {
  const chalkboard = useContext(ChalkBoardContext);

  return (
    <div className="w-full h-full relative flex justify-center font-sans mask-(--chalk-mask)">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center py-32 px-16 text-xl">
        <div className="text-zinc-300">Oops!</div>
        <div className="text-zinc-300">You aren't meant to be here...</div>
        <img className="justify-self-center" src="/img/403.png" alt="Gel banana" />
        <ChalkLink scope={chalkboard} href={baseUrl}>Back to Home</ChalkLink>
      </main>
    </div>
  )
}
