'use client';

import FeedbackNotFound from '@/components/feedback/feedback-not-found';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="w-full mx-auto min-h-[calc(100dvh-10px)] flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-sm text-center mt-2">{t('description')}</p>
        <Link href="/">
          <Button
            radius="full"
            className="my-6 border-1 border-bg-default-100/70 hover:bg-bg-default-100/70 hover:border-bg-default-100/70 bg-bg-default-100/70">
            {t('back')}
            <Icon
              className="[&>path]:stroke-[2px]"
              icon="solar:arrow-right-up-linear"
            />
          </Button>
        </Link>
      </div>
      <FeedbackNotFound />
    </div>
  );
}
