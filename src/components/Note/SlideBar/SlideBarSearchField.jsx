'use client';
import { useRouter, usePathname } from 'next/navigation'
import { useTransition, Suspense } from 'react'
import { useTranslation } from '@/app/i18n'

export default function SlideBarSearchField({lang}) {

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

  return <Suspense fallback={<>loading search</>}>
    <I18nInput lng={lang} onChange={handleSearch} />
  </Suspense>
}

async function I18nInput({
  lng, onChange
}) {

  const { t } = await useTranslation(lng)

  return <>
    <input type="text" placeholder={t('search')} className="
      bg-gray-500
      w-40
      h-10
      leading-10
      rounded-3xl
      px-3
      text-center
      focus:outline-dashed focus:outline-2 focus:outline-slate-500"
      onChange={onChange}
      >
    </input>
  </>
}
