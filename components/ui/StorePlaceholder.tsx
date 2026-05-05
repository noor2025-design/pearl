interface StorePlaceholderProps {
  name: string;
  className?: string;
}

export default function StorePlaceholder({ name, className = '' }: StorePlaceholderProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`store-placeholder ${className}`} aria-label={`${name} logo placeholder`}>
      {initials}
    </div>
  );
}
