import {MindMapArrow} from "@/components/Arrow";
import React from "react";
import {SectionDef} from "@/app/_index/pageIndex";
import {messageWorld} from "@/components/useWorld";
import {ChalkEntrance} from "@/components/ChalkTransition";


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

  return <div className={props.details.classNames + ' items-center'} id={props.details.name} onClick={() => onClick()}>
    <ChalkEntrance key={'mindmap-' + props.details.name} transition={{delay: props.index/3}}>
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
