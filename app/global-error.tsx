'use client'

import '@/app/globals.css'
import { useContext } from "react"
import { ChalkBoardContext, ChalkLink, ChalkEntrance } from "@/components/ChalkTransition"
import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "OOPS!",
  description: "Something has gone awry",
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const chalkboard = useContext(ChalkBoardContext);
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <div className="w-full h-full relative flex justify-center font-sans">
          <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
            <div className="text-green-300">Hmm...</div>
            <img className="w-1/3" src="/img/500.png" alt="Gel banana" />
            <div className="text-green-300">Something unexpected occurred.</div>
            <ChalkLink scope={chalkboard} href={'/'}>Back to Home</ChalkLink>
            <button onClick={() => reset()}>Reset</button>
          </main>
        </div>
      </body>
    </html>
  )
}
