'use client';

const timelineData = [
  {
    date: '2024年',
    title: 'アイデアの誕生',
    description:
      '情熱的なデザイナーと開発者のグループが、既存のAIデザインツールがプロのデザイナーの効率と創造性という二重のニーズを完全には満たしていないことを発見しました。よりインテリジェントで直感的なデザインコラボレーションプラットフォームを作成するというアイデアが生まれました。',
    align: 'left',
  },
  {
    date: '2025年',
    title: 'Turbo AI 設立',
    description:
      'Turbo AI (iturboai.com) が正式に設立され、デザイナーのワークフローを革新するための強力なAIツールを提供し始めました。',
    align: 'right',
  },
  {
    date: '未来',
    title: '新たな章',
    description:
      '私たちの旅はまだ始まったばかりです。私たちは継続的な革新に取り組み、ユーザーのフィードバックに耳を傾け、世界中のあらゆる産業を力づけるため、将来的にはさらにエキサイティングな機能をローンチする予定です。',
    align: 'left',
  },
];

export default function StoryJaPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto w-full px-4 md:w-4/5 lg:w-3/4">
        <h1 className="text-3xl font-bold text-center mb-4 md:text-4xl">
          私たちの物語
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16">
          革新、情熱、そして忍耐の旅。
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
              <div className="absolute left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-white dark:ring-gray-800 md:block"></div>

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
