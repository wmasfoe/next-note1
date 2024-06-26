import { useTranslation } from '@/app/i18n/index'

export default async function Page({params}) {

  const { t } = await useTranslation(params.lng)
  return <div>
    {t('initText')}
  </div>
}
