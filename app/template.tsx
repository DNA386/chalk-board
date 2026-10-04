'use client'

import "./globals.css"
import React from "react"
import ChalkWorldInterface from '@/components/ChalkWorldInterface'


export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChalkWorldInterface>
          {children}
    </ChalkWorldInterface>
  )
}
