import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { locales } from '@root/config.js'
import { useTranslation } from "@/app/i18n/"

export const SwitchLang = async ({ lang }) => {
  const { t } = await useTranslation(lang, 'footer')
  return (
      <>
        <Trans i18nKey="languageSwitcher" t={t}>
          Switch from <strong>{{lng: lang}}</strong> to:{' '}
        </Trans>
        {locales.filter((l) => lang !== l).map((l, index) => {
          return (
            <span key={l} className='text-indigo-300'>
              {index > 0 && (' | ')}
              <Link href={`/${l}/note`}>
                {l}
              </Link>
            </span>
          )
        })}
      </>
  )
}

export default SwitchLang
