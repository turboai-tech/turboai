'use client';

import ButtonLink from '@/components/button-link';
import SectionHeading from '@/components/section/section-heading';
import { Chip, cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import React from 'react';

import { engagements, type EngagementGroup } from './engagements';

export default function PricingComponent() {
  const t = useTranslations('pricing');
  const [group, setGroup] = React.useState<EngagementGroup>('project');

  const visible = engagements.filter((engagement) => engagement.group === group);

  return (
    <section
      id="pricing-container"
      className="mx-auto flex w-full flex-col items-center gap-10 py-20">
      <SectionHeading
        align="center"
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      <div
        aria-label={t('title')}
        className="flex gap-1 rounded-full bg-default/40 p-1"
        role="tablist">
        {(
          [
            ['project', 'tab_1_title', 'tab_1_description'],
            ['partnership', 'tab_2_title', 'tab_2_description'],
          ] as const
        ).map(([key, titleKey, descKey]) => (
          <button
            key={key}
            aria-selected={group === key}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors',
              group === key
                ? 'bg-background text-foreground shadow-sm dark:bg-default/50'
                : 'text-muted hover:text-foreground',
            )}
            role="tab"
            type="button"
            onClick={() => setGroup(key)}>
            <span>{t(titleKey)}</span>
            <Chip size="sm" variant="soft">
              {t(descKey)}
            </Chip>
          </button>
        ))}
      </div>

      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((engagement) => (
          <li
            key={engagement.key}
            className={cn(
              'relative flex flex-col gap-6 rounded-lg border border-default/40 bg-background p-7',
              {
                'border-accent/60 shadow-md': engagement.featured,
                'md:col-span-2 md:mx-auto md:max-w-[520px]':
                  visible.length === 1,
              },
            )}>
            {engagement.badge ? (
              <Chip
                className="absolute right-6 top-6"
                size="sm"
                variant="soft">
                {t(engagement.badge)}
              </Chip>
            ) : null}

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-tight">
                {t(engagement.title)}
              </h3>
              <p className="max-w-[400px] text-sm leading-6 text-muted">
                {t(engagement.description)}
              </p>
            </div>

            <p className="font-mono text-2xl font-semibold tracking-tight">
              {t(engagement.price)}
            </p>

            <ul className="flex flex-1 flex-col gap-2">
              {t(engagement.features)
                .split(',')
                .map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Icon
                      className="mt-0.5 shrink-0 text-accent"
                      icon="ci:check"
                      width={18}
                    />
                    <p className="text-sm text-muted">{feature.trim()}</p>
                  </li>
                ))}
            </ul>

            <ButtonLink
              className="w-full rounded-full font-medium"
              href="/contact"
              variant={engagement.featured ? 'primary' : 'outline'}>
              {t(engagement.buttonText)}
            </ButtonLink>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">
        {t('question')}&nbsp;
        <Link
          className="text-sm text-foreground underline"
          href="/contact">
          {t('question_access')}
        </Link>
      </p>
    </section>
  );
}
