'use client';

import ButtonLink from '@/components/button-link';
import SectionHeading from '@/components/section/section-heading';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const t = useTranslations('news');

  return (
    <div className="relative flex flex-col gap-8 pb-24 pt-20">
      <div
        aria-hidden
        className="bg-grid mask-fade-out pointer-events-none absolute inset-x-[-50vw] top-[-80px] h-[420px] select-none"
      />
      <div className="relative">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
      </div>
      <div className="relative flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          className="h-11 rounded-full border border-default/50 px-6 text-sm font-medium"
          href="/solutions"
          variant="outline">
          {t('cta_build')}
          <Icon icon="solar:arrow-right-linear" width={16} />
        </ButtonLink>
        <ButtonLink
          className="h-11 rounded-full px-6 text-sm font-medium"
          href="/about/career"
          variant="ghost">
          {t('cta_careers')}
        </ButtonLink>
      </div>
    </div>
  );
}
