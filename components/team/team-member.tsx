'use client';

import { Button, Spacer } from '@heroui/react';
import { useTranslations } from 'next-intl';
import ScrollingBanner from '../scrolling/scrolling-powers';
import type { TeamMember } from './team-member-card';
import TeamMemberCard from './team-member-card';

export default function TeamMemberComponent() {
  const t = useTranslations('team');

  const teamMembers: TeamMember[] = [
    {
      name: t('team_member_shaoxiao.name'),
      role: t('team_member_shaoxiao.role'),
      bio: t('team_member_shaoxiao.bio'),
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
  ];

  const positions = [
    {
      key: 'fullstack',
      position: 'FullStack Engineer',
    },
    {
      key: 'frontend',
      position: 'Frontend Engineer',
    },
    {
      key: 'backend',
      position: 'Backend Engineer',
    },
    {
      key: 'pm',
      position: 'Product Manager',
    },
    {
      key: 'designer',
      position: 'UI/UX Designer',
    },
    {
      key: 'business',
      position: 'Business Development',
    },
    {
      key: 'sales',
      position: 'Sales Manager',
    },
    {
      key: 'marketing',
      position: 'Marketing Manager',
    },
  ];

  return (
    <section
      id="team-container"
      className="flex max-w-4xl flex-col items-center py-12 mx-auto"
    >
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium text-secondary">{t('subtitle')}</h2>
        <h1 className="text-3xl font-medium tracking-tight">{t('title')}</h1>
        <Spacer y={4} />
        <h2 className="text-large text-default-500">{t('description')}</h2>
        <Spacer y={4} />
        <div className="flex w-full justify-center gap-2">
          <Button variant="ghost">{t('button')}</Button>
          <Button color="secondary">{t('open_positions')}</Button>
        </div>
      </div>
      <div className="mt-12 flex w-full gap-8 flex-wrap justify-center items-center mx-auto">
        {teamMembers.map((member, index) => (
          <TeamMemberCard aria-label={member.name} key={index} {...member} />
        ))}
      </div>
      <div className="mt-8 items-center justify-center flex flex-col gap-2">
        <span className="text-lg text-secondary font-medium">
          {t('view_opening_positions')}
        </span>
        <Spacer y={2} />
        <ScrollingBanner
          isVertical
          shouldPauseOnHover
          duration={20}
          gap="20px"
          className="w-full justify-center"
        >
          {positions.map(({ key, position }) => (
            <div
              key={key}
              className="flex items-center justify-center text-foreground text-base"
            >
              {position}
            </div>
          ))}
        </ScrollingBanner>
      </div>
    </section>
  );
}
