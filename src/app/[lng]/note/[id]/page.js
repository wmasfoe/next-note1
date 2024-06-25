import dayjs from 'dayjs'
import { getNote } from '@lib/redis'
import NotePreview from '@components/Note/NotePreview'
import '@/components/Note/note-preview.css'

export default async function Page({ params }) {
  const noteId = params.id
  const noteContent = await getNote(noteId)

  const { title, content, updateTime } = noteContent
  const time = dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")

  return <div className='flex flex-1 flex-col items-start preview-container'>
    <h1 className="text-4xl">{title}</h1>
    <div className="note-menu" role="menubar">
      <small className="note-updated-at" role="status">
        Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
      </small>
    </div>
    <NotePreview>
      {content}
    </NotePreview>
  </div>
}
