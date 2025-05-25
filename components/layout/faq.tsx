'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import { Icon } from '@iconify/react';

import { useTranslations } from 'next-intl';
import faqs from './faqs';

export default function Faq() {
  const t = useTranslations('Faq');

  return (
    <section className="mx-auto w-full max-w-6xl px-0 py-12 sm:py-16 md:px-4 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <h2 className="px-2 text-2xl leading-7">
          <span className="inline-block md:hidden">{t('short_title')}</span>
          <span className="hidden md:inline-block">{t('title')}</span>
        </h2>
        <Accordion
          fullWidth
          keepContentMounted
          className="gap-3"
          itemClasses={{
            base: 'px-6 !bg-transparent hover:!bg-default-100 !shadow-none data-[open=true]:!bg-default-100',
            title: 'font-medium',
            trigger: 'py-4 md:py-6',
            content: 'pt-0 pb-6 text-base text-default-500',
            indicator: 'data-[open=true]:rotate-180',
          }}
          items={faqs}
          selectionMode="multiple"
          variant="splitted">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              indicator={
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  width={24}
                />
              }
              title={t(item.title)}>
              {t(item.content)}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
