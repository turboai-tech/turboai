'use client';

import type { IconProps } from '@iconify/react';

import { Divider, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Logo } from '../icons';

type SocialIconProps = Omit<IconProps, 'icon'>;

export default function FooterComponent() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const footerNavigation = {
    services: [
      { name: t('branding'), href: '#' },
      { name: t('data_analysis'), href: '#' },
      { name: t('ecommerce_solutions'), href: '#' },
      { name: t('market_research'), href: '#' },
    ],
    supportOptions: [
      { name: t('pricing_plans'), href: '#pricing-container' },
      { name: t('user_guides'), href: '#' },
      { name: t('tutorials'), href: '#' },
      { name: t('service_status'), href: '#' },
    ],
    aboutUs: [
      { name: t('our_story'), href: '/about/story' },
      { name: t('latest_news'), href: '/about/news' },
      { name: t('career_opportunities'), href: '/about/career' },
      { name: t('collaborations'), href: '/#collaborations-container' },
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
      items: { name: string; href: string }[];
    }) => (
      <div>
        <h3 className="text-small font-semibold text-default-600">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link className="text-default-400" href={item.href} size="sm">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    [],
  );

  return (
    <footer className="flex w-4/5 mx-auto flex-col bg-background">
      <div className="pb-8 pt-16 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <Link href="/">
              <div className="flex justify-between gap-1">
                <Icon icon="lucide:layers" className="text-primary text-2xl" />
                <Logo width={96} height={32} className="md:block" />
              </div>
            </Link>
            <p className="text-small text-default-500">
              {t('value_description')}
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <Link
                  key={item.name}
                  isExternal
                  className="text-default-400"
                  href={item.href}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-6" />
                </Link>
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
        <Divider className="mt-16 sm:mt-20 lg:mt-24" />
        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-small text-default-400">
            Copyright &copy; {currentYear}, {t('all_rights_reserved')}.
          </p>
          <p className="text-small text-default-400">
            {t('powered_by')} {t('company_name')}
          </p>
        </div>
      </div>
    </footer>
  );
}
