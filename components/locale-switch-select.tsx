'use client';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { Button, Dropdown, Label } from '@heroui/react';
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

  // Keep the dropdown in sync when the active locale changes; the setSelected
  // call inside onChange handles the optimistic update while switching.
  // Next 16's react-hooks/set-state-in-effect flags this — removing it would
  // mean deriving state during render instead, losing the optimistic update.
  // That's a behavioural change out of scope for this upgrade.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <Dropdown.Trigger className="px-0">
        <Button variant="ghost">
          <Icon
            className="text-base"
            icon={iconMap[selected.value] || 'mdi:translate'}
          />
          {selected.label}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label={label}
          className="text-left"
          onAction={(key) => {
            const found = items.find((item) => item.value === key);
            if (found) onChange(found);
          }}>
          {items.map((item) => (
            <Dropdown.Item
              key={item.value}
              className="justify-start gap-2 px-2"
              id={item.value}
              textValue={item.label}>
              <Icon
                className="text-base"
                icon={iconMap[item.value] || 'mdi:translate'}
              />
              <Label>{item.label}</Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
