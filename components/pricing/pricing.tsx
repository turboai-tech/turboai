'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  cn,
  Divider,
  Link,
  Spacer,
  Tab,
  Tabs,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { frequencies, tiers } from './pricing-tiers';
import { FrequencyEnum } from './pricing-types';

import '@/app/globals.css';

export default function PricingComponent() {
  const t = useTranslations('pricing');

  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );

  const onFrequencyChange = (selectedKey: React.Key) => {
    const frequencyIndex = frequencies.findIndex((f) => f.key === selectedKey);

    setSelectedFrequency(frequencies[frequencyIndex]);
  };

  return (
    <div
      id="pricing-container"
      className="relative flex min-h-dvh flex-col bg-background bg-radial">
      <div className="flex items-center justify-center p-4">
        <div className="relative flex max-w-4xl flex-col items-center py-24">
          <div
            aria-hidden="true"
            className="px:5 absolute inset-x-0 top-3 z-0 h-auto w-full transform-gpu overflow-hidden blur-3xl md:right-20 md:h-auto md:w-auto md:px-36">
            <div
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#FF71D7] to-[#C9A9E9] opacity-30"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="flex max-w-xl flex-col text-center">
            <h2 className="font-medium leading-7 text-secondary">
              {t('title')}
            </h2>
            <h1 className="text-xl font-medium tracking-tight">
              {t('subtitle')}
            </h1>
            <Spacer y={4} />
            <h2 className="text-base text-default-500">{t('description')}</h2>
          </div>
          <Spacer y={8} />
          <Tabs
            classNames={{
              tabList: 'bg-default-100/70',
              cursor: 'bg-background dark:bg-default-200/30',
              tab: 'data-[hover-unselected=true]:opacity-90',
            }}
            radius="full"
            onSelectionChange={onFrequencyChange}>
            <Tab
              key={FrequencyEnum.Yearly}
              aria-label="Pay Yearly"
              className="pr-0.5"
              title={
                <div className="flex items-center gap-2">
                  <p>{t('tab_1_title')}</p>
                  <Chip
                    color="secondary"
                    variant="flat">
                    {t('tab_1_description')}
                  </Chip>
                </div>
              }
            />
            <Tab
              key={FrequencyEnum.Quarterly}
              title={t('tab_2_title')}
            />
          </Tabs>
          <Spacer y={12} />
          <div className="flex gap-4 justify-center">
            {tiers.map((tier) => (
              <Card
                key={t(tier.title)}
                isBlurred
                className={cn('bg-background/60 p-3 dark:bg-default-100/50', {
                  '!border-small border-secondary/50': tier.mostPopular,
                })}
                shadow="md">
                {tier.mostPopular ? (
                  <Chip
                    className="absolute right-4 top-4"
                    color="secondary"
                    variant="flat">
                    Most Popular
                  </Chip>
                ) : null}
                <CardHeader className="flex flex-col items-start gap-2 pb-6">
                  <h2 className="text-large font-medium">{t(tier.title)}</h2>
                  <p className="text-medium text-default-500">
                    {tier.description ? t(tier.description) : null}
                  </p>
                </CardHeader>
                <Divider />
                <CardBody className="gap-8">
                  <p className="flex items-baseline gap-1 pt-2">
                    <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-3xl font-semibold leading-7 tracking-tight text-transparent">
                      {typeof tier.price === 'string'
                        ? t(tier.price)
                        : tier.price[selectedFrequency.key]}
                    </span>
                    {typeof tier.price !== 'string' ? (
                      <span className="text-small font-medium text-default-400">
                        {tier.priceSuffix
                          ? `/${tier.priceSuffix}/${selectedFrequency.priceSuffix}`
                          : `/${selectedFrequency.priceSuffix}`}
                      </span>
                    ) : null}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {typeof tier.features === 'string'
                      ? t(tier.features)
                          .split(',')
                          .map((feature: string) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2">
                              <Icon
                                className="text-secondary"
                                icon="ci:check"
                                width={24}
                              />
                              <p className="text-default-500">{feature}</p>
                            </li>
                          ))
                      : tier.features?.map((feature: string) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2">
                            <Icon
                              className="text-secondary"
                              icon="ci:check"
                              width={24}
                            />
                            <p className="text-default-500">{feature}</p>
                          </li>
                        ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    as={Link}
                    color="secondary"
                    href={tier.href}
                    variant={tier.buttonVariant}>
                    {t(tier.buttonText)}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Spacer y={12} />
          <div className="flex py-2">
            <p className="text-default-400">
              {t('question')} &nbsp;
              <Link
                color="foreground"
                href="#"
                underline="always">
                {t('question_access')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
