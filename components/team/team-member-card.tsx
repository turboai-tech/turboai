'use client';

import { Avatar, cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/navigation';
import React from 'react';

export type TeamMember = {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
  social: {
    twitter: string;
    linkedin: string;
    github?: string;
  };
};

export type TeamMemberCardProps = React.HTMLAttributes<HTMLDivElement> &
  TeamMember;

const TeamMemberCard = React.forwardRef<HTMLDivElement, TeamMemberCardProps>(
  ({ children, avatar, name, role, bio, social, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center rounded-lg bg-surface px-4 py-6 text-center shadow-sm',
        className,
      )}
      {...props}>
      <Avatar className="h-20 w-20">
        {avatar ? <Avatar.Image alt={name} src={avatar} /> : null}
        <Avatar.Fallback>{name.slice(0, 1)}</Avatar.Fallback>
      </Avatar>
      <h3 className="mt-2 font-medium">{name || children}</h3>
      <span className="text-sm text-muted">{role}</span>
      {bio ? <p className="mb-4 mt-2 text-muted">{bio}</p> : <div className="mb-4" />}
      <div className="flex gap-4">
        {social?.twitter ? (
          <Link
            aria-label="Twitter"
            className="text-muted"
            href={`https://x.com/${social.twitter}`}
            rel="noreferrer"
            target="_blank">
            <Icon icon="bi:twitter" width={20} />
          </Link>
        ) : null}
        {social?.linkedin ? (
          <Link
            aria-label="LinkedIn"
            className="text-muted"
            href={`https://www.linkedin.com/in/${social.linkedin}`}
            rel="noreferrer"
            target="_blank">
            <Icon icon="bi:linkedin" width={20} />
          </Link>
        ) : null}
        {social?.github ? (
          <Link
            aria-label="GitHub"
            className="text-muted"
            href={`https://github.com/${social.github}`}
            rel="noreferrer"
            target="_blank">
            <Icon icon="bi:github" width={20} />
          </Link>
        ) : null}
      </div>
    </div>
  ),
);

TeamMemberCard.displayName = 'TeamMemberCard';

export default TeamMemberCard;
