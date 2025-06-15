'use client';

const timelineData = [
  {
    date: '2024年',
    title: '创想萌芽',
    description:
      '一群充满激情的设计师和开发者发现，现有的AI设计工具无法完全满足专业设计师对效率和创造力的双重需求。一个打造更智能、更直观的设计协作平台的想法应运而生。',
    align: 'left',
  },
  {
    date: '2025年',
    title: 'Turbo AI 创立',
    description:
      'Turbo AI (iturboai.com) 正式创立，为设计师带来了强大的AI工具，旨在彻底改变他们的工作流程。',
    align: 'right',
  },
  {
    date: '未来',
    title: '新的篇章',
    description:
      '我们的旅程才刚刚开始。我们致力于不断创新，倾听用户反馈，并计划在未来推出更多激动人心的功能，赋能全球每一个行业。',
    align: 'left',
  },
];

export default function StoryZhPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto w-full px-4 md:w-4/5 lg:w-3/4">
        <h1 className="text-3xl font-bold text-center mb-4 md:text-4xl">
          我们的故事
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16">
          一段关于创新、激情与坚持的旅程。
        </p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 md:block"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              className="relative mb-8 flex w-full flex-col items-center md:mb-12 md:flex-row px-4"
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-primary ring-3 ring-white dark:ring-gray-900 md:block"></div>

              {/* Timeline Content Card */}
              <div
                className={`w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:w-1/2 ${
                  item.align === 'left' ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                <p className="mb-1 text-sm font-semibold text-primary">
                  {item.date}
                </p>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
