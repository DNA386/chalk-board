import React from "react";
import {CHALKBOARD_URL, CHALKWORLD_URL, BOARD_NAVIGATION, WORLD_EXISTS_STATE} from "@/app/consts";
import {useWindowListener} from "@/components/useEventListener";
import {useEraseBoardThenNavigate} from "@/components/ChalkTransition";
import {usePathname, useRouter} from "next/navigation";


export type NavDetail = {
  pointTarget: {x: number; y: number};
  color: string;
  name: string;
}


export type SectionDetail = {
  pointTarget: {x: number; y: number};
  name: string;
  index: number;
}


export const useWorld = () => {
  const [worldExists, setWorldExists] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    setWorldExists(window.parent != window)
  }, [])

  return worldExists
}

export const messageWorld = (message: {type: string} & any) => {
  if (window.parent != window) {
    window.parent.postMessage(message, CHALKWORLD_URL)
  }
}

export const useWorldNav = (scope: React.RefObject<any>) => {
  const [worldNavigation, setWorldNavigation] = React.useState(BOARD_NAVIGATION as NavDetail[])
  const router = useRouter()
  const pathname = usePathname()

  const eraseBoardThenNavigate = useEraseBoardThenNavigate()

  // Listen to messages from the world
  useWindowListener("message", async (event) => {
    if (event.origin !== CHALKBOARD_URL) {
      // console.log("Received message", event.origin, event.data)

      if ((event.data.type === "navigate") && (event.data.destination !== pathname)) {
        await eraseBoardThenNavigate(scope, `/${WORLD_EXISTS_STATE}` + event.data.destination)
      }

      if (event.data.type === "setup-nav") {
        setWorldNavigation(event.data.navigation)
      }

    }
  })

  // Pass keyboard events up
  useWindowListener("keyup", (event) => {
    messageWorld({
      type: "keyup",
      altKey: event.altKey,
      code: event.code,
      ctrlKey: event.ctrlKey,
      isComposing: event.isComposing,
      key: event.key,
      location: event.location,
      metaKey: event.metaKey,
    })
  })

  // On first load, request setup info from the world.
  React.useEffect(() => {
    // Unset the board navigation if we aren't in the 3D world
    if (window.parent == window) {
      setWorldNavigation([])
    }

    messageWorld({type: "nav-setup-request"})
  }, [])

  return worldNavigation
}


export const useWorldSections = (sectionDetails: React.RefObject<SectionDetail[]>) => {
  React.useEffect(() => {
    messageWorld({
      type: "section-nav-setup",
      sections: sectionDetails.current
    })
  }, [JSON.stringify(sectionDetails.current)])
}

