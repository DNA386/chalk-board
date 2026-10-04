'use client'

import '@/app/globals.css'
import type {Metadata} from "next"
import ChalkWorldInterface from '@/components/ChalkWorldInterface'
import Error from "@/components/Error"


export const metadata: Metadata = {
  title: "OOPS!",
  description: "Something has gone awry",
}


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <html lang="en">
      <body className="bg-background text-zinc-100 antialiased">
        <ChalkWorldInterface>
          <Error error={error} reset={reset} />
        </ChalkWorldInterface>
      </body>
    </html>
  )
}
