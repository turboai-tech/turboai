'use client';

import SectionHeading from '@/components/section/section-heading';
import { useTranslations } from 'next-intl';

const milestones = ['1', '2', '3'] as const;

export default function StoryPage() {
  const t = useTranslations('story');

  return (
    <div className="flex flex-col pb-24">
      <section className="relative flex flex-col gap-4 pb-12 pt-20">
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

      <ol className="flex flex-col">
        {milestones.map((milestone) => (
          <li
            key={milestone}
            className="flex flex-col gap-2 border-t-1 border-default/40 py-8 md:flex-row md:gap-12">
            <span className="label-mono shrink-0 pt-1 md:w-32">
              {t(`milestone_${milestone}_date`)}
            </span>
            <div className="flex max-w-[680px] flex-col gap-2">
              <h2 className="text-xl font-semibold tracking-tight">
                {t(`milestone_${milestone}_title`)}
              </h2>
              <p className="leading-7 text-muted">
                {t(`milestone_${milestone}_description`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
