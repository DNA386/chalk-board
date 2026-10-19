import {MindMapArrow} from "@/components/Arrow";
import React from "react";
import {SectionDef} from "@/app/_index/pageIndex";
import {messageWorld} from "@/components/useWorld";
import {ChalkEntrance, useAnimationQueue, useWriteBoard} from "@/components/ChalkTransition";


export default function MindmapSection(props: {
  index: number,
  details: SectionDef,
  mindmap: HTMLDivElement | null,
}) {
  const onClick = () => {
    messageWorld({
      type: "section-clicked",
      section: props.details.name,
      index: props.index,
    })
  }

  const scope = React.useRef<HTMLDivElement>(null)
  const { enqueue } = useAnimationQueue(scope)
  useWriteBoard(scope, enqueue, [], props.index * 1000 / 3)

  return <div className={props.details.classNames + ' items-center'}
              id={props.details.name}
              onClick={() => onClick()}
  >
    <ChalkEntrance ref={scope} id={props.details.name + '-animation'}>
      <props.details.component/>
      {props.details.arrow ? (
        <MindMapArrow
          from={props.details.arrow.from}
          to={props.details.name}
          curvature={props.details.arrow.curvature}
          mindmap={props.mindmap} />
      ): <></>}
    </ChalkEntrance>
  </div>
}
