import React, { useEffect, useRef, forwardRef } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'
import { ComponentProps } from 'react'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ onSelect, className, ...props }) => {
    const { notes = [], selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
      if (notes.length === 0 || !listRef.current) return
      if (selectedNoteIndex == null) return

      const initialFocusIndex = selectedNoteIndex >= 0 ? selectedNoteIndex : 0
      const focusableElements = listRef.current.querySelectorAll('div[tabIndex="0"]')

      if (focusableElements[initialFocusIndex] instanceof HTMLElement) {
        ; (focusableElements[initialFocusIndex] as HTMLElement).focus()
      }
    }, [notes, selectedNoteIndex])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (notes.length === 0) return // Se não há notas, não faça nada.

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault() // Previne scroll da página
          const newIdx =
            event.key === 'ArrowDown'
              ? Math.min(notes.length - 1, selectedNoteIndex + 1)
              : Math.max(0, selectedNoteIndex - 1)

          handleNoteSelect(newIdx)()
        }
      }

      const listElement = listRef.current
      if (listElement) {
        listElement.addEventListener('keydown', handleKeyDown)
        return () => listElement.removeEventListener('keydown', handleKeyDown)
      }
      // Caso o elemento não exista, ainda retornamos uma função para manter consistência.
      return () => { }
    }, [notes.length, selectedNoteIndex, handleNoteSelect])

    if (notes.length === 0) {
      return (
        <ul className={twMerge('text-center pt-4', className)} {...props}>
          <span>No notes found!</span>
        </ul>
      )
    }

    return (
      <ul className="flex flex-col gap-1 pt-2" ref={listRef} tabIndex={0}>
        {notes.map((note, index) => (
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
)
