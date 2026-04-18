import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PROFESSORS, COLLEGES } from '../data/mockData';
import ProfessorCard from '../components/ProfessorCard';

const DEPARTMENTS = [...new Set(PROFESSORS.map(p => p.department))];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCollege, setSelectedCollege] = useState(searchParams.get('college') || '');
  const [selectedDept, setSelectedDept] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = PROFESSORS
    .filter(p => {
      const q = query.toLowerCase();
      const matchesQuery = !q ||
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.subjects.some(s => s.toLowerCase().includes(q));
      const matchesCollege = !selectedCollege || p.collegeId === selectedCollege;
      const matchesDept = !selectedDept || p.department === selectedDept;
      const matchesRating = p.avgRating >= minRating;
      return matchesQuery && matchesCollege && matchesDept && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.avgRating - a.avgRating;
      if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
      return a.name.localeCompare(b.name);
    });

  function clearFilters() {
    setQuery('');
    setSelectedCollege('');
    setSelectedDept('');
    setMinRating(0);
    setSortBy('rating');
  }

  const hasFilters = query || selectedCollege || selectedDept || minRating > 0;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text mb-2">Search Professors</h1>
          <p className="text-[17px] text-apple-text-muted">Find and review faculty from across universities.</p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 apple-shadow focus-within:ring-4 focus-within:ring-apple-blue/10 focus-within:border-apple-blue/50 transition-all">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Name, subject, or department..."
            className="flex-1 bg-transparent text-apple-text placeholder:text-gray-400 outline-none text-[16px]"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setFiltersOpen(o => !o)}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[15px] font-medium transition-all ${
            filtersOpen || hasFilters 
              ? 'bg-apple-text text-white' 
              : 'bg-white border border-gray-200 text-apple-text hover:bg-gray-50 apple-shadow'
          }`}
        >
          <SlidersHorizontal size={18} />
          Filters {hasFilters && <span className="w-2 h-2 bg-apple-blue rounded-full ml-1" />}
        </button>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-10 apple-shadow animate-in slide-in-from-top-4 fade-in duration-200 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-[13px] font-semibold text-apple-text-muted uppercase tracking-wider mb-2">College</label>
            <select
              value={selectedCollege}
              onChange={e => setSelectedCollege(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
            >
              <option value="">All Colleges</option>
              {COLLEGES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-apple-text-muted uppercase tracking-wider mb-2">Department</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-apple-text-muted uppercase tracking-wider mb-2">
              Min Rating: {minRating > 0 ? minRating.toFixed(1) : 'Any'}
            </label>
            <div className="py-2.5">
              <input
                type="range" min="0" max="5" step="0.5"
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
                className="w-full accent-apple-blue"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-apple-text-muted uppercase tracking-wider mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
          {hasFilters && (
            <div className="col-span-full pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={clearFilters} className="text-[14px] font-medium text-apple-text hover:text-apple-blue transition-colors flex items-center gap-1.5">
                <X size={16} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results summary */}
      <div className="mb-6">
        <p className="text-[15px] font-medium text-apple-text-muted">
          Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <ProfessorCard key={p.id} professor={p} />)}
        </div>
      ) : (
        <div className="text-center py-32 bg-white border border-gray-100 rounded-3xl apple-shadow">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-apple-text mb-2">No professors found</h3>
          <p className="text-apple-text-muted mb-6 max-w-md mx-auto">We couldn't find anyone matching your current filters. Try adjusting your search criteria.</p>
          <button onClick={clearFilters} className="bg-apple-text text-white px-6 py-2.5 rounded-full font-medium hover:bg-apple-text/80 transition-colors">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
