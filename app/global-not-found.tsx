'use client'

import '@/app/globals.css'
import { useContext } from "react"
import { ChalkBoardContext, ChalkLink, ChalkEntrance } from "@/components/ChalkTransition"
import type {Metadata} from "next";
import {useAnimate} from "motion/react";


export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you were looking for doesn't seem to exist.",
}

export default function NotFound() {
  const [scope, animate] = useAnimate()
  return (
    <html lang="en">
      <body className="bg-background text-zinc-100 antialiased">
        <ChalkEntrance className="absolute top-0 left-0 bottom-8 right-0 flex justify-center" ref={scope}>
            <div className="w-full h-full relative flex justify-center font-sans  mask-(--chalk-mask)">
              <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-xl">
                <img className="justify-self-center" src="/img/404.png" alt="Shrug, 404" />
                <div className="text-violet-300">Much like the banana,</div>
                <div className="text-violet-300">this page seems to be missing...</div>
                <ChalkLink scope={scope} href={'/'}>Back to Home</ChalkLink>
              </main>
            </div>
        </ChalkEntrance>
      </body>
    </html>
  )
}
