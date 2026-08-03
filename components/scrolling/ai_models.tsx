import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const model_logos = [
  { key: 'openai', src: '/logos/openai.svg', name: 'OpenAI' },
  { key: 'gemini', src: '/logos/gemini.svg', name: 'Gemini' },
  { key: 'claude', src: '/logos/claude.svg', name: 'Claude' },
  { key: 'grok', src: '/logos/grok.svg', name: 'Grok' },
  { key: 'deepseek', src: '/logos/deepseek.svg', name: 'DeepSeek' },
  { key: 'qwen', src: '/logos/qwen.svg', name: 'Qwen' },
  { key: 'kimi', src: '/logos/kimi.svg', name: 'Kimi' },
] as const

export default async function AiModelsComponent() {
  const t = await getTranslations('technologies')

  return (
    <section className="mx-auto flex w-full flex-col gap-4 px-4">
      <span className="text-center text-sm tracking-wide text-muted uppercase">
        {t('llms_title')}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {model_logos.map(({ key, src, name }) => (
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
