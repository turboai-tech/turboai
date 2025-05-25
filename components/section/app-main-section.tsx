'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef, useState } from 'react';
import { subtitle, title } from '../primitives';
import AppScreenshotSkewed from './app-screenshot-skewed';

export default function AppMainSections() {
  const t = useTranslations('AppMainSection');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dynamicMargin, setDynamicMargin] = useState(0);

  useLayoutEffect(() => {
    function updateMargin(node: HTMLDivElement | null) {
      if (node) {
        // 这里可以调整倍数
        const margin = -node.offsetHeight * 0.75;
        setDynamicMargin(margin);
      }
    }

    const currentSection = sectionRef.current;
    updateMargin(currentSection);

    // 监听窗口大小变化
    window.addEventListener('resize', () => updateMargin(currentSection));

    // 监听 section 内容变化
    let resizeObserver: ResizeObserver | null = null;
    if (currentSection) {
      resizeObserver = new window.ResizeObserver(() =>
        updateMargin(currentSection)
      );
      resizeObserver.observe(currentSection);
    }

    return () => {
      window.removeEventListener('resize', () => updateMargin(currentSection));
      if (resizeObserver && currentSection) {
        resizeObserver.unobserve(currentSection);
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full overflow-hidden bg-background container mx-auto mt-[180px] flex-col items-start px-0 lg:mb-0 md:-mb-30 -mb-60">
      <section
        ref={sectionRef}
        className="z-20 flex flex-col items-start justify-center gap-[18px] sm:gap-6">
        <Button
          className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
          endContent={
            <Icon
              className="flex-none outline-none [&>path]:stroke-[2]"
              icon="solar:arrow-right-linear"
              width={20}
            />
          }
          radius="full"
          variant="bordered">
          {t('button_si_solutions')}
        </Button>
        <LazyMotion features={domAnimation}>
          <m.div
            animate="kick"
            className="flex flex-col gap-6"
            exit="auto"
            initial="auto"
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
            variants={{
              auto: { width: 'auto' },
              kick: { width: 'auto' },
            }}>
            <AnimatePresence>
              <m.div
                key="hero-section-title"
                animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
                className="text-start  font-bold leading-[1.2] tracking-tighter sm:text-[2px]"
                initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 2 }}
                transition={{
                  bounce: 0,
                  delay: 0.01 * 10,
                  duration: 0.8 + 0.1 * 8,
                  type: 'spring',
                }}>
                <div className="bg-default-foreground text-small text-background">
                  <span className={title()}>{t('title_1')}&nbsp;</span>
                  <span className={title({ color: 'violet' })}>
                    {t('title_2')}&nbsp;
                  </span>
                  <span className={title()}>{t('title_3')}</span>
                </div>
                <div className="bg-default-foreground text-small text-background">
                  <span className={subtitle()}>{t('subtitle')}</span>
                </div>
              </m.div>

              <m.div
                key="hero-section-description"
                animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
                className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]"
                initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 3 }}
                transition={{
                  bounce: 0,
                  delay: 0.01 * 30,
                  duration: 0.8 + 0.1 * 9,
                  type: 'spring',
                }}>
                {t('description')}
              </m.div>

              <m.div
                key="hero-section-buttons"
                animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
                initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 4 }}
                transition={{
                  bounce: 0,
                  delay: 0.01 * 50,
                  duration: 0.8 + 0.1 * 10,
                  type: 'spring',
                }}>
                <Button
                  color="success"
                  className="bg-gradient-to-tr from-purple-500 via-violet-500 to-pink-400 text-white shadow-lg h-10 w-[163px] px-[16px] py-[10px] leading-5 font-medium text-small"
                  radius="full">
                  {t('button_get_demo')}
                </Button>
                <Button
                  className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
                  endContent={
                    <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                      <Icon
                        className="text-default-500 [&>path]:stroke-[1.5]"
                        icon="solar:arrow-right-linear"
                        width={16}
                      />
                    </span>
                  }
                  radius="full"
                  variant="bordered">
                  {t('button_see_plans')}
                </Button>
              </m.div>
            </AnimatePresence>
          </m.div>
        </LazyMotion>
      </section>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            key="hero-section-app-screenshot"
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            className="w-full"
            style={{
              marginTop: dynamicMargin,
            }}
            initial={{ filter: 'blur(16px)', opacity: 0, y: 300 }}
            transition={{
              bounce: 0,
              delay: 0.01 * 10,
              duration: 0.8 + 0.1 * 8,
              type: 'spring',
            }}>
            <AppScreenshotSkewed className="w-full" />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
