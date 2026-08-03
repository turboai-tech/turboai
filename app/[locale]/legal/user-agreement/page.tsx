'use client';

import { useLocale } from 'next-intl';
import UserAgreementEnPage from './user-agreement-en';
import UserAgreementJaPage from './user-agreement-ja';
import UserAgreementZhPage from './user-agreement-zh';

export default function UserAgreementPage() {
  const locale = useLocale();
  return {
    en: <UserAgreementEnPage />,
    ja: <UserAgreementJaPage />,
    'zh-CN': <UserAgreementZhPage />,
  }[locale];
}
