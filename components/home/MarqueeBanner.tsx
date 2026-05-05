interface MarqueeBannerProps {
  items: string[];
  variant?: 'periwinkle' | 'cream';
  speed?: number;
}

export default function MarqueeBanner({
  items,
  variant = 'periwinkle',
  speed = 30,
}: MarqueeBannerProps) {
  const bg = variant === 'periwinkle' ? 'bg-periwinkle' : 'bg-cream';
  const text = variant === 'periwinkle' ? 'text-cream' : 'text-periwinkle';
  const separator = variant === 'periwinkle' ? 'text-cream/50' : 'text-periwinkle/40';

  const repeated = [...items, ...items, ...items];

  return (
    <div className={`${bg} py-4 overflow-hidden`}>
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-4 font-ui text-sm font-medium tracking-widest uppercase ${text}`}
          >
            {item}
            <span className={separator}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
