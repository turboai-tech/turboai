'use client';

import { Label, Switch } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

export interface ThemeSwitchProps {
  className?: string;
  /** Also used as the accessible name when the label is not shown. */
  label?: string;
  showLabel?: boolean;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  label = 'Toggle theme',
  showLabel = false,
}) => {
  const [mounted, setMounted] = useState(false);
  // resolvedTheme, not theme: while following the system preference `theme` is
  // "system", which would leave the switch off on a dark screen.
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch: only render once mounted on the client, so the
  // server/client theme icon never disagrees. Next 16's eslint-config-next
  // added react-hooks/set-state-in-effect, which mis-flags this SSR hydration
  // pattern (a legitimate exception acknowledged by the React docs). Behaviour
  // is unchanged.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Switch
      aria-label={showLabel ? undefined : label}
      className={className}
      isSelected={isDark}
      // Compact in the bar; roomier in the menu where it sits beside a label.
      size={showLabel ? 'md' : 'sm'}
      onChange={(isSelected) => setTheme(isSelected ? 'dark' : 'light')}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon>
              <Icon
                className="text-[10px]"
                icon={isDark ? 'solar:moon-bold' : 'solar:sun-bold'}
              />
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
        {showLabel ? <Label className="text-base text-muted">{label}</Label> : null}
      </Switch.Content>
    </Switch>
  );
};
