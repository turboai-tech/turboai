'use client';

import ButtonLink from '@/components/button-link';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import SectionHeading from './section-heading';

const steps = ['1', '2', '3'] as const;

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section
      id="process-container"
      className="mx-auto flex w-full flex-col gap-10 py-20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step}
            className="flex flex-col gap-3 border-t border-default/40 pt-5">
            <span className="font-mono text-4xl font-semibold tracking-tighter text-muted">
              {t(`step_${step}_index`)}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">
              {t(`step_${step}_title`)}
            </h3>
            <p className="text-sm leading-6 text-muted">
              {t(`step_${step}_description`)}
            </p>
          </li>
        ))}
      </ol>

      <div className="bg-grid relative mt-4 flex flex-col items-start gap-4 overflow-hidden rounded-lg border border-default/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40"
        />
        <div className="relative flex flex-col gap-1">
          <h3 className="text-xl font-semibold tracking-tight">
            {t('cta_title')}
          </h3>
          <p className="max-w-[520px] text-sm text-muted">
            {t('cta_description')}
          </p>
        </div>
        <ButtonLink
          className="relative h-11 shrink-0 rounded-full cta-gradient px-6 text-sm font-medium shadow-lg"
          href="/contact">
          {t('cta_button')}
          <Icon icon="solar:arrow-right-linear" width={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
