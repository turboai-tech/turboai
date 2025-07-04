'use client';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';
import React, { useEffect, useTransition } from 'react';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [, startTransition] = useTransition();
  const locale = useLocale();
  const [selected, setSelected] = React.useState(
    items.find((item) => item.value === defaultValue) || items[0],
  );

  useEffect(() => {
    setSelected(items.find((item) => item.value === locale) || items[0]);
  }, [locale, items]);

  const iconMap: Record<string, string> = {
    en: 'twemoji:flag-united-states',
    'zh-CN': 'twemoji:flag-china',
    ja: 'twemoji:flag-japan',
  };

  function onChange(item: { value: string; label: string }) {
    setSelected(item);
    const locale = item.value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <Dropdown>
      <DropdownTrigger className="px-2">
        <Button
          variant="light"
          startContent={
            <Icon
              icon={iconMap[selected.value] || 'mdi:translate'}
              className="text-base"
            />
          }
        >
          {selected.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={label}
        onAction={(key) => {
          const found = items.find((item) => item.value === key);
          if (found) onChange(found);
        }}
        className="text-left"
      >
        {items.map((item) => (
          <DropdownItem
            className="justify-start px-2"
            key={item.value}
            startContent={
              <Icon
                icon={iconMap[item.value] || 'mdi:translate'}
                className="text-base"
              />
            }
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
