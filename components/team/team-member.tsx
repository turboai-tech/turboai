'use client';

import ButtonLink from '@/components/button-link';
import { useTranslations } from 'next-intl';
import ScrollingBanner from '../scrolling/scrolling-powers';
import type { TeamMember } from './team-member-card';
import TeamMemberCard from './team-member-card';

export default function TeamMemberComponent() {
  const t = useTranslations('team');

  const teamMembers: TeamMember[] = [
    {
      name: t('team_member_david.name'),
      role: t('team_member_david.role'),
      bio: t('team_member_david.bio'),
      avatar: '/avatars/member_shaoxiao.jpg',
      social: {
        twitter: 'shaoxiao_hello',
        linkedin: 'shaoxiaoxu',
        github: 'xushaoxiao',
      },
    },
    {
      name: t('team_member_ting.name'),
      role: t('team_member_ting.role'),
      bio: t('team_member_ting.bio'),
      avatar: '/avatars/member_ting.jpg',
      social: {
        twitter: '',
        linkedin: 'ting',
        github: '',
      },
    },
    {
      name: t('team_member_neil.name'),
      role: t('team_member_neil.role'),
      bio: t('team_member_neil.bio'),
      avatar: '/avatars/member_neil.jpg',
      social: {
        twitter: '',
        linkedin: '',
        github: '',
      },
    },
  ]

  const tCareer = useTranslations('career')
  const positions = [
    { key: 'fde', position: tCareer('roles.fde.title') },
    { key: 'ai_engineer', position: tCareer('roles.ai_engineer.title') },
    { key: 'ai_infra', position: tCareer('roles.ai_infra.title') },
  ]

  return (
    <section
      id="team-container"
      className="mx-auto flex max-w-4xl flex-col items-center py-12">
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium text-accent">{t('subtitle')}</h2>
        <h1 className="text-3xl font-medium tracking-tight">{t('title')}</h1>
        <div className="h-4" />
        <h2 className="text-lg text-muted">{t('description')}</h2>
        <div className="h-4" />
        <div className="flex w-full justify-center gap-2">
          <ButtonLink href="/about/story" variant="ghost">
            {t('button')}
          </ButtonLink>
          <ButtonLink href="/about/career" variant="secondary">
            {t('open_positions')}
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
        {teamMembers.map((member) => (
          <TeamMemberCard
            aria-label={member.name}
            className="w-full"
            key={member.name}
            {...member}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <span className="text-lg font-medium text-accent">
          {t('view_opening_positions')}
        </span>
        <div className="h-2" />
        <ScrollingBanner
          isVertical
          shouldPauseOnHover
          className="w-full justify-center"
          duration={20}
          gap="20px">
          {positions.map(({ key, position }) => (
            <div
              key={key}
              className="flex items-center justify-center text-base text-foreground">
              {position}
            </div>
          ))}
        </ScrollingBanner>
      </div>
    </section>
  );
}
