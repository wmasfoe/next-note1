import SlideBarSearchField from "./SlideBarSearchField"
import { Suspense } from 'react'
import NoteList from "@components/Note/NoteList/NoteList"
import EditButton from "../EditButton"
import { Footer } from './Footer'
import { useTranslation } from '@/app/i18n'

export default async function LayoutSlideBar({params}) {

  const { t } = await useTranslation(params.lng)

  return <>
    {/* slide-bar */}
    <div className="bg-gray-800 w-80 h-full flex flex-col items-start">
      {/* title */}
      <div className="flex justify-center items-center h-16 text-3xl">ABC</div>
      {/* header */}
      <div className="bg-gray-700 flex justify-between items-center px-5 h-16 text-xl gap-3 border-solid border-gray-300 w-full">
        <SlideBarSearchField lang={params.lng} />
        <EditButton className={"w-24"}>{t('new')}</EditButton>
      </div>
      <Suspense fallback={<>loading list....</>}>
        <NoteList />
      </Suspense>

      <Footer lng={params.lng} />
    </div>
  </>
}
