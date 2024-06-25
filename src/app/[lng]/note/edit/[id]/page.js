import { getNote } from '@lib/redis'
import NoteEditor from '@/components/Note/NoteEditor'

export default async function Page({params}) {
  const noteId = params.id
  const noteContent = await getNote(noteId)
  
  return <NoteEditor note={noteId} initTitle={noteContent.title} initBody={noteContent.content} />
}
