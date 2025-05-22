'use client';

import ScrollingBanner from '@/components/scrolling_powers/scrolling-powers';
import Image from 'next/image';
const logos = [
  {
    key: 'Docker',
    src: '/logos/docker.svg',
    name: 'Docker',
  },
  {
    key: 'Kubernetes',
    src: '/logos/kubernetes.svg',
    name: 'Kubernetes',
  },
  {
    key: 'openai',
    src: '/logos/openai.svg',
    name: 'OpenAI',
  },
  {
    key: 'grpc',
    src: '/logos/grpc.svg',
    name: 'gRPC',
  },
  {
    key: 'NextJS',
    src: '/logos/next.svg',
    name: 'NextJS',
  },
  {
    key: 'python',
    src: '/logos/python.svg',
    name: 'Python',
  },
  {
    key: 'typescript',
    src: '/logos/typescript-icon.svg',
    name: 'TypeScript',
  },
  {
    key: 'ray',
    src: '/logos/ray-icon.png',
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
];

export default function PowersComponent() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 flex flex-col gap-4">
      <span className="text-xl font-bold text-center items-center justify-center">
        AI Powered by following companies
      </span>
      <ScrollingBanner
        shouldPauseOnHover
        gap="40px"
        duration={10}>
        {logos.map(({ key, src, name }) => (
          <div
            key={key}
            className="flex items-center gap-2 px-4 py-2 rounded shadow m-4">
            <Image
              src={src}
              alt={name}
              width={41}
              height={41}
            />
            <span className="font-medium">{name}</span>
          </div>
        ))}
      </ScrollingBanner>
    </section>
  );
}
