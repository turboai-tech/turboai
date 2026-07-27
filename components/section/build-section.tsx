'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import SectionHeading from './section-heading';

const capabilities = [
  { key: 'agents', icon: 'lucide:bot' },
  { key: 'interfaces', icon: 'lucide:message-square' },
  { key: 'pipelines', icon: 'lucide:database' },
  { key: 'models', icon: 'lucide:brain-circuit' },
  { key: 'products', icon: 'lucide:layout-grid' },
  { key: 'automation', icon: 'lucide:workflow' },
] as const;

type BuildSectionProps = {
  /** The solutions page already leads with its own heading. */
  showHeading?: boolean;
};

export default function BuildSection({
  showHeading = true,
}: BuildSectionProps) {
  const t = useTranslations('build');

  return (
    <section
      id="build-container"
      className={`mx-auto flex w-full flex-col gap-10 ${
        showHeading ? 'py-20' : 'pb-20'
      }`}>
      {showHeading ? (
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
      ) : null}

      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border-1 border-default/40 bg-default/50 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map(({ key, icon }, index) => (
          <li
            key={key}
            className="group flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-default-50">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border-1 border-default/40 text-muted transition-colors group-hover:border-primary group-hover:text-accent">
                <Icon icon={icon} width={18} />
              </span>
              <span className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-large font-semibold tracking-tight">
              {t(`item_${key}_title`)}
            </h3>
            <p className="text-sm leading-6 text-muted">
              {t(`item_${key}_description`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
