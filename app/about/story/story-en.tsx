'use client';

const timelineData = [
  {
    date: '2024',
    title: 'Idea Born',
    description:
      'A group of passionate designers and developers discovered that existing AI design tools did not fully meet the dual needs of professional designers for efficiency and creativity. An idea was born to create a more intelligent and intuitive design collaboration platform.',
    align: 'left',
  },
  {
    date: '2025',
    title: 'Turbo AI Founded',
    description:
      'Turbo AI (iturboai.com) was officially founded, bringing powerful AI tools to designers to revolutionize their workflow.',
    align: 'right',
  },
  {
    date: 'Future',
    title: 'New Chapter',
    description:
      'Our journey is just beginning. We are committed to continuous innovation, listening to user feedback, and planning to launch more exciting features in the future to empower every industry around the world.',
    align: 'left',
  },
];

export default function StoryEnPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto w-full px-4 md:w-4/5 lg:w-3/4">
        <h1 className="text-3xl font-bold text-center mb-4 md:text-4xl">
          Our Story
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16">
          A journey of innovation, passion, and perseverance.
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
                className={`w-full rounded-lg border border-gray-200 bg-white-50 p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:w-1/2 ${
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
