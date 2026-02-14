
export default function Markdown({html}: {html: string}) {

  return <div className="" dangerouslySetInnerHTML={{__html: html}}></div>
}
