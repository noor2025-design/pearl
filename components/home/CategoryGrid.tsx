import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    label: 'Abayas',
    slug: 'Abayas',
    image: 'https://www.figma.com/api/mcp/asset/f776fd17-bca9-4d27-a2ce-27cd320a987a',
  },
  {
    label: 'Occasion',
    slug: 'Occasion Wear',
    image: 'https://www.figma.com/api/mcp/asset/232cf5dc-d177-43ca-942d-59077dd5063e',
  },
  {
    label: 'Traditional',
    slug: 'Traditional Wear',
    image: 'https://www.figma.com/api/mcp/asset/e2c3af4f-55be-41c7-814c-6ceeaeb41f95',
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            id="categories-heading"
            className="font-ui text-periwinkle font-semibold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Shop by Category
          </h2>
        </div>
        <div className="text-center mb-14">
          <p className="font-ui text-periwinkle text-xl md:text-2xl">
            Find the perfect style for the occasion.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={`/directory?category=${encodeURIComponent(cat.slug)}`}
                className="group relative rounded-[15px] overflow-hidden h-[280px] md:h-[343px] card-hover"
                aria-label={`Browse ${cat.label}`}
              >
                {/* Photo */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />

                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Text content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-ui text-[#8ea7e8] text-4xl md:text-5xl font-normal leading-tight">
                    {cat.label}
                  </p>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
