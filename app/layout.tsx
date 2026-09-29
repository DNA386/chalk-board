import type { Metadata } from "next"
import "./globals.css"
import React from "react"


export const metadata: Metadata = {
  title: "Blackboard CV",
  description: "A work in progress",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body
        className="text-zinc-100 font-sans antialiased"
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
