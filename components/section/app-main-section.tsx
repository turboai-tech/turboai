'use client';

import ButtonLink from '@/components/button-link';
import { Icon } from '@iconify/react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import { useTranslations } from 'next-intl';
import AppScreenshotSkewed from './app-screenshot-skewed';

const stats = ['1', '2', '3'] as const;

// Each hero block fades up slightly after the previous one.
const riseIn = (order: number) => ({
  initial: { filter: 'blur(12px)', opacity: 0, y: 16 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: {
    bounce: 0,
    delay: 0.08 * order,
    duration: 0.9,
    type: 'spring' as const,
  },
});

export default function AppMainSections() {
  const t = useTranslations('AppMainSection');

  return (
    <section className="relative flex flex-col items-start pt-12 sm:pt-20">
      <div
        aria-hidden
        className="bg-grid mask-fade-out pointer-events-none absolute inset-x-[-50vw] top-[-80px] h-[520px] select-none sm:top-[-120px] sm:h-[720px]"
      />

      <LazyMotion features={domAnimation}>
        <section className="z-20 flex flex-col items-start justify-center gap-5 sm:gap-6">
          <m.div {...riseIn(0)}>
            <span className="label-mono inline-flex items-center gap-2 rounded-full border-1 border-default/40 bg-background/60 px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              {t('eyebrow')}
            </span>
          </m.div>

          <m.h1
            {...riseIn(1)}
            className="text-start text-[clamp(40px,9vw,52px)] font-bold leading-[1.05] tracking-tighter sm:text-[76px]">
            <span className="text-foreground">{t('title_1')}&nbsp;</span>
            <span className="text-cta-gradient">
              {t('title_2')}&nbsp;
            </span>
            <span className="text-foreground">{t('title_3')}</span>
          </m.h1>

          <m.p
            {...riseIn(2)}
            className="text-start text-lg font-medium tracking-tight text-foreground/90 sm:text-2xl">
            {t('subtitle')}
          </m.p>

          <m.p
            {...riseIn(3)}
            className="max-w-[560px] text-start text-base font-normal leading-7 text-muted sm:text-[18px]">
            {t('description')}
          </m.p>

          <m.div
            {...riseIn(4)}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink
              className="h-11 rounded-full cta-gradient px-6 text-sm font-medium shadow-lg"
              href="/contact">
              {t('cta_primary')}
            </ButtonLink>
            <ButtonLink
              className="h-11 rounded-full border border-default/50 px-6 text-sm font-medium"
              href="/solutions"
              variant="outline">
              {t('cta_secondary')}
              <Icon
                className="text-muted [&>path]:stroke-[1.5]"
                icon="solar:arrow-right-linear"
                width={16}
              />
            </ButtonLink>
          </m.div>

          <m.dl
            {...riseIn(5)}
            className="mt-2 grid w-full grid-cols-1 gap-px overflow-hidden rounded-lg border-1 border-default/40 bg-default/50 sm:mt-4 sm:grid-cols-3">
            {stats.map((index) => (
              <div
                key={index}
                className="flex flex-col gap-1 bg-background px-5 py-4">
                <dt className="font-mono text-xl font-semibold tracking-tight text-foreground">
                  {t(`stat_${index}_value`)}
                </dt>
                <dd className="text-sm text-muted">
                  {t(`stat_${index}_label`)}
                </dd>
              </div>
            ))}
          </m.dl>
        </section>

        <m.div
          key="hero-section-app-screenshot"
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          className="mt-1 w-full sm:mt-4 sm:mb-6"
          initial={{ filter: 'blur(16px)', opacity: 0, y: 24 }}
          transition={{
            bounce: 0,
            delay: 0.1,
            duration: 1.2,
            type: 'spring',
          }}>
          {/* Skewed SVG has a large empty triangle; clip and scale on mobile. */}
          <div className="relative -mx-2 h-[200px] overflow-hidden sm:mx-0 sm:h-auto sm:overflow-visible">
            <AppScreenshotSkewed className="absolute left-1/2 top-1/2 w-[155%] max-w-none -translate-x-[46%] -translate-y-[48%] sm:relative sm:left-0 sm:top-0 sm:w-full sm:max-w-full sm:translate-x-0 sm:translate-y-0" />
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
}
