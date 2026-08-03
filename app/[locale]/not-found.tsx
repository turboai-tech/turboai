'use client';

import FeedbackNotFound from '@/components/feedback/feedback-not-found';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-10px)] w-full flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-center text-sm">{t('description')}</p>
        <Link href="/">
          <Button className="my-6 rounded-full border border-default/40 bg-default/40 hover:bg-default/50">
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
