'use client';

import { Spacer } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function CareerComponent() {
  const t = useTranslations('Career');
  return (
    <section
      id="career-container"
      className="flex max-w-4xl flex-col items-center py-24 mx-auto"
    >
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium text-secondary">{t('subtitle')}</h2>
        <h1 className="text-3xl font-medium tracking-tight">{t('title')}</h1>
        <Spacer y={4} />
        <h2 className="text-large text-default-500">{t('description')}</h2>
      </div>
    </section>
  );
}
