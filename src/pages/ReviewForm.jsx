import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PROFESSORS, RATING_TAGS } from '../data/mockData';

function InteractiveStar({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={32}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`cursor-pointer transition-all duration-200 ${
            star <= (hovered || value) ? 'fill-apple-blue text-apple-blue scale-110 drop-shadow-sm' : 'fill-transparent text-gray-300 hover:text-gray-400'
          }`}
        />
      ))}
      <span className="ml-3 text-[14px] font-medium w-20 text-apple-text-muted">
        {value > 0 ? ['', 'Poor', 'Fair', 'Average', 'Good', 'Excellent'][value] : ''}
      </span>
    </div>
  );
}

const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

export default function ReviewForm() {
  const { professorId } = useParams();
  const professor = PROFESSORS.find(p => p.id === professorId);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: '',
    semester: '',
    teaching: 0,
    clarity: 0,
    fairness: 0,
    availability: 0,
    comment: '',
    tags: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!professor) return null;

  function toggleTag(tag) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.subject || !form.semester) return setError('Please select both subject and semester.');
    if (!form.teaching || !form.clarity || !form.fairness || !form.availability) return setError('Please rate all 4 categories.');
    if (form.comment.length < 20) return setError('Comment must be at least 20 characters.');
    setError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center px-4">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-apple-text mb-4">Review Submitted</h1>
        <p className="text-[17px] text-apple-text-muted mb-10 leading-relaxed">Your anonymous review for <strong>{professor.name}</strong> has been successfully recorded. Thank you for contributing to the community.</p>
        <Link to={`/professor/${professorId}`} className="inline-flex bg-apple-text text-white font-medium px-8 py-3.5 rounded-full hover:bg-apple-text/80 transition-colors shadow-lg shadow-gray-200 text-[17px]">
          Return to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Link to={`/professor/${professorId}`} className="inline-flex items-center gap-1.5 text-apple-text-muted hover:text-apple-text font-medium text-[15px] mb-8 transition-colors">
        <ChevronLeft size={18} /> Back
      </Link>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-apple-text mb-3">Write a Review</h1>
        <p className="text-[17px] text-apple-text-muted">For <span className="font-semibold text-apple-text">{professor.name}</span></p>
        <div className="inline-flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-apple-text-muted text-[13px] font-medium px-4 py-2 rounded-full mt-6">
          <ShieldCheck size={16} className="text-emerald-500" /> Your identity is completely hidden
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 apple-shadow flex flex-col gap-10">
        
        {/* Subject & Semester */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[15px] font-semibold text-apple-text mb-2.5">Subject</label>
            <select
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all"
            >
              <option value="">Select subject...</option>
              {professor.subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[15px] font-semibold text-apple-text mb-2.5">Your Semester</label>
            <select
              value={form.semester}
              onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all"
            >
              <option value="">Select semester...</option>
              {SEMESTERS.map(s => <option key={s} value={s}>{s} Semester</option>)}
            </select>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Ratings */}
        <div>
          <h2 className="text-[20px] font-bold text-apple-text mb-6">Rate the Professor</h2>
          <div className="flex flex-col gap-6">
            {[
              { key: 'teaching', label: 'Teaching Quality', desc: 'How well do they explain concepts?' },
              { key: 'clarity', label: 'Clarity & Communication', desc: 'Is the syllabus clear?' },
              { key: 'fairness', label: 'Grading Fairness', desc: 'Are exams and marks fair?' },
              { key: 'availability', label: 'Availability', desc: 'Are they accessible for doubts?' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-semibold text-apple-text">{label}</p>
                  <p className="text-[13px] text-apple-text-muted mt-0.5">{desc}</p>
                </div>
                <InteractiveStar value={form[key]} onChange={v => setForm(f => ({ ...f, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Comment */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[15px] font-semibold text-apple-text">Written Review</label>
            <span className="text-[13px] font-medium text-gray-400">{form.comment.length}/500</span>
          </div>
          <textarea
            value={form.comment}
            onChange={e => e.target.value.length <= 500 && setForm(f => ({ ...f, comment: e.target.value }))}
            placeholder="Share your honest experience. What should future students know?"
            rows={5}
            className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[15px] font-semibold text-apple-text mb-4">Add Tags (Optional)</label>
          <div className="flex flex-wrap gap-2.5">
            {[...RATING_TAGS.positive, ...RATING_TAGS.negative].map(tag => {
              const isSelected = form.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-[14px] font-medium px-4 py-2 rounded-full transition-all ${
                    isSelected
                      ? 'bg-apple-text text-white shadow-md'
                      : 'bg-gray-50 border border-gray-200 text-apple-text-muted hover:bg-gray-100 hover:text-apple-text'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-[14px] font-medium px-5 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-apple-blue text-white font-semibold rounded-2xl text-[17px] hover:bg-apple-blue-hover transition-all active:scale-[0.98] shadow-lg shadow-apple-blue/30 mt-4"
        >
          Submit Anonymous Review
        </button>
      </form>
    </div>
  );
}
