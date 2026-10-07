'use client'

import Link, {LinkProps} from "next/link";
import {usePathname, useRouter} from "next/navigation"
import { animate, useAnimate, motion, AnimationScope, HTMLMotionProps, stagger } from "motion/react"
import React, { createContext } from "react"


export const ChalkBoardContext: React.Context<AnimationScope<React.ElementType>> = createContext({} as AnimationScope<React.ElementType>)
export const ChalkSectionContext: React.Context<AnimationScope<React.ElementType>> = createContext({} as AnimationScope<React.ElementType>)


export async function eraseBoard(scope: React.RefObject<any>) {
  await animate([
    [scope.current, {mask: "URL('/img/mask_out_fast.gif') center no-repeat luminance"}, {duration: 0}],
    // Add another animation while the mask gif plays
    [scope.current, {opacity: 0.8}, {duration: 1.2}],
    // Avoid accidentally flashing the mask again
    [scope.current, {opacity: 0}, {duration: 0}],
  ])
}

export async function resetBoard(scope: React.RefObject<any>) {
  await animate([
    [scope.current, {mask: "", opacity: 0}, {duration: 0}],
    [scope.current, {opacity: 1}, {duration: 1, type: "spring", visualDuration: 0.8}],
  ])
}

export function useEraseBoardThenNavigate() {
  const router = useRouter()
  const pathname = usePathname();

  const eraseBoardThenNavigate = async (scope: React.RefObject<any>, url: string) => {
    if (pathname != url) {
      await eraseBoard(scope)
      router.push(url)
    }
  }
  return eraseBoardThenNavigate
}

export function useResetBoard(scope: React.RefObject<any>, deps: React.DependencyList) {
  React.useEffect(() => {
    resetBoard(scope)
  }, deps)
}


export function ChalkLink(
  {scope, isInternalNav = true, children, ...props}: {
    scope: React.RefObject<any>,
    children: React.ReactNode
    isInternalNav?: boolean,
  } & LinkProps,
) {
  const pathname = usePathname();

  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  return (
    <div className="flex flex-col items-stretch w-fit my-2">
      <Link {...props} className={isInternalNav && pathname == props.href ? 'underline' : ''} onNavigate={async (e) => {
        // Only executes during SPA navigation
        if (isInternalNav) {
          e.preventDefault()
          await eraseBoardThenNavigate(scope, props.href as string)
        }
      }}>{children}</Link>
    </div>
  )
}

// todo: eventually we probably want to animate the inner scrolling here too
export function ChalkEntrance({transition, ...props}: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  const transitionVariant = {
    hidden: {
      mask: "",
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        scale: {type: "spring", visualDuration: 0.8},
        ...transition,
      }
    }
  }

  return <motion.div
    {...props}
    initial="hidden"
    animate="show"
    variants={transitionVariant}
  />
}


export function ChalkyScroll(props: React.ComponentProps<"div">) {
  return <div className="w-full h-full py-4 px-8 overflow-auto" style={{
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