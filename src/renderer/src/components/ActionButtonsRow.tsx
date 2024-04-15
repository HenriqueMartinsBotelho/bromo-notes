import { DeleteNoteButton, NewNoteButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div className="mt-10 border-gray-500 border-dashed flex flex-col gap-2" {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
