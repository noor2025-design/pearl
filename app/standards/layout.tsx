import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Standards | Pearl',
  description: 'How Pearl verifies shops, reviews community content, and maintains a trusted modest fashion directory.',
};

export default function StandardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
