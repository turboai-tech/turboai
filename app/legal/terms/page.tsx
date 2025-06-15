'use client';

import { useLocale } from 'next-intl';
import TermEnPage from './term-en';
import TermJaPage from './term-ja';
import TermZhPage from './term-zh';

export default function TermPage() {
  const locale = useLocale();
  return {
    en: <TermEnPage />,
    ja: <TermJaPage />,
    'zh-CN': <TermZhPage />,
  }[locale];
}
