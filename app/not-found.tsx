import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl text-periwinkle/30 mb-2">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
          Page not found
        </h1>
        <p className="font-ui text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try browsing our directory instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-periwinkle text-white font-medium font-ui text-sm hover:bg-periwinkle-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/directory"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-cream-dark text-text-secondary font-medium font-ui text-sm hover:bg-cream transition-colors"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
