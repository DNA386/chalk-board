// Convert the specified .md files into typescript by wrapping html content as a string.
import files from 'files'
import showdown from "showdown"


// This is essentially the css file for tailwind
const classMap: {[key: string]: string} = {
  // h1: 'text-5xl text-indigo-200 font-serif',
  // h2: 'text-4xl text-green-200 font-serif',
  // h3: 'text-2xl text-indigo-300',
  // h4: 'text-2xl text-green-300',
  // h5: 'text-xl text-indigo-200',
  // h6: 'text-xl text-indigo-200',
  // p: 'text-base text-zinc-100 py-2 chalky',
  // a: 'text-lg text-indigo-200',
  // blockquote: 'text-base text-indigo-100 px-8 font-sans',
  // code: 'text-base bg-zinc-800 text-green-200 font-mono rounded-sm p-1',
  // em: 'italic',
}

const bindings = Object.keys(classMap)
  .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${classMap[key]}" $1>`
  }));

const converter = new showdown.Converter({
      extensions: [...bindings, {
        // URLS open in new tab (prevents them trying to open inside the blackboard iframe)
        type: 'output',
        regex: new RegExp(`<a (.*)>`, 'g'),
        replace: `<a target="_blank" rel="noopener noreferrer" $1>`
      }]
})

const allPageFiles = await files.walk("markdown/pages")
allPageFiles
  .filter((filename) => /\.md$/.test(filename))
  .map(async (filename: string) => {
      const mdContent = await files.read(filename)
      const htmlContent = converter.makeHtml(mdContent)

      // Assume there's not multiple '.md's lying around in the file string...
      const writeFile = filename
        .replace(/markdown/, "app/[world]")
        .replace(/pages/, "")
        .replace(/\.md$/, "/page.tsx")
      console.log("Saving", filename, "to", writeFile)

      // Build a component which renders the markdown content
      const component: string = `'use client'

import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


const htmlContent: string = \`${htmlContent}\`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center overflow-auto">
      <main className="flex w-full max-w-4xl max-h-90% flex-col items-center justify-between sm:items-start">
        <ChalkyScroll>
          <Markdown html={htmlContent}></Markdown>
        </ChalkyScroll>
      </main>
    </div>
  )
}`
      await files.write(writeFile, component)
  })


const allMindmapFiles = await files.walk("markdown/mindmap")
// const PAGES: {[k: string]: {writeFile: string, filename: string}} = {}
allMindmapFiles
  .filter((filename) => /\.md$/.test(filename))
  .map(async (filename: string) => {
    const mdContent = await files.read(filename)
    const htmlContent = converter.makeHtml(mdContent)

    // Assume there's not multiple '.md's lying around in the file string...
    const writeFile = filename
      .replace(/markdown/, "app/[world]")
      .replace(/\.md$/, ".tsx")
    console.log("Saving", filename, "to", writeFile)

    // const displayName = filename.split("/")[-1].replace(/\.md$/, '')
    // PAGES[displayName] = {writeFile, filename}

    // Build a component which renders the markdown content
    const component: string = `'use client'

import Markdown from '@/components/Markdown'


const htmlContent: string = \`${htmlContent}\`


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-visible">
        <Markdown html={htmlContent}></Markdown>
    </div>
  )
}`
    await files.write(writeFile, component)
  })
