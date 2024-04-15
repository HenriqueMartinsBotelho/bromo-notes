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
import { useRef, useEffect } from 'react'

const App = () => {
  const notePreviewRef = useRef(null)
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  useEffect(() => {
    if (notePreviewRef.current) {
      notePreviewRef.current.focus()
    }
  }, [])

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <div
          tabIndex={-1}
          className="flex flex-col bg-black border-r border-dashed p-1 border-gray-500"
        >
          <ActionButtonsRow tabIndex={-1} />
        </div>
        <Sidebar tabIndex={-1} className="">
          <NotePreviewList
            tabIndex={1}
            ref={notePreviewRef}
            className="mt-3 space-y-1"
            onSelect={resetScroll}
          />
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
