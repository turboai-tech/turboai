'use client';

import { Button, Separator, TextArea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import FeedbackRating from '@/components/feedback/feedback-rating';

export default function FeedbackNotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center">
      <form
        className="flex w-full max-w-sm flex-col gap-2 rounded-md bg-surface p-3 shadow-sm"
        onSubmit={(e) => e.preventDefault()}>
        <TextArea
          aria-label="Feedback"
          name="feedback"
          placeholder={t('feedback_placeholder')}
          rows={8}
          variant="secondary"
        />

        <div className="flex w-full items-center justify-end gap-2 px-1">
          <Icon className="text-muted" icon="la:markdown" width={20} />
          <p className="text-xs text-muted">
            <Link
              className="inline-flex items-center gap-0.5 text-xs text-muted underline-offset-2 hover:underline"
              href="https://guides.github.com/features/mastering-markdown/"
              rel="noreferrer"
              target="_blank">
              Markdown
              <Icon
                className="[&>path]:stroke-[2px]"
                icon="solar:arrow-right-up-linear"
              />
            </Link>
            &nbsp;supported.
          </p>
        </div>

        <Separator className="my-2" />

        <div className="flex w-full items-center justify-between">
          <FeedbackRating name="rating" />
          <Button size="sm" type="submit" variant="primary">
            {t('submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
