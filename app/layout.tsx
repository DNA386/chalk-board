import type { Metadata } from "next"
import "@/app/globals.css"
import React from "react"


export const metadata: Metadata = {
  title: "Blackboard CV",
  description: "A work in progress",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="text-[12px] md:text-[14px] lg:text-[16px]">
      <body
        className="text-zinc-100 font-sans antialiased absolute top-0 left-0 right-0 bottom-0"
        style={{
          background: "url(/img/board_texture_smaller.png), var(--color-background)",
          backgroundRepeat: "repeat",
        }}
      >
        {children}
      </body>
    </html>
  )
}
