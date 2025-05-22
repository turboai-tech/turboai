'use client';

import type { TeamMember } from './team-member-card';

import { Button, Spacer } from '@heroui/react';

import TeamMemberCard from './team-member-card';

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c',
    role: 'CEO',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    social: {
      twitter: '@john-doe',
      linkedin: 'john-doe',
      github: '@john-doe',
    },
  },
  {
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?u=a04258ab4e29066708c',
    role: 'CTO',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    social: {
      twitter: '@jane-doe',
      linkedin: 'jane-doe',
      github: '@jane-doe',
    },
  },
  {
    name: 'Robert Doe',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29066708c',
    role: 'Principal Designer',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    social: {
      twitter: '@robert-doe',
      linkedin: 'robert-doe',
      github: '@robert-doe',
    },
  },
];

export default function TeamMemberComponent() {
  return (
    <section className="flex max-w-full flex-col items-center py-24">
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium text-secondary text-purple-500">
          We&apos;re hiring!
        </h2>
        <h1 className="text-4xl font-medium tracking-tight">Meet our team.</h1>
        <Spacer y={4} />
        <h2 className="text-large text-gray-500">
          Our philosophy is to build a great team and then empower them to do
          great things.
        </h2>
        <Spacer y={4} />
        <div className="flex w-full justify-center gap-6">
          <Button
            variant="ghost"
            radius="full"
            className="border-1 border-default-100">
            About us
          </Button>
          <Button
            color="secondary"
            radius="full"
            className="border-1 border-default-100 bg-gradient-to-tr from-purple-500 via-pink-400 to-pink-200 text-white">
            Open positions
          </Button>
        </div>
      </div>
      <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
