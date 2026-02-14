'use client'

import Link, {LinkProps} from "next/link";
import { useRouter } from "next/navigation"
import { animate, useAnimate, motion, AnimationScope, HTMLMotionProps } from "motion/react"
import React, { createContext } from "react"


export const ChalkBoardContext: React.Context<AnimationScope<React.ElementType>> = createContext({} as AnimationScope<React.ElementType>)
export const ChalkSectionContext: React.Context<AnimationScope<React.ElementType>> = createContext({} as AnimationScope<React.ElementType>)


export function ChalkLink(
  {scope, children, ...props}: {scope: React.RefObject<any>, children: React.ReactNode} & LinkProps,
) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-stretch w-fit my-2">
      <Link {...props} onNavigate={async (e) => {
        // Only executes during SPA navigation
        e.preventDefault()
        await animate([
          [scope.current, {mask: "URL('/img/mask_out_fast.gif') center no-repeat luminance"}, {duration: 0}],
          // Add another animation while the mask gif plays
          [scope.current, {opacity: 0.8}, {duration: 1}],
          // Avoid accidentally flashing the mask again
          [scope.current, {opacity: 0}, {duration: 0}],
        ])
        router.push(props.href as string)
      }}>{children}</Link>
    </div>
  )
}

// todo: eventually we probably want to animate the inner scrolling here too
export function ChalkEntrance(props: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  return <motion.div
    {...props}
    initial={{
      opacity: 0
    }}
    animate={{
      opacity: 1
      // maskPosition: '40% 0%, 0% 50%, 20% 100%',
    }}
    transition={{
      duration: 1,
      scale: { type: "spring", visualDuration: 0.8, bounce: 0.5 },
    }}
  />
}


export function ChalkyScroll(props: React.ComponentProps<"div">) {
  return <div className="w-full h-full py-8 px-16 overflow-auto" style={{
    mask: `url('/img/chalk_mask_top.png') 0 0rem / auto 6em repeat-x exclude,
           url('/img/black_mask.png') intersect, 
           url('/img/chalk_mask_bottom.png') 0 calc(100% + 1px) / auto 6em repeat-x exclude, 
           url('/img/black_mask.png')`
  }}>
    <div className="py-12">
      {props.children}
    </div>
  </div>
}