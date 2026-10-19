'use client'

import Link, {LinkProps} from "next/link";
import {usePathname, useRouter} from "next/navigation"
import React, {createContext, useState} from "react"
import Markdown from "@/components/Markdown";
import { ChalkArrow } from "@/components/Arrow";


export const ChalkBoardContext: React.Context<{scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation | undefined}> = createContext(
  {scope: {} as React.RefObject<HTMLElement | null>, enqueue: undefined as EnqueueAnimation | undefined}
)

export type AnimationSpec = { animation: () => Promise<any>, type: "erase" | "write", skip: boolean, resolve: (value: unknown) => void }
export type EnqueueAnimation = (animation: AnimationSpec["animation"], type: AnimationSpec["type"], resolve: AnimationSpec["resolve"]) => void

export function useAnimationQueue (scope: React.RefObject<HTMLElement | null>) {
  const queue = React.useRef<AnimationSpec[]>([])
  const animationId = React.useRef<any>(undefined)

  const enqueue: EnqueueAnimation = (animation: AnimationSpec["animation"], type: AnimationSpec["type"], resolve: AnimationSpec["resolve"]) => {
    // Adjacent write and erase should cancel out
    const prevAnimation = queue.current.length > 0 ? queue.current[queue.current.length - 1].type : undefined
    const skip = prevAnimation === "write" && type === "erase"
    if (skip) {
      queue.current[queue.current.length - 1].skip = skip
    }
    queue.current.push({animation, type, skip: skip || (prevAnimation == type), resolve })
  }
  const cancelAnimations = () => {
    cancelAnimationFrame(animationId.current)
  }

  async function animate(timestamp: number) {
    if (!scope.current) {return}

    // Something is waiting to animate
    if (queue.current.length > 0) {
      const animation = queue.current.shift()
      if (!animation!.skip) {
        await animation!.animation()
      }
      animation!.resolve(true)
    }

    animationId.current = requestAnimationFrame(animate);
  }

  // Reset if scope changes
  React.useEffect(() => {
    cancelAnimations()
    console.log("updating queue", scope.current?.id)
    animationId.current = requestAnimationFrame(animate);
  }, [scope.current?.id])

  return { enqueue, cancelAnimations }
}


async function animateBoard(scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation | undefined, type: AnimationSpec["type"], animation: AnimationSpec["animation"]) {
  if (!scope.current) {return}

  if (typeof enqueue == "undefined") {
    await animation()
  } else {
    const resolution = new Promise(async (resolve) => {
      enqueue(animation, type, resolve)
    })
    await resolution
  }
}


export async function eraseBoard(scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation | undefined) {
  await animateBoard(
    scope,
    enqueue,
    "erase",
    () => new Promise((resolve) => {
      let start: number
      function erase(timestamp: number) {
        if (!scope.current) {return resolve(null)}

        if (start === undefined) {
          start = timestamp;
          scope.current.style.maskSize = "100% 100%";
          scope.current.style.mask = `URL('${process.env.NEXT_PUBLIC_BASE_PATH}/img/mask_out_fast.gif') center no-repeat luminance`
        }
        const elapsed = timestamp - start;

        // Account for rounding errors
        if (elapsed < 1100) {
          requestAnimationFrame(erase);
        } else {
          scope.current.style.opacity = "0"
          resolve(0)
        }
      }
      requestAnimationFrame(erase);
    })
  )
}

export async function writeBoard(scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation, delay: number,) {
  await animateBoard(
    scope,
    enqueue,
    "write",
    () => new Promise(async (resolve) => {
      if (!scope.current) {return resolve(false)}

      scope.current.style.mask = ""
      await new Promise(resolve => setTimeout(resolve, delay));

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
        if (elapsed < 1000) {
          requestAnimationFrame(fade);
        } else {
          scope.current.style.opacity = "1"
          resolve(1)
        }
      }
      requestAnimationFrame(fade);
    })
  )
}


export function useEraseBoardThenNavigate() {
  const router = useRouter()
  const pathname = usePathname();

  const eraseBoardThenNavigate = async (scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation | undefined, url: string) => {
    if (pathname != url) {
      await eraseBoard(scope, enqueue)
      router.push(url)
    }
  }
  return eraseBoardThenNavigate
}


