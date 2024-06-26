import { useTranslation } from '@/app/i18n/index'

export default async function Page({params}) {

  const { t } = await useTranslation(params.lng)
  return <div className='h-full w-full text-left flex items-center pl-9'>
    {t('initText')}
  </div>
}
