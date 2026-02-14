'use client'

import { htmlContent } from './intro'
import Markdown from '@/components/Markdown'
import { ChalkyScroll } from "@/components/ChalkTransition"


export default function Page() {
  return (
    <div className="w-full h-full relative flex justify-center overflow-auto">
      <main className="flex w-full max-w-3xl max-h-90% flex-col items-center justify-start sm:items-start">
        <ChalkyScroll>
          <Markdown html={htmlContent}></Markdown>
        </ChalkyScroll>
      </main>
    </div>
  )
}
