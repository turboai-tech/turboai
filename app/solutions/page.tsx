'use client';

import BuildSection from '@/components/section/build-section';
import ProcessSection from '@/components/section/process-section';
import SectionHeading from '@/components/section/section-heading';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const outcomes = ['1', '2', '3'] as const;

export default function SolutionsPage() {
  const t = useTranslations('solutions');

  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col gap-4 pb-8 pt-20">
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
      </section>

      <BuildSection showHeading={false} />

      <section className="flex flex-col gap-8 py-20">
        <h2 className="text-[clamp(24px,5vw,28px)] font-bold tracking-tighter sm:text-[32px]">
          {t('outcomes_title')}
        </h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex flex-col gap-2 border-t-1 border-default/40 pt-5">
              <Icon
                className="text-accent"
                icon="solar:check-circle-linear"
                width={22}
              />
              <h3 className="text-large font-semibold tracking-tight">
                {t(`outcome_${outcome}_title`)}
              </h3>
              <p className="text-sm leading-6 text-muted">
                {t(`outcome_${outcome}_description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ProcessSection />
    </div>
  );
}
