'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const model_logos = [
  {
    key: 'openai',
    src: '/logos/openai.svg',
    name: 'OpenAI',
  },
  {
    key: 'gemini',
    src: '/logos/gemini.svg',
    name: 'Gemini',
  },
  {
    key: 'claude',
    src: '/logos/claude.svg',
    name: 'Claude',
  },
  {
    key: 'grok',
    src: '/logos/grok.svg',
    name: 'Grok',
  },
  {
    key: 'deepseek',
    src: '/logos/deepseek.svg',
    name: 'DeepSeek',
  },
  {
    key: 'qwen',
    src: '/logos/qwen.svg',
    name: 'Qwen',
  },
  {
    key: 'llama',
    src: '/logos/llama.svg',
    name: 'Llama',
  },
];

const cloud_computing_logos = [
  {
    key: 'gcp',
    src: '/logos/gcp.svg',
    name: 'GCP',
  },
  {
    key: 'aws',
    src: '/logos/aws.svg',
    name: 'AWS',
  },
  {
    key: 'azure',
    src: '/logos/azure.svg',
    name: 'Azure',
  },
  {
    key: 'aliyun',
    src: '/logos/aliyun.svg',
    name: 'AliYun',
  },
  {
    key: 'tencentcloud',
    src: '/logos/tencentcloud.svg',
    name: 'TencentCloud',
  },
  {
    key: 'volcengine',
    src: '/logos/volcengine.svg',
    name: 'VolcEngine',
  },
];

export default function PartnersComponent() {
  const t = useTranslations('technologies');
  return (
    <div className="w-full flex flex-col gap-4">
      <section className="mx-auto w-full px-4 py-8 flex flex-col gap-4">
        <span className="text-xl font-bold text-center items-center justify-center">
          {t('cloud_computing_title')}
        </span>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {cloud_computing_logos.map(({ key, src, name }) => (
            <div
              key={key}
              className="flex items-center gap-2 py-2 px-4 rounded shadow min-w-fit whitespace-nowrap">
              <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
                <Image
                  src={src}
                  alt={`${key}_logo`}
                  width={41}
                  height={41}
                />
              </div>
              <span className="font-medium text-sm">{t(name)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full px-4 py-8 flex flex-col gap-4">
        <span className="text-xl font-bold text-center items-center justify-center">
          {t('llms_title')}
        </span>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {model_logos.map(({ key, src, name }) => (
            <div
              key={key}
              className="flex items-center gap-2 py-2 px-4 rounded shadow min-w-fit whitespace-nowrap">
              <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
                <Image
                  src={src}
                  alt={`${key}_logo`}
                  width={41}
                  height={41}
                />
              </div>
              <span className="font-medium text-sm">{t(name)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
