'use client';

import { useLocale } from 'next-intl';
import StoryEnPage from './story-en';
import StoryJaPage from './story-ja';
import StoryZhPage from './story-zh';

export default function StoryPage() {
  const locale = useLocale();
  return {
    en: <StoryEnPage />,
    ja: <StoryJaPage />,
    'zh-CN': <StoryZhPage />,
  }[locale];
}
