'use client';

import type { RadioGroupProps } from '@heroui/react';

import { cn, RadioGroup } from '@heroui/react';
import React from 'react';

import FeedbackRatingItem, {
  RatingValueEnum,
} from '@/components/feedback/feedback-rating-item';

export default function Component({ classNames, ...props }: RadioGroupProps) {
  const [value, setValue] = React.useState<RatingValueEnum | string>(
    RatingValueEnum.BAD
  );

  return (
    <RadioGroup
      color="default"
      value={value}
      {...props}
      classNames={{
        ...classNames,
        base: cn(classNames?.base, 'max-w-fit'),
        wrapper: cn(classNames?.wrapper, 'flex flex-row gap-3'),
      }}
      defaultValue="1"
      orientation="horizontal"
      size="lg"
      onValueChange={setValue}>
      <FeedbackRatingItem value={RatingValueEnum.BAD} />
      <FeedbackRatingItem value={RatingValueEnum.NEUTRAL} />
      <FeedbackRatingItem value={RatingValueEnum.GOOD} />
      <FeedbackRatingItem value={RatingValueEnum.GREAT} />
    </RadioGroup>
  );
}
