'use client';

import type { IconProps } from '@iconify/react';

import ButtonLink from '@/components/button-link';
import { Separator } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { Logo } from '../icons';

type SocialIconProps = Omit<IconProps, 'icon'>;

export default function FooterComponent() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const ignitionHref = locale.startsWith('zh')
    ? 'https://ignition.iturboai.com/zh'
    : 'https://ignition.iturboai.com/en';

  const footerNavigation = {
    services: [
      { name: t('agents'), href: '/solutions#build-container' },
      { name: t('conversational'), href: '/solutions#build-container' },
      { name: t('pipelines'), href: '/solutions#build-container' },
      { name: t('whole_products'), href: '/solutions#build-container' },
    ],
    supportOptions: [
      { name: t('how_we_build'), href: '/#process-container' },
      { name: t('pricing_plans'), href: '/#pricing-container' },
      { name: t('products'), href: '/products' },
      { name: t('ignition'), href: ignitionHref, external: true },
      { name: t('collaborations'), href: '/#collaborations-container' },
    ],
    aboutUs: [
      { name: t('our_story'), href: '/about/story' },
      { name: t('team'), href: '/#team-container' },
      { name: t('latest_news'), href: '/about/news' },
      { name: t('career_opportunities'), href: '/about/career' },
      { name: t('contact'), href: '/contact' },
    ],
    legal: [
      { name: t('claim'), href: '/legal/claim' },
      { name: t('privacy'), href: '/legal/privacy' },
      { name: t('terms'), href: '/legal/terms' },
      { name: t('user_agreement'), href: '/legal/user-agreement' },
    ],
    social: [
      {
        name: 'Youtube',
        href: 'https://www.youtube.com/@hello_turboai',
        icon: (props: SocialIconProps) => (
          <Icon {...props} icon="fontisto:youtube-play" />
        ),
      },
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/hello_turboai',
        icon: (props: SocialIconProps) => (
          <Icon {...props} icon="fontisto:instagram" />
        ),
      },
      {
        name: 'X',
        href: 'https://x.com/hello_turboai',
        icon: (props: SocialIconProps) => (
          <Icon {...props} icon="fontisto:twitter" />
        ),
      },
      {
        name: 'GitHub',
        href: 'https://github.com/turboai-tech',
        icon: (props: SocialIconProps) => (
          <Icon {...props} icon="fontisto:github" />
        ),
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/turboai-tech/?viewAsMember=true',
        icon: (props: SocialIconProps) => (
          <Icon {...props} icon="fontisto:linkedin" />
        ),
      },
    ],
  };

  const renderList = React.useCallback(
    ({
      title,
      items,
    }: {
      title: string;
      items: { name: string; href: string; external?: boolean }[];
    }) => (
      <div>
        <h3 className="text-sm font-semibold text-muted">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              {item.external ? (
                <a
                  className="text-sm text-muted"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank">
                  {item.name}
                </a>
              ) : (
                <Link className="text-sm text-muted" href={item.href}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    ),
    [],
  );

  return (
    <footer className="flex w-4/5 mx-auto flex-col bg-background">
      <div className="bg-grid relative mt-20 flex flex-col items-start gap-5 overflow-hidden rounded-lg border border-default/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40"
        />
        <div className="relative flex flex-col gap-2">
          <h2 className="text-[clamp(24px,5vw,28px)] font-bold tracking-tighter sm:text-[32px]">
            {t('cta_title')}
          </h2>
          <p className="max-w-[540px] text-sm leading-6 text-muted">
            {t('cta_description')}
          </p>
        </div>
        <ButtonLink
          className="relative h-11 shrink-0 rounded-full cta-gradient px-6 text-sm font-medium shadow-lg"
          href="/contact">
          {t('cta_button')}
          <Icon icon="solar:arrow-right-linear" width={16} />
        </ButtonLink>
      </div>

      <div className="pb-8 pt-16 sm:pt-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-start gap-6 md:pr-8">
            <Link className="inline-flex items-center gap-2" href="/">
              <Icon className="text-2xl text-accent" icon="lucide:layers" />
              <Logo height={32} width={96} />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted">
              {t('value_description')}
            </p>
            <div className="flex items-center gap-5">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  className="text-muted"
                  href={item.href}
                  rel="noreferrer"
                  target="_blank">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: t('services'),
                  items: footerNavigation.services,
                })}
              </div>
              <div className="mt-10 md:mt-0">
                {renderList({
                  title: t('support'),
                  items: footerNavigation.supportOptions,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: t('about'),
                  items: footerNavigation.aboutUs,
                })}
              </div>
              <div className="mt-10 md:mt-0">
                {renderList({
                  title: t('legal'),
                  items: footerNavigation.legal,
                })}
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-16 sm:mt-20 lg:mt-24" />
        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-sm text-muted">
            Copyright &copy; {currentYear}, {t('all_rights_reserved')}.
          </p>
          <p className="text-sm text-muted">
            {t('powered_by')} {t('company_name')}
          </p>
        </div>
      </div>
    </footer>
  );
}
