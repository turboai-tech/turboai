import { subtitle, title } from '@/components/primitives';
import { getTranslations } from 'next-intl/server';

export default async function App() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="inline-block mt-10 items-center justify-center">
        <span className={title()}>{t('values.title_1')}&nbsp;</span>
        <span className={title({ color: 'violet' })}>
          {t('values.title_2')}&nbsp;
        </span>
        <span className={title()}>{t('values.title_3')}</span>
        <div className={subtitle({ class: 'mt-4' })}>
          {t('values.subtitle')}
        </div>
      </div>
    </div>
  );
}
