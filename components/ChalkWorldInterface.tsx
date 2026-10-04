'use client'

import {usePathname} from 'next/navigation'
import {ChalkBoardContext, ChalkEntrance, ChalkLink, eraseBoard} from "@/components/ChalkTransition"
import React from "react"
import { useAnimate } from "motion/react"
import { CHALKBOARD_URL, CHALKWORLD_URL } from "@/app/consts"
import { useWindowListener } from '@/components/useEventListener'
import { PAGES, SECTIONS } from '@/app/_index/pageIndex'
import { useWorld, useWorldNav, NavDetail } from "@/components/useWorld";


export default function ChalkWorldInterface({children}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scope, animate] = useAnimate()
  const worldExists = useWorld()
  const worldNavigation = useWorldNav(scope)

  // Capture and pass up events relevant when this is being displayed as an Iframe
  function handlePointerMove (event: PointerEvent) {
    // Have to convert to plain object for serialisation to work nicely
    // Only send message if we are in an iframe.
    if (worldExists) {
      window.parent.postMessage({
        type: "pointermove",
        altKey: event.altKey,
        button: event.button,
        buttons: event.buttons,
        clientX: event.clientX,
        clientY: event.clientY,
        ctrlKey: event.ctrlKey,
        layerX: event.layerX,
        layerY: event.layerY,
        metaKey: event.metaKey,
        movementX: event.movementX,
        movementY: event.movementY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        pageX: event.pageX,
        pageY: event.pageY,
        relatedTarget: event.relatedTarget,
        screenX: event.screenX,
        screenY: event.screenY,
        shiftKey: event.shiftKey,
        x: event.x,
        y: event.y,
      }, CHALKWORLD_URL)
    }
  }

  return (
    <div className="font-sans absolute top-0 bottom-0 right-0 left-0 mask-(--chalk-mask) grid"
         onPointerMove={handlePointerMove}
         style={{
           gridTemplateColumns: worldExists ? "1fr calc(100% - (var(--spacing) * 24)) 1fr" : "1fr var(--container-4xl) 1fr",
           gridTemplateRows: "calc(var(--spacing) * 16) calc(100% - var(--spacing) * 32) calc(var(--spacing) * 16)",
         }}
    >
      {/* Textures for blackboard edges */}
      <div className="col-start-1 col-end-4 row-1 relative -z-10">
        <div className="bg-background absolute w-full -bottom-12 top-0"
             style={{
               mask: "url(/img/chalk_mask_top.png) repeat-x",
               maskSize: "auto 100%",
             }}
        ></div>
      </div>
      <div className="col-start-1 col-end-4 row-3 relative -z-10">
        <div className="bg-background absolute w-full -top-12 bottom-0"
             style={{
               mask: "url(/img/chalk_mask_bottom.png) repeat-x",
               maskSize: "auto 100%",
             }}
        ></div>
      </div>
      <div className="col-1 row-start-1 row-end-4 relative -z-10">
        <div className="bg-background absolute h-full -right-8 left-0"
             style={{
               mask: "url(/img/chalk_mask_left.png) repeat-y",
               maskSize: "100% auto",
             }}
        ></div>
      </div>
      <div className="col-3 row-start-1 row-end-4 relative -z-10">
        <div className="bg-background absolute h-full -left-8 right-0"
             style={{
               mask: "url(/img/chalk_mask_right.png) repeat-y",
               maskSize: "100% auto",
             }}
        ></div>
      </div>

      {/* Main content */}
      <ChalkEntrance className="w-full h-full p-4 flex justify-center relative" ref={scope}>
        <ChalkBoardContext value={scope}>
          {children}
        </ChalkBoardContext>
      </ChalkEntrance>

      {/* External navigation (when world is present) */}
      {worldNavigation.map((nav, i) => {
        const heightJitter = Math.sin(i * Math.PI / 2)
        const textPos = {
          bottom: `calc(${nav.pointTarget.y}px + 6 * (1 + ${heightJitter}) * var(--spacing))`,
          left: `calc(${nav.pointTarget.x}px - 3*var(--spacing))`,
        }

        return <div key={nav.name}>
          <div key={nav.name + '_text'} className="absolute font-chalk text-xl uppercase" style={{
            color: nav.color,
            ...textPos,
          }}>
            {nav.name}
          </div>
          <div key={nav.name + '_arrow'} className="absolute --chalk-mask" style={{
            background: nav.color,
            bottom: nav.pointTarget.y,
            left: nav.pointTarget.x,
            width: '1px',
            height: textPos.bottom,
            // mask: "var(--chalk-dash)",
          }}></div>
        </div>
      })}

      {/* Append navigation if no external world. */}
      {
        worldExists === false ?
          <header className="row-1 col-start-1 col-end-4 relative p-2 flex justify-evenly items-center gap-8 h-16">
            <div className="h-1 bg-indigo-800 absolute bottom-0 left-4 right-4" style={{mask: "var(--chalk-dash)"}}></div>
            <ChalkLink scope={scope} href={'/'}>Home</ChalkLink>
            {PAGES.map((page) => {return <ChalkLink scope={scope} href={`/${page}`} key={page}>{page}</ChalkLink>})}
          </header> : <></>
      }
    </div>
  )
}
