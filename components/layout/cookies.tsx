'use client';

import { Button, Link } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Cookies() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    setIsVisible(!cookiesAccepted);
  }, []);

  const t = useTranslations('cookies');

  const handleAcceptAll = () => {
    setIsVisible(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleCookieSettings = () => {
    console.log('Cookie Settings clicked');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto mx-auto max-w-xl rounded-large border border-divider bg-background/15 px-6 py-4 shadow-small backdrop-blur">
        <p className="text-small font-normal text-default-700">
          {t('intro_text')}&nbsp;
          <b className="font-semibold">&quot;{t('accept_all')}&quot;</b>
          {t('consent_text')}&nbsp;
          <span className="font-semibold text-primary">
            &quot;{t('cookie_settings')}&quot;
          </span>
          {t('controlled_consent_text')}&nbsp;
          <Link
            href="#"
            size="sm"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            underline="hover">
            {t('cookie_policy')}
          </Link>
          {t('sentense_end_symbol')}
        </p>
        <div className="mt-4 flex items-center gap-x-1">
          <Button
            className="px-4 font-medium"
            radius="lg"
            onPress={handleAcceptAll}
            style={{
              border: 'solid 2px transparent',
              backgroundImage: `linear-gradient(hsl(var(--cookie-button-bg)), hsl(var(--cookie-button-bg))), linear-gradient(83.87deg, #F54180, #9353D3)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}>
            {t('accept_all')}
          </Button>
          <Button
            className="font-medium"
            radius="lg"
            onPress={handleCookieSettings}
            variant="light">
            {t('cookie_settings')}
          </Button>
        </div>
      </div>
    </div>
  );
}
