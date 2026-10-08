'use client'

import Link, {LinkProps} from "next/link";
import {usePathname, useRouter} from "next/navigation"
import React, { createContext } from "react"


export const ChalkBoardContext: React.Context<React.RefObject<HTMLElement | null>> = createContext({} as React.RefObject<HTMLElement | null>)

export async function eraseBoard(scope: React.RefObject<HTMLElement | null>) {
  if (!scope.current) {return}

  scope.current.style.mask = "URL('/img/mask_out_fast.gif') center no-repeat luminance"
  await new Promise(resolve => setTimeout(resolve, 1100));
  scope.current.style.opacity = "0"
}

export async function writeBoard(scope: React.RefObject<HTMLElement | null>, delay: number) {
  if (!scope.current) {return}

  scope.current.style.mask = ""
  await new Promise(resolve => setTimeout(resolve, delay));
  await new Promise((resolve) => {
    let start: number
    function fade(timestamp: number) {
      if (!scope.current) {return resolve(null)}

      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      const opacity = Math.min(Math.sin(elapsed * Math.PI / 2000), 1);
      scope.current.style.opacity = `${opacity}`;

      // Account for rounding errors
      if (opacity < 1 - 1e-5) {
        requestAnimationFrame(fade);
      } else {
        scope.current.style.opacity = "1"
        resolve(1)
      }
    }
    requestAnimationFrame(fade);
  })
}

export function useEraseBoardThenNavigate() {
  const router = useRouter()
  const pathname = usePathname();

  const eraseBoardThenNavigate = async (scope: React.RefObject<HTMLElement | null>, url: string) => {
    if (pathname != url) {
      await eraseBoard(scope)
      router.push(url)
    }
  }
  return eraseBoardThenNavigate
}


export function useWriteBoard(scope: React.RefObject<HTMLElement | null>, deps: React.DependencyList, delay?: number) {
  React.useEffect(() => {
    writeBoard(scope, delay ?? 0)
  }, deps)
}


export function ChalkLink(
  {scope, isInternalNav = true, children, ...props}: {
    scope: React.RefObject<HTMLElement | null>,
    children: React.ReactNode
    isInternalNav?: boolean,
  } & LinkProps,
) {
  const pathname = usePathname();

  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  return (
    <div className="flex flex-col items-stretch w-fit my-2">
      <Link {...props}
            {...(isInternalNav ? {} : {target:"_blank", rel:"noopener noreferrer"})}
            className={isInternalNav && pathname == props.href ? 'underline' : ''}
            onNavigate={async (e) => {
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
export function ChalkEntrance(props: React.ComponentProps<"div">) {
  return <div style={{opacity: 0, mask: ""}} {...props} />
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
