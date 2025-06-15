'use client';

import { useLocale } from 'next-intl';
import CareerEnPage from './career-en';
import CareerJaPage from './career-ja';
import CareerZhPage from './career-zh';

export default function CareerPage() {
  const locale = useLocale();
  return {
    en: <CareerEnPage />,
    ja: <CareerJaPage />,
    'zh-CN': <CareerZhPage />,
  }[locale];
}
