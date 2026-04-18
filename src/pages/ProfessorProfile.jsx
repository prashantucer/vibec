import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Building2, PenLine, ChevronLeft } from 'lucide-react';
import { PROFESSORS, REVIEWS } from '../data/mockData';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';

const POSITIVE_TAGS = ['Explains well', 'Available after class', 'Fair exams', 'Recommends resources', 'Gives extra time', 'Industry examples'];

function RatingBar({ label, value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[14px] font-medium text-apple-text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-2 bg-apple-text rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-[14px] font-semibold text-apple-text w-8 text-right shrink-0">{value.toFixed(1)}</span>
    </div>
  );
}

export default function ProfessorProfile() {
  const { id } = useParams();
  const professor = PROFESSORS.find(p => p.id === id);
  const reviews = REVIEWS.filter(r => r.professorId === id);

  if (!professor) {
    return (
      <div className="text-center py-32 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-apple-text mb-2">Professor not found</h2>
        <p className="text-apple-text-muted mb-6">The profile you're looking for doesn't exist or was removed.</p>
        <Link to="/search" className="text-apple-blue font-medium hover:underline">Return to Search</Link>
      </div>
    );
  }

  const { name, department, collegeName, avgRating, totalReviews, subjects, ratings } = professor;

  const tagCounts = {};
  reviews.forEach(r => r.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link to="/search" className="inline-flex items-center gap-1.5 text-apple-text-muted hover:text-apple-text font-medium text-[15px] mb-8 transition-colors">
        <ChevronLeft size={18} /> Back
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 mb-10 apple-shadow">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-text mb-4">{name}</h1>
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-[17px] font-medium text-apple-text">{department}</p>
              <div className="flex items-center gap-2 text-[15px] text-apple-text-muted">
                <Building2 size={16} /> {collegeName}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjects.map(s => (
                <span key={s} className="text-[13px] px-3 py-1.5 bg-gray-50 border border-gray-200 text-apple-text-muted rounded-lg font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-8 shrink-0 min-w-[200px]">
            <p className="text-7xl font-bold tracking-tighter text-apple-text mb-2">{avgRating.toFixed(1)}</p>
            <StarRating rating={avgRating} size="md" />
            <p className="text-apple-text-muted text-[14px] mt-3 font-medium flex items-center gap-1.5">
              <Users size={14} /> {totalReviews} Reviews
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-10 pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-x-12 gap-y-4">
          <RatingBar label="Teaching Quality" value={ratings.teaching} />
          <RatingBar label="Clarity" value={ratings.clarity} />
          <RatingBar label="Fairness" value={ratings.fairness} />
          <RatingBar label="Availability" value={ratings.availability} />
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-bold tracking-tight text-apple-text mb-6">
            Student Reviews <span className="text-gray-400 font-normal ml-2">{reviews.length}</span>
          </h2>

          {reviews.length > 0 ? (
            <div className="flex flex-col gap-6">
              {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center apple-shadow">
              <h3 className="text-xl font-semibold text-apple-text mb-2">No reviews yet</h3>
              <p className="text-apple-text-muted mb-6">Be the first to share your experience with this professor.</p>
              <Link to={`/review/${id}`} className="inline-flex bg-apple-blue text-white px-6 py-2.5 rounded-full font-medium hover:bg-apple-blue-hover transition-colors">
                Write a Review
              </Link>
            </div>
          )}
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <Link
            to={`/review/${id}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-apple-text text-white font-semibold rounded-2xl hover:bg-apple-text/80 transition-colors shadow-lg shadow-gray-200"
          >
            <PenLine size={18} />
            Write Review
          </Link>

          {sortedTags.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 apple-shadow">
              <h3 className="text-[14px] font-semibold text-apple-text uppercase tracking-widest mb-5">Student Consensus</h3>
              <div className="flex flex-col gap-3">
                {sortedTags.map(([tag, count]) => {
                  const isPos = POSITIVE_TAGS.includes(tag);
                  return (
                    <div key={tag} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPos ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        <span className="text-[14px] font-medium text-apple-text">{tag}</span>
                      </div>
                      <span className="text-[13px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
