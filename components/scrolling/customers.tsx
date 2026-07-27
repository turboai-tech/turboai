'use client';

import { BuyerXLogo } from '@/components/icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const customers = [
  {
    key: 'buyerx',
    Logo: BuyerXLogo,
    name: 'BuyerX',
    url: 'https://buyerx.ai/',
    location: 'buyerx_location',
  },
];

export default function CustomersComponent() {
  const t = useTranslations('customers');
  return (
    <div id="customers-container" className="flex flex-col gap-4">
      <section className="mx-auto w-full px-4 flex flex-col gap-4">
        <span className="text-xl text-center items-center justify-center">
          {t('customers_title')}
        </span>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {customers.map(({ key, Logo, name, url, location }) => (
            <Link
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-4 rounded shadow min-w-fit whitespace-nowrap"
            >
              <div className="h-10 flex items-center justify-center flex-shrink-0">
                <Logo height={40} />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{name}</span>
                <span className="text-xs text-gray-500">
                  {t(`${location}`)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
