'use client'

import '@/app/globals.css'
import type {Metadata} from "next"
import ChalkWorldInterface from '@/components/ChalkWorldInterface'
import Error from "@/components/Error"
import {useWorld} from "@/components/useWorld";


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
  const worldExists = useWorld()
  return (
    <html lang="en">
      <body className="bg-background text-zinc-100 antialiased">
        <ChalkWorldInterface worldExists={!!worldExists}>
          <Error error={error} reset={reset} baseUrl={'/'} />
        </ChalkWorldInterface>
      </body>
    </html>
  )
}
