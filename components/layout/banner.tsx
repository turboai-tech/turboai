'use client';

import ButtonLink from '@/components/button-link';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function BannerComponent() {
  const t = useTranslations('Navbar');

  return (
    <div
      data-banner
      className="flex w-full items-center gap-x-3 border-b border-default/40 bg-gradient-to-r from-default/40 via-danger-100 to-secondary-100 px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <span aria-label="rocket" className="hidden md:block" role="img">
        🚀
      </span>
      <p className="text-sm text-foreground">
        <Link className="text-inherit" href="/#pricing-container">
          {t('banner_title')}
        </Link>
      </p>
      <ButtonLink
        className="group relative h-9 overflow-hidden rounded-full bg-transparent text-sm font-normal"
        href="/#pricing-container"
        style={{
          border: 'solid 2px transparent',
          backgroundImage: `linear-gradient(var(--background), var(--background)), linear-gradient(to right, #F871A0, #9353D3)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
        variant="outline">
        {t('banner_button')}
        <Icon
          className="flex-none outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2]"
          icon="solar:arrow-right-linear"
          width={16}
        />
      </ButtonLink>
      <div className="flex flex-1 justify-end">
        <Button
          isIconOnly
          aria-label="Close Banner"
          className="-m-1"
          size="sm"
          variant="ghost"
          onPress={() => {
            const banner = document.querySelector('[data-banner]');
            if (banner) {
              banner.remove();
            }
          }}>
          <Icon
            aria-hidden="true"
            className="text-muted"
            icon="lucide:x"
            width={20}
          />
        </Button>
      </div>
    </div>
  );
}
