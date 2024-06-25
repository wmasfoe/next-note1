import SlideBarSearchField from "./SlideBarSearchField"
import { Suspense } from 'react'
import NoteList from "@components/Note/NoteList/NoteList"
import EditButton from "../EditButton"

export default function LayoutSlideBar() {
  return <>
    {/* slide-bar */}
    <div className="bg-gray-800 w-fit h-full flex flex-col items-start">
      {/* title */}
      <div className="flex justify-center items-center h-16 text-3xl">ABC</div>
      {/* header */}
      <div className="bg-gray-700 flex justify-between items-center px-5 h-16 text-xl gap-3 border-solid border-gray-300">
        <SlideBarSearchField />
        <EditButton>new</EditButton>
      </div>
      <Suspense fallback={<>loading list....</>}>
        <NoteList />
      </Suspense>
    </div>
  </>
}
