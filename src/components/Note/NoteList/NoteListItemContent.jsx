'use client'
import { useState } from "react"
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { layoutDeleteNote } from '@noteAction'
import Loading from '@components/common/Loading'

export default function Content({ id, expandedDate, children, title }) {
  
  const router = useRouter()
  const selectedLayoutSegment = useSelectedLayoutSegments()
  const handleNoteContent = (event) => {
    router.push(`/note/${id}`)
  }

  const lastSelectedLayoutSegment = selectedLayoutSegment[selectedLayoutSegment.length - 1]
  const isFocus = lastSelectedLayoutSegment === id

  const [isShowContent, setIsShowContent] = useState(false)

  const [loading, setLoading] = useState(false)
  async function handleClick(event) {
    try {
      setLoading(true)
      await layoutDeleteNote(id)
      setLoading(false)
    } catch(e) {
      console.error(e)
    }
  }

  function handleMouseEnter(event) {
    setIsShowContent(true)
    event.preventDefault()
    return false
  }
  function handleMouseLeave(event) {
    setIsShowContent(false)
    event.preventDefault()
    return false
  }

  return <div
      className={`
        my-3
        p-3
        cursor-pointer
        bg-gray-700
        rounded-lg
        flex
        flex-row
        hover:outline
        hover:outline-1
        hover:outline-slate-500
        active:bg-gray-600
        gap-2
        group/item
        group-hover/item:visible
        duration-75
        ${isFocus ? 'bg-gray-600' : ''}
      `}
      onClickCapture={handleNoteContent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-1 flex-col"
        style={{
          transitionProperty: 'height',
          transitionDuration: '100ms',
          height: isShowContent ? '72px' : '48px',
        }}
      >
        <p className="text-xl text-teal-100">{title}</p>
        {
          children
        }
        {
          isShowContent ? expandedDate :
            <></>
        }
      </div>
      {/* 箭头 */}
      <button
        disabled={loading}
        className="w-4 h-4 rounded-full hidden group-hover/item:block hover:bg-slate-600 p-2 box-content cursor-pointer"
        onClickCapture={handleClick}
      >
        {
          loading ?
            <Loading/> :
            <span data-v-61cac62e=""><svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10V44H39V10H9Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M20 20V33" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28 20V33" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 10H44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10L19.289 4H28.7771L32 10H16Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path></svg></span>
        }
        
      </button>
    </div>
}