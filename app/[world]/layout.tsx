import "@/app/globals.css"
import React from "react"
import ChalkWorldInterface from '@/components/ChalkWorldInterface'
import {WORLD_EXISTS_STATE, WORLD_STATES} from "@/app/consts";


// Only allow world or web modes
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
  return <ChalkWorldInterface worldExists={worldExists}>
    {children}
  </ChalkWorldInterface>
}
