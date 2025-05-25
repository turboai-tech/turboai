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
        linkedin: '',
        github: '',
      },
    },
  ];

  return (
    <section className="flex flex-col items-center py-24">
      <div className="flex flex-col text-center">
        <h2 className="font-medium text-secondary text-purple-500">
          {t('subtitle')}
        </h2>
        <h1 className="text-2xl font-medium tracking-tight">{t('title')}</h1>
        <Spacer y={4} />
        <h2 className="text-large text-gray-500">{t('description')}</h2>
        <Spacer y={4} />
        <div className="flex w-full justify-center gap-6">
          <Button
            variant="ghost"
            radius="full"
            className="border-1 border-default-100">
            {t('button')}
          </Button>
          <Button
            color="secondary"
            radius="full"
            className="border-1 border-default-100 bg-gradient-to-tr from-purple-500 to-purple-400 text-white">
            {t('open_positions')}
          </Button>
        </div>
      </div>
      <div className="mt-20 flex w-3/5 flex-wrap gap-2 justify-center">
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
