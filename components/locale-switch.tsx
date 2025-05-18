import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './locale-switch-select';

export default function LocaleSwitcher(props: { className?: string }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en'),
        },
        {
          value: 'zh-CN',
          label: t('zh-CN'),
        },
        {
          value: 'ja',
          label: t('ja'),
        },
      ]}
      label={t('label')}
      className={props.className}
    />
  );
}
