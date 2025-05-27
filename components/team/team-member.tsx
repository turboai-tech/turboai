'use client';

import { Button, Spacer } from '@heroui/react';
import { useTranslations } from 'next-intl';
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

  return (
    <section className="flex max-w-4xl flex-col items-center py-24 mx-auto">
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
          <TeamMemberCard
            key={index}
            {...member}
          />
        ))}
      </div>
    </section>
  );
}
