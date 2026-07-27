'use client';

import { Avatar, cn } from '@heroui/react';

type TeamAvatarProps = {
  name?: string;
  src?: string;
  className?: string;
};

export default function TeamAvatar({ name = 'T', src, className }: TeamAvatarProps) {
  return (
    <Avatar className={cn('h-6 w-6', className)}>
      {src ? <Avatar.Image alt={name} src={src} /> : null}
      <Avatar.Fallback>{name.slice(0, 1)}</Avatar.Fallback>
    </Avatar>
  );
}
