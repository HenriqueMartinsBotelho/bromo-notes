import {
  RootLayout,
  Sidebar,
  Content,
  DraggableTopBar,
  NotePreviewList,
  MarkdownEditor,
  FloatingNoteTitle
} from '@/components'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="">
          <ActionButtonsRow className="border-b p-1 border-gray-500 border-dashed flex gap-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-black border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
