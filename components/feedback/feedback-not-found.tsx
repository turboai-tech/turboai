'use client';

import { Button, Divider, Link, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';

import FeedbackRating from '@/components/feedback/feedback-rating';
import { useTranslations } from 'next-intl';

export default function FeedbackNotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <form
        className="flex w-full max-w-sm flex-col gap-2 rounded-medium bg-content1 p-3 shadow-small"
        onSubmit={(e) => e.preventDefault()}>
        <Textarea
          aria-label="Feedback"
          name="feedback"
          placeholder={t('feedback_placeholder')}
          variant="faded"
          rows={20}
        />

        <div className="flex w-full items-center justify-end gap-2 px-1">
          <Icon
            className="text-default-400 dark:text-default-300"
            icon="la:markdown"
            width={20}
          />
          <p className="text-tiny text-default-400 dark:text-default-300">
            <Link
              className="text-tiny text-default-500"
              color="foreground"
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

        <Divider className="my-2" />

        <div className="flex w-full items-center justify-between">
          <FeedbackRating name="rating" />
          <Button
            color="primary"
            size="sm"
            type="submit">
            {t('submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
