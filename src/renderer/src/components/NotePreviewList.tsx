import { notesMock } from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (notes?.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes found!</span>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col gap-1 pt-2">
      {notes?.map((note, index) => (
        <NotePreview
          isActive={index === selectedNoteIndex}
          onClick={handleNoteSelect(index)}
          key={note.title + note.lastEditTime}
          {...note}
        />
      ))}
    </ul>
  )
}
