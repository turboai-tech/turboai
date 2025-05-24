'use client';

import ScrollingBanner from '@/components/scrolling/scrolling-powers';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const logos = [
  {
    key: 'Nvidia',
    src: '/logos/nvidia.svg',
    name: 'Nvidia',
  },
  {
    key: 'Docker',
    src: '/logos/docker.svg',
    name: 'Docker',
  },
  {
    key: 'containerd',
    src: '/logos/containerd.svg',
    name: 'Containerd',
  },
  {
    key: 'Kubernetes',
    src: '/logos/kubernetes.svg',
    name: 'Kubernetes',
  },
  {
    key: 'ray',
    src: '/logos/ray.svg',
    name: 'Ray',
  },
  {
    key: 'pytorch',
    src: '/logos/pytorch.svg',
    name: 'PyTorch',
  },
  {
    key: 'tensorflow',
    src: '/logos/tensorflow.svg',
    name: 'TensorFlow',
  },
  {
    key: 'opencv',
    src: '/logos/opencv.svg',
    name: 'OpenCV',
  },
  {
    key: 'mcp',
    src: '/logos/mcp.svg',
    name: 'MCP',
  },
  {
    key: 'vertexai',
    src: '/logos/vertexai.svg',
    name: 'VertexAI',
  },
  {
    key: 'n8n',
    src: '/logos/n8n.svg',
    name: 'n8n',
  },
  {
    key: 'v0',
    src: '/logos/v0.svg',
    name: 'V0',
  },
  {
    key: 'llamaindex',
    src: '/logos/llamaindex.svg',
    name: 'LlamaIndex',
  },
  {
    key: 'langchain',
    src: '/logos/langchain.svg',
    name: 'LangChain',
  },
  {
    key: 'ollama',
    src: '/logos/ollama.svg',
    name: 'Ollama',
  },
  {
    key: 'vllm',
    src: '/logos/vllm.svg',
    name: 'VLLM',
  },
  {
    key: 'vercel',
    src: '/logos/vercel.svg',
    name: 'Vercel',
  },
  {
    key: 'supabase',
    src: '/logos/supabase.svg',
    name: 'Supabase',
  },
  {
    key: 'comfyui',
    src: '/logos/comfyui.svg',
    name: 'ComfyUI',
  },
  {
    key: 'grpc',
    src: '/logos/grpc.svg',
    name: 'gRPC',
  },
  {
    key: 'Nextjs',
    src: '/logos/nextjs-dark.svg',
    name: 'Next',
  },
  {
    key: 'python',
    src: '/logos/python.svg',
    name: 'Python',
  },
  {
    key: 'typescript',
    src: '/logos/typescript.svg',
    name: 'TypeScript',
  },
  {
    key: 'react',
    src: '/logos/react.svg',
    name: 'React',
  },
  {
    key: 'vercel',
    src: '/logos/vercel.svg',
    name: 'Vercel',
  },
  {
    key: 'tailwind',
    src: '/logos/tailwind.svg',
    name: 'Tailwind',
  },
  {
    key: 'manus',
    src: '/logos/manus.svg',
    name: 'Manus',
  },
];

export default function PowersComponent() {
  const t = useTranslations('technologies');
  return (
    <section className="mx-auto w-full px-4 py-8 flex flex-col gap-4">
      <span className="text-xl font-bold text-center items-center justify-center">
        {t('powers_title')}
      </span>
      <ScrollingBanner
        shouldPauseOnHover
        gap="40px"
        duration={10}>
        {logos.map(({ key, src, name }) => (
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
      </ScrollingBanner>
    </section>
  );
}
