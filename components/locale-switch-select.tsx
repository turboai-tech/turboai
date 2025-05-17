'use client';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
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
    items.find((item) => item.value === defaultValue) || items[0]
  );

  useEffect(() => {
    setSelected(items.find((item) => item.value === locale) || items[0]);
  }, [locale, items]);

  // 语言图标映射
  const iconMap: Record<string, string> = {
    en: 'twemoji:flag-united-states',
    'zh-CN': 'twemoji:flag-china',
    ja: 'twemoji:flag-japan',
    // 可根据需要继续添加
  };

  function onChange(item: { value: string; label: string }) {
    setSelected(item);
    const locale = item.value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              startContent={
                <Icon
                  icon={iconMap[selected.value] || 'mdi:translate'}
                  className="text-base"
                />
              }>
              {selected.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={label}
            onAction={(key) => {
              const found = items.find((item) => item.value === key);
              if (found) onChange(found);
            }}
            className="text-left">
            {items.map((item) => (
              <DropdownItem
                className="justify-start"
                key={item.value}
                startContent={
                  <Icon
                    icon={iconMap[item.value] || 'mdi:translate'}
                    className="text-base"
                  />
                }>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </div>
  );
}
