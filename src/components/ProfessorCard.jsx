import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import StarRating from './StarRating';

function getRatingColor(rating) {
  if (rating >= 4.5) return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  if (rating >= 3.5) return 'bg-blue-50 text-apple-blue border-blue-200';
  if (rating >= 2.5) return 'bg-orange-50 text-orange-600 border-orange-200';
  return 'bg-red-50 text-red-600 border-red-200';
}

function getRatingDot(rating) {
  if (rating >= 4.5) return 'bg-emerald-500';
  if (rating >= 3.5) return 'bg-apple-blue';
  if (rating >= 2.5) return 'bg-orange-500';
  return 'bg-red-500';
}

export default function ProfessorCard({ professor }) {
  const { id, name, department, collegeName, avgRating, totalReviews, tags } = professor;

  return (
    <Link to={`/professor/${id}`} className="block h-full outline-none">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 apple-shadow hover:apple-shadow-hover transition-all duration-300 h-full flex flex-col group cursor-pointer ring-offset-2 focus-within:ring-2 focus-within:ring-apple-blue/50">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-[19px] font-semibold text-apple-text group-hover:text-apple-blue transition-colors truncate">
              {name}
            </h3>
            <p className="text-[15px] text-apple-text-muted mt-1 font-medium">{department}</p>
            <p className="text-[13px] text-gray-400 mt-1 flex items-center gap-1.5">
               {collegeName}
            </p>
          </div>
          
          <div className="text-right shrink-0 flex flex-col items-end">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getRatingColor(avgRating)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${getRatingDot(avgRating)}`}></span>
              <span className="text-[17px] font-bold tracking-tight">{avgRating.toFixed(1)}</span>
            </div>
            <p className="text-gray-400 text-[12px] mt-2 flex items-center gap-1 font-medium">
              <Users size={12} /> {totalReviews} reviews
            </p>
          </div>
        </div>

        <div className="mt-auto">
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => {
                const isPos = ['Explains well', 'Available after class', 'Fair exams', 'Recommends resources', 'Gives extra time', 'Industry examples'].includes(tag);
                return (
                  <span
                    key={tag}
                    className={`text-[12px] px-2.5 py-1 rounded-full font-medium ${
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
          ) : (
            <div className="h-6"></div>
          )}
        </div>
      </div>
    </Link>
  );
}
