'use client';

import { useLocale } from 'next-intl';
import ClaimEnPage from './claim-en';
import ClaimJaPage from './claim-ja';
import ClaimZhPage from './claim-zh';

export default function ClaimPage() {
  const locale = useLocale();
  return {
    en: <ClaimEnPage />,
    ja: <ClaimJaPage />,
    'zh-CN': <ClaimZhPage />,
  }[locale];
}
