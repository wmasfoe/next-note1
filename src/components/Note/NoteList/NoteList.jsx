import { getAllNotes } from '@lib/redis'
import dayjs from 'dayjs'
import NoteListFilter from "./NoteListFilter"

function formatUpdateTime(time) {
  return dayjs(time).format("YYYY-MM-DD hh:mm:ss");
}
export default async function NoteList() {

  const notes = await getAllNotes() || []

  const usingNoteList = notes?.map((noteItem) => {
    return {
      ...noteItem,
      id: noteItem.id,
      title: noteItem.data?.title,
      expandedDate: <p className="text-sm text-teal-100 text-ellipsis">
          {noteItem.data?.content}
        </p>,
      // 服务端组件提前渲染出 date，避免 dayjs 打包到客户端 bundle
      children: <p className="text-sm text-teal-100">{ formatUpdateTime(noteItem.data?.updateTime) }</p>,
    }
  })

  return <>
    <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
      <div className="px-3 h-fit">
        <NoteListFilter notes={usingNoteList} />
      </div>
    </div>
  </>
}