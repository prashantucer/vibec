import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Trash2, Clock, PenLine, ChevronRight } from 'lucide-react';
import { REVIEWS, PROFESSORS } from '../data/mockData';
import StarRating from '../components/StarRating';

const MY_REVIEWS = REVIEWS.slice(0, 2).map(r => ({
  ...r,
  professor: PROFESSORS.find(p => p.id === r.professorId),
}));

function isWithin24h(dateStr) {
  const now = new Date();
  const created = new Date(dateStr);
  return (now - created) / (1000 * 60 * 60) <= 24;
}

export default function Dashboard() {
  const [reviews, setReviews] = useState(MY_REVIEWS);

  function deleteReview(id) {
    if (confirm('Are you sure you want to permanently delete this review?')) {
      setReviews(r => r.filter(rev => rev.id !== id));
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-apple-blue">
          <LayoutDashboard size={24} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-apple-text">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Reviews', value: reviews.length },
          { label: 'Helpful Votes', value: reviews.reduce((a, r) => a + r.helpful, 0) },
          { label: 'Avg Rating Given', value: reviews.length ? (reviews.reduce((a, r) => a + r.overallRating, 0) / reviews.length).toFixed(1) : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-3xl p-6 apple-shadow">
            <p className="text-[14px] font-semibold text-apple-text-muted uppercase tracking-wider mb-2">{label}</p>
            <p className="text-4xl font-bold text-apple-text tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-apple-text">Your Reviews</h2>
      </div>

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-6">
          {reviews.map(r => {
            const editable = isWithin24h(r.createdAt);
            return (
              <div key={r.id} className="bg-white border border-gray-100 rounded-3xl p-8 apple-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <Link to={`/professor/${r.professorId}`} className="text-[20px] font-semibold text-apple-text hover:text-apple-blue transition-colors group flex items-center gap-1">
                      {r.professor?.name} <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                    <p className="text-[15px] font-medium text-apple-text-muted mt-1">{r.subject} · {r.semester} Semester</p>
                    <p className="text-[13px] text-gray-400 mt-1 font-medium">{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl md:self-start">
                    <span className="text-[22px] font-bold text-apple-text tracking-tight">{r.overallRating.toFixed(1)}</span>
                    <StarRating rating={r.overallRating} size="sm" />
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-2xl p-5 mb-6">
                  <p className="text-[16px] text-apple-text leading-relaxed font-normal">"{r.comment}"</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {editable ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-apple-blue text-[13px] font-medium rounded-full">
                        <Clock size={14} /> Editable for 24h
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 text-[13px] font-medium rounded-full">
                        Permanent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {editable && (
                      <button className="flex items-center justify-center gap-1.5 px-4 py-2 text-[14px] font-medium text-apple-text bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                        <PenLine size={16} /> Edit
                      </button>
                    )}
                    {editable && (
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 text-[14px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-gray-100 rounded-3xl apple-shadow">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <PenLine size={24} />
          </div>
          <h3 className="text-xl font-semibold text-apple-text mb-2">No reviews yet</h3>
          <p className="text-[16px] text-apple-text-muted mb-8 max-w-md mx-auto">You haven't shared your experience with any professors yet. Your reviews help others!</p>
          <Link to="/search" className="inline-flex bg-apple-text text-white px-6 py-3 rounded-full font-medium hover:bg-apple-text/80 transition-colors">
            Find a Professor
          </Link>
        </div>
      )}
    </div>
  );
}
