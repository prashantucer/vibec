import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import StarRating from './StarRating';

const POSITIVE_TAGS = ['Explains well', 'Available after class', 'Fair exams', 'Recommends resources', 'Gives extra time', 'Industry examples'];

export default function ReviewCard({ review }) {
  const { subject, semester, ratings, overallRating, comment, tags, helpful, createdAt } = review;
  const [helpfulCount, setHelpfulCount] = useState(helpful);
  const [voted, setVoted] = useState(false);

  const categories = [
    { label: 'Teaching', key: 'teaching' },
    { label: 'Clarity', key: 'clarity' },
    { label: 'Fairness', key: 'fairness' },
    { label: 'Availability', key: 'availability' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-7 apple-shadow">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm">
            AS
          </div>
          <div>
            <p className="font-semibold text-apple-text text-[15px]">Anonymous Student</p>
            <p className="text-apple-text-muted text-[13px] mt-0.5">{subject} · {semester} Sem</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-[20px] font-bold text-apple-text tracking-tight">{overallRating.toFixed(1)}</span>
            <StarRating rating={overallRating} size="sm" />
          </div>
          <p className="text-gray-400 text-[12px] mt-1 font-medium">{new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6 bg-gray-50/50 rounded-2xl p-4">
        {categories.map(({ label, key }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-[13px] text-apple-text-muted w-20 shrink-0 font-medium">{label}</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-apple-text rounded-full transition-all"
                style={{ width: `${(ratings[key] / 5) * 100}%` }}
              />
            </div>
            <span className="text-[13px] font-semibold text-apple-text w-4 text-right">{ratings[key]}</span>
          </div>
        ))}
      </div>

      <p className="text-apple-text text-[15px] leading-relaxed mb-6 font-normal">
        {comment}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isPos = POSITIVE_TAGS.includes(tag);
            return (
              <span
                key={tag}
                className={`text-[13px] px-3 py-1 rounded-full font-medium ${
                  isPos
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <button
          onClick={() => { if (!voted) { setHelpfulCount(c => c + 1); setVoted(true); } }}
          className={`flex items-center justify-center gap-2 text-[13px] px-4 py-2 rounded-full font-medium transition-all shrink-0 ${
            voted
              ? 'bg-blue-50 text-apple-blue'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-apple-text'
          }`}
        >
          <ThumbsUp size={14} className={voted ? "fill-apple-blue" : ""} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </div>
  );
}
