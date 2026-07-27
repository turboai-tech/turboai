'use client';

import { Accordion } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import faqs from './faqs';

export default function Faq() {
  const t = useTranslations('Faq');

  return (
    <section className="mx-auto w-full max-w-6xl px-0 py-8 sm:py-12 md:px-4 lg:px-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <h2 className="px-2 text-2xl leading-7">
          <span className="inline-block md:hidden">{t('short_title')}</span>
          <span className="hidden md:inline-block">{t('title')}</span>
        </h2>
        <Accordion
          allowsMultipleExpanded
          className="w-full gap-3"
          variant="surface">
          {faqs.map((item, i) => (
            <Accordion.Item
              key={i}
              className="rounded-lg border border-default/40 bg-transparent px-6 data-[expanded=true]:bg-default/40"
              id={String(i)}>
              <Accordion.Heading>
                <Accordion.Trigger className="py-4 font-medium md:py-6">
                  {t(item.title)}
                  <Accordion.Indicator>
                    <Icon icon="solar:alt-arrow-down-linear" width={24} />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="pb-6 pt-0 text-base text-muted">
                  {t(item.content)}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
