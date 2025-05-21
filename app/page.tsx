import AppMainSection from '@/components/section/app-main-section';
import { getTranslations } from 'next-intl/server';
export default async function App() {
  const t = await getTranslations();
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden bg-background">
      {/* <div
        className="
          w-full md:flex-[1]
          flex flex-col
          items-center md:items-center
          text-center md:text-center
        ">
        <div className="text-center">
          <span className={title()}>{t('values.title_1')}&nbsp;</span>
          <span className={title({ color: 'violet' })}>
            {t('values.title_2')}&nbsp;
          </span>
          <span className={title()}>{t('values.title_3')}</span>
        </div>
        <div className={subtitle({ class: 'mt-4 text-center' })}>
          {t('values.subtitle')}
        </div>
      </div>
      <div
        className="
          w-full md:flex-[2]
          flex flex-col
          items-center md:items-start
          text-center md:text-left
        ">
        <div className="mb-6">
          <div className="text-xl font-semibold mb-2">
            {t('values.vision.title')}
          </div>
          <div className="text-base text-gray-600">
            {t('values.vision.content')}
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold mb-2">
            {t('values.mission.title')}
          </div>
          <div className="text-base text-gray-600">
            {t('values.mission.content')}
          </div>
        </div>
      </div> */}
      <AppMainSection />
    </div>
  );
}
