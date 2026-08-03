import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const cloud_computing_logos = [
  { key: 'gcp', src: '/logos/gcp.svg', name: 'GCP' },
  { key: 'aws', src: '/logos/aws.svg', name: 'AWS' },
  { key: 'azure', src: '/logos/azure.svg', name: 'Azure' },
  { key: 'aliyun', src: '/logos/aliyun.svg', name: 'AliYun' },
  { key: 'tencentcloud', src: '/logos/tencentcloud.svg', name: 'TencentCloud' },
  { key: 'volcengine', src: '/logos/volcengine.svg', name: 'VolcEngine' },
] as const

export default async function AiCloudsComponent() {
  const t = await getTranslations('technologies')

  return (
    <section className="mx-auto flex w-full flex-col gap-4 px-4">
      <span className="text-center text-sm tracking-wide text-muted uppercase">
        {t('cloud_computing_title')}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {cloud_computing_logos.map(({ key, src, name }) => (
          <div
            key={key}
            className="flex min-w-fit items-center gap-2 whitespace-nowrap rounded-lg border border-default/40 bg-background px-4 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Image src={src} alt={`${name} logo`} width={41} height={41} />
            </div>
            <span className="text-sm font-medium">{t(name)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
