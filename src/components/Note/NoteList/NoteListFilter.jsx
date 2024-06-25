'use client';
import { useSearchParams } from 'next/navigation'
import NoteListContent from './NoteListItemContent';

export default function NoteListFilter({ notes }) {

  const searchParams = useSearchParams()

  const searchText = searchParams.get('q')

  const filteredNoteList = notes.filter(note => {
    return !searchText || note.title.toLowerCase().includes(searchText.toLowerCase())
  })

  return <>
    {
      filteredNoteList.map(note => {
        return <NoteListContent
          key={note.key}
          id={note.key}
          title={note.title}
          expandedDate={note.expandedDate}
        >
          {/* 直接使用 NoteList 中渲染好的 children */}
          {note.children}
        </NoteListContent>
      })
    }
  </>
}