export function useWriteBoard(scope: React.RefObject<HTMLElement | null>, enqueue: EnqueueAnimation, deps: React.DependencyList, delay?: number) {
  React.useEffect(() => {
    writeBoard(scope, enqueue, delay ?? 0)
  }, deps)
}


export function ChalkLink(
  {scope, enqueue, isInternalNav = true, children, ...props}: {
    scope: React.RefObject<HTMLElement | null>,
    enqueue: EnqueueAnimation | undefined,
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
          await eraseBoardThenNavigate(scope, enqueue, props.href as string)
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  return <div className="w-full h-full py-4 px-8 overflow-auto" style={{
    mask: `url('${basePath}/img/chalk_mask_top.png') 0 0rem / auto 6em repeat-x exclude,
           url('${basePath}/img/black_mask.png') intersect, 
           url('${basePath}/img/chalk_mask_bottom.png') 0 calc(100% + 1px) / auto 6em repeat-x exclude, 
           url('${basePath}/img/black_mask.png')`
  }}>
    <div className="py-12">
      {props.children}
    </div>
  </div>
}


export function ChalkyPagination(props: {title: string, pageNames: string[], pages: string[], id?: string}) {
  const titleEl = React.useRef<HTMLDivElement>(null)
  const menuEl = React.useRef<HTMLDivElement>(null)
  const scope = React.useRef<HTMLDivElement>(null)
  const { enqueue } = useAnimationQueue(scope)

  const [page, setPage] = useState(0);
  const scrollBase = React.useRef(0)
  const scrolling = React.useRef(false)

  const [arrowCoords, setArrowCoords] = useState({
    from: {x: 0, y: 0},
    to: {x: 0, y: 0},
  });

  const changePage = async function (newPage: number) {
    if (newPage !== page) {
      await eraseBoard(scope, enqueue)
      setPage(newPage);
      await writeBoard(scope, enqueue, 1)
    }
  }
  React.useEffect(() => {
    if (titleEl.current && menuEl.current) {
      const padding = 20
      setArrowCoords({
        from: {
          x: titleEl.current.offsetLeft - padding,
          y: titleEl.current.offsetTop + 0.5 * titleEl.current.clientHeight,
        },
        to: {
          x: menuEl.current.offsetLeft + 0.5 * menuEl.current.clientWidth,
          y: menuEl.current.offsetTop - padding,
        }
      })
    }
  }, [titleEl, menuEl]);

  const handleScrollMenu: React.WheelEventHandler = async (event) => {
    if (!scrolling.current) {
      const dirUp = event.deltaY < 0
      if (dirUp && page - 1 >= 0) {
        scrolling.current = true
        await changePage(page - 1)
        scrolling.current = false
      }
      if (!dirUp && page + 1 < props.pageNames.length) {
        scrolling.current = true
        await changePage(page + 1)
        scrolling.current = false
      }
    }
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH

  return <div className="w-full h-full py-4 px-8 overflow-visible flex flex-col md:flex-row gap-8 items-start start" onWheel={handleScrollMenu}>
    <div ref={menuEl} className="flex shrink-0 flex-row md:flex-col md:w-32 md:mt-32 gap-8" >
      {props.pageNames.map((pageName, i) => {
        return <div key={i} onClick={() => {changePage(i)}} className={i == page ? "underline text-violet-300" : ""}>
          {pageName}
        </div>
      })}
    </div>
    <div className="flex flex-grow flex-col justify-start items-start h-full overflow-visible">
      <Markdown ref={titleEl} html={props.title}></Markdown>

      <div className="overflow-auto py-18 pr-4 -my-12 w-full" style={{
        mask: `url('${basePath}/img/chalk_mask_top.png') 0 0rem / auto 6em repeat-x exclude,
         url('${basePath}/img/black_mask.png') intersect, 
         url('${basePath}/img/chalk_mask_bottom.png') 0 calc(100% + 1px) / auto 6em repeat-x exclude, 
         url('${basePath}/img/black_mask.png')`
      }}>
        <div id={(props.id ?? "page") + "-animation"} ref={scope}>
          <Markdown html={props.pages[page]}></Markdown>
        </div>
      </div>
    </div>
    <div  className="opacity-0 md:opacity-100">
      <ChalkArrow from={arrowCoords.from} to={arrowCoords.to} curvature={-50}></ChalkArrow>
    </div>
  </div>
}
