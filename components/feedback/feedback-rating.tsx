'use client';

import { cn, Label, Radio, RadioGroup } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

export enum RatingValueEnum {
  BAD = 'bad',
  NEUTRAL = 'neutral',
  GOOD = 'good',
  GREAT = 'great',
}

const ratings = [
  {
    value: RatingValueEnum.BAD,
    icon: 'fluent-mdl2:emoji-disappointed',
    color: 'text-danger',
  },
  {
    value: RatingValueEnum.NEUTRAL,
    icon: 'fluent-mdl2:emoji-neutral',
    color: 'text-foreground',
  },
  {
    value: RatingValueEnum.GOOD,
    icon: 'fluent-mdl2:emoji-2',
    color: 'text-accent',
  },
  {
    value: RatingValueEnum.GREAT,
    icon: 'fluent-mdl2:emoji',
    color: 'text-success',
  },
] as const;

type Props = {
  className?: string;
  name?: string;
};

export default function FeedbackRating({ className, name }: Props) {
  const [value, setValue] = React.useState(RatingValueEnum.BAD);

  return (
    <RadioGroup
      aria-label="Feedback rating"
      className={cn('max-w-fit', className)}
      name={name}
      orientation="horizontal"
      value={value}
      onChange={(next) => setValue(next as RatingValueEnum)}>
      {ratings.map((rating) => (
        <Radio key={rating.value} value={rating.value}>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label className="sr-only">{rating.value}</Label>
          <Icon
            className={cn(
              'pointer-events-none text-xl transition-colors',
              value === rating.value ? rating.color : 'text-muted',
            )}
            icon={rating.icon}
            width={20}
          />
        </Radio>
      ))}
    </RadioGroup>
  );
}
