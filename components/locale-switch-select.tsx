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

  // 当前语言变化时同步下拉显示；onChange 里的 setSelected 负责切换时的乐观更新。
  // Next 16 新增的 react-hooks/set-state-in-effect 会标记此处 —— 消除它需要
  // 改为渲染期派生，会牺牲乐观更新的即时反馈，属行为变更，不在本次升级范围内。
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
