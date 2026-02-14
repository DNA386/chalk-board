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
      extensions: [...bindings]
})

const allFiles = await files.walk("app")
allFiles
  .filter((filename) => /\.md$/.test(filename))
  .map(async (filename: string) => {
      const mdContent = await files.read(filename)
      const htmlContent = converter.makeHtml(mdContent)

      // Assume there's not multiple '.md's lying around in the file string...
      const writeFile = filename.replace(/\.md$/, ".ts")
      console.log("Saving", filename, "to", writeFile)
      await files.write(writeFile, `export const htmlContent: string = \`${htmlContent}\``)
  })
