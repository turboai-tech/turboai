import { useLocale } from 'next-intl';
import PrivacyEnPage from './privacy-en';
import PrivacyJaPage from './privacy-ja';
import PrivacyZhPage from './privacy-zh';

export default function PrivacyPage() {
  const locale = useLocale();
  return {
    en: <PrivacyEnPage />,
    ja: <PrivacyJaPage />,
    'zh-CN': <PrivacyZhPage />,
  }[locale];
}
