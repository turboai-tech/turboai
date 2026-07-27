'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 防止水合不匹配：仅在客户端挂载后渲染，避免服务端/客户端主题图标不一致。
  // Next 16 的 eslint-config-next 新增了 react-hooks/set-state-in-effect，
  // 对这个 SSR 水合模式属误伤（React 文档承认的合法例外）。行为保持不变。
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      onPress={toggleTheme}
      className={className}>
      <Icon
        className="text-default-500"
        icon={theme === 'dark' ? 'solar:sun-linear' : 'solar:moon-linear'}
        width={24}
      />
    </Button>
  );
};
