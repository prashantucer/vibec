import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 'md', interactive = false, onChange }) {
  const sizeMap = { sm: 14, md: 18, lg: 24 };
  const px = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={px}
          onClick={() => interactive && onChange?.(star)}
          className={`transition-colors ${
            star <= Math.round(rating)
              ? 'fill-accent text-accent'
              : 'fill-transparent text-surface/30'
          } ${interactive ? 'cursor-pointer hover:text-accent hover:fill-accent' : ''}`}
        />
      ))}
    </div>
  );
}
