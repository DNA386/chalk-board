'use client'

import { useContext } from "react"
import { ChalkBoardContext, ChalkLink } from "@/components/ChalkTransition"


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const chalkboard = useContext(ChalkBoardContext);

  return (
    <div className="w-full h-full relative flex justify-center font-sans mask-(--chalk-mask)">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center py-32 px-16 text-xl">
        <div className="text-green-300">Hmm...</div>
        <div className="text-green-300">Something unexpected occurred.</div>
        <img className="justify-self-center" src="/img/500.png" alt="Gel banana" />
        <ChalkLink scope={chalkboard} href={'/'}>Back to Home</ChalkLink>
        <button onClick={() => reset()}>Reset</button>
      </main>
    </div>
  )
}
