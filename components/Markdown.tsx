import React from "react"

export default function Markdown({html, ...props}: {html: string} & React.HTMLProps<HTMLDivElement>) {
  return <div {...props} className="" dangerouslySetInnerHTML={{__html: html}}></div>
}
