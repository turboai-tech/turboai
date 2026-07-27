type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
}: SectionHeadingProps) {
  const isCentred = align === 'center';

  return (
    <header
      className={`flex flex-col gap-3 ${
        isCentred ? 'items-center text-center' : 'items-start text-start'
      }`}>
      <span className="label-mono">{eyebrow}</span>
      <h2 className="text-[clamp(28px,6vw,32px)] font-bold leading-[1.15] tracking-tighter sm:text-[44px]">
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base leading-7 text-muted ${
            isCentred ? 'max-w-[620px]' : 'max-w-[680px]'
          }`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
