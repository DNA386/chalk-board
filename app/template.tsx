'use client'

import "./globals.css"
import { ChalkBoardContext, ChalkEntrance, ChalkLink } from "@/components/ChalkTransition"
import React from "react"
import { useAnimate } from "motion/react"
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/icons"


export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scope, animate] = useAnimate()
  return (
    <div className="font-sans absolute top-0 bottom-0 right-0 left-0 mask-(--chalk-mask) grid"
         style={{
           gridTemplateColumns: "1fr min(var(--container-3xl), calc(100% - (var(--spacing) * 32))) 1fr",
           gridTemplateRows: "calc(var(--spacing) * 16) calc(100% - var(--spacing) * 32) calc(var(--spacing) * 16)",
         }}
    >
      <div className="col-start-1 col-end-4 row-1 relative -z-10">
        <div className="bg-zinc-950 absolute w-full -bottom-12 top-0"
             style={{
               mask: "url(/img/chalk_mask_top.png) repeat-x",
               maskSize: "auto 100%",
             }}
        ></div>
      </div>
      <div className="col-start-1 col-end-4 row-3 relative -z-10">
        <div className="bg-zinc-950 absolute w-full -top-12 bottom-0"
             style={{
               mask: "url(/img/chalk_mask_bottom.png) repeat-x",
               maskSize: "auto 100%",
             }}
        ></div>
      </div>
      <div className="col-1 row-start-1 row-end-4 relative -z-10">
        <div className="bg-zinc-950 absolute h-full -right-8 left-0"
             style={{
               mask: "url(/img/chalk_mask_left.png) repeat-y",
               maskSize: "100% auto",
             }}
        ></div>
      </div>
      <div className="col-3 row-start-1 row-end-4 relative -z-10">
        <div className="bg-zinc-950 absolute h-full -left-8 right-0"
             style={{
               mask: "url(/img/chalk_mask_right.png) repeat-y",
               maskSize: "100% auto",
             }}
        ></div>
      </div>

      <header className="row-1 col-start-1 col-end-4 relative p-2 flex justify-evenly items-center gap-8 h-16">
        {/*<div className="border-b-2 border-indigo-800 absolute bottom-0 left-4 right-4"></div>*/}
        <ChalkLink scope={scope} href={'/'}>Home</ChalkLink>
        <ChalkLink scope={scope} href={'/bio'}>Bio</ChalkLink>
        <ChalkLink scope={scope} href={'/education'}>Education</ChalkLink>
        <ChalkLink scope={scope} href={'/experience'}>Experience</ChalkLink>
      </header>

      <ChalkEntrance className="row-2 col-2 flex justify-center relative" ref={scope}>
        <ChalkBoardContext value={scope}>
          {children}
        </ChalkBoardContext>
      </ChalkEntrance>

      <footer className="row-3 col-start-1 col-end-4 relative p-2 flex justify-evenly items-center gap-8 h-16">
        {/*<div className="border-b-2 border-indigo-800 absolute top-0 left-4 right-4"></div>*/}
        <div className="flex flex-row justify-center items-center">
          <GitHubIcon className="w-6 h-6 m-2  mr-1 text-white"/>
          <ChalkLink scope={scope} href="https://github.com/DNA386">/ DNA386</ChalkLink>
        </div>
        <div className="flex flex-row justify-center items-center">
          <LinkedInIcon className="w-6 h-6 m-2 mr-1 text-white"/>
          <ChalkLink scope={scope} href="https://www.linkedin.com/in/tiffany-duneau/">
            / tiffany-duneau
          </ChalkLink>
        </div>
        <div className="flex flex-row justify-center items-center">
          <EmailIcon className="w-6 h-6 m-2 mr-1 text-white"/>
          <ChalkLink scope={scope} href="mailto://erebus+cv@gmail.com">
            / r.ganth@erebus.com
          </ChalkLink>
        </div>
      </footer>
    </div>
  )
}
