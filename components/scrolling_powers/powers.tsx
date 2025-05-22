'use client';

import {
  Logo1,
  Logo10,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
} from '@/components/scrolling_powers/logos';

import ScrollingBanner from '@/components/scrolling_powers/scrolling-powers';

const logos = [
  {
    key: 'logo-1',
    logo: Logo1,
  },
  {
    key: 'logo-2',
    logo: Logo2,
  },
  {
    key: 'logo-3',
    logo: Logo3,
  },
  {
    key: 'logo-4',
    logo: Logo4,
  },
  {
    key: 'logo-5',
    logo: Logo5,
  },
  {
    key: 'logo-6',
    logo: Logo6,
  },
  {
    key: 'logo-7',
    logo: Logo7,
  },
  {
    key: 'logo-8',
    logo: Logo8,
  },
  {
    key: 'logo-9',
    logo: Logo9,
  },
  {
    key: 'logo-10',
    logo: Logo10,
  },
];

export default function PowersComponent() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 flex flex-col gap-4">
      <span className="text-xl font-bold text-center items-center justify-center">
        AI Powered by following companies
      </span>
      <ScrollingBanner
        shouldPauseOnHover
        gap="40px">
        {logos.map(({ key, logo }) => (
          <div
            key={key}
            className="flex items-center justify-center text-foreground">
            {logo}
          </div>
        ))}
      </ScrollingBanner>
    </section>
  );
}
