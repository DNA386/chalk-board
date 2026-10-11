import "@/app/globals.css"
import React, {Suspense} from "react"
import ChalkWorldInterface from '@/components/ChalkWorldInterface'
import {WORLD_EXISTS_STATE, WORLD_STATES} from "@/app/consts";


// Only allow world or web modes
export const ensureStatic = 'navigation'
export const dynamicParams = false

export async function generateStaticParams() {
  return WORLD_STATES
}


export default function RootTemplate({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ world: string }>
}>) {
  const worldExists = React.use(params).world == WORLD_EXISTS_STATE
  return <Suspense fallback={
    <div className="w-full h-full absolute flex justify-center">
      <div className="flex items-center justify-center py-32 px-16">
        <h1>...</h1>
      </div>
    </div>
  }>
    <ChalkWorldInterface worldExists={worldExists}>
      {children}
    </ChalkWorldInterface>
  </Suspense>
}
