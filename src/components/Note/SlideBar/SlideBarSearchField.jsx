'use client';
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'

export default function SlideBarSearchField() {

  const { replace } = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleSearch(term) {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return <>
    <input type="text" placeholder="SEARCH" className="
      bg-gray-500
      w-40
      h-10
      leading-10
      rounded-3xl
      px-3
      text-center
      focus:outline-dashed focus:outline-2 focus:outline-slate-500"
      onChange={(e) => handleSearch(e.target.value)}
      >
    </input>
  </>
}