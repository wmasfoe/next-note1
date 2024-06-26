'use client';
import { useRouter, usePathname } from 'next/navigation'
import { useTransition, Suspense } from 'react'
import { useClientTranslation } from '@/app/i18n'

export default function SlideBarSearchField({lang}) {

  const { replace } = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const { t } = useClientTranslation(lang)

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
    <input type="text" placeholder={t('search')} className="
      bg-gray-500
      flex-1
      h-10
      leading-10
      rounded-3xl
      px-3
      text-center
      focus:outline-dashed focus:outline-2 focus:outline-slate-500 w-full"
      onChange={handleSearch}
      >
    </input>
  </>
}
