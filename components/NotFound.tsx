'use client'

import { useContext } from "react"
import { ChalkBoardContext, ChalkLink } from "@/components/ChalkTransition"
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you were looking for doesn't seem to exist.",
}

export default function NotFound({baseUrl} : {baseUrl: string}) {
  const chalkboard = useContext(ChalkBoardContext);

  return (
    <div className="w-full h-full relative flex justify-center font-sans mask-(--chalk-mask)">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center py-32 px-16 text-xl">
        <div className="text-violet-300">Much like the banana,</div>
        <div className="text-violet-300">this page seems to be missing...</div>
        <img className="justify-self-center" src={process.env.NEXT_PUBLIC_BASE_PATH + "/img/404.png"} alt="Ghost banana: 404" />
        <ChalkLink scope={chalkboard} href={baseUrl}>Back to Home</ChalkLink>
      </main>
    </div>
  )
}
