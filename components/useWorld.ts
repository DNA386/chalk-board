import React from "react";
import {CHALKBOARD_URL, CHALKWORLD_URL} from "@/app/consts";
import {useWindowListener} from "@/components/useEventListener";
import {useEraseBoardThenNavigate} from "@/components/ChalkTransition";
import {usePathname, useRouter} from "next/navigation";


export type NavDetail = {
  pointTarget: {x: number; y: number};
  color: string;
  name: string;
}


export const useWorld = () => {
  const [worldExists, setWorldExists] = React.useState(null as boolean | null)
  console.log("world building")

  React.useEffect(() => {
    setWorldExists(window.parent != window)
  }, [])

  return worldExists
}


export const useWorldNav = (scope: React.RefObject<any>) => {
  const [worldNavigation, setWorldNavigation] = React.useState([] as NavDetail[])
  const router = useRouter()
  const pathname = usePathname()

  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  // Listen to messages from the world
  useWindowListener("message", async (event) => {
    if (event.origin !== CHALKBOARD_URL) {
      console.log("Received message", event.origin, event.data)

      if ((event.data.type === "navigate") && (event.data.destination !== pathname)) {
        await eraseBoardThenNavigate(scope, event.data.destination)
      }

      if (event.data.type === "setup-nav") {
        setWorldNavigation(event.data.navigation)
      }

    }
  })

  // On first load, request setup info from the world.
  React.useEffect(() => {
    if (window.parent != window) {
      console.log("Requesting nav details")
      window.parent.postMessage({type: "nav-setup-request"}, CHALKWORLD_URL)
    }
  }, [])

  return worldNavigation
}
