import { getTranslations } from 'next-intl/server';

export default async function App() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{t('greeting')}</h1>
    </div>
  );
}
