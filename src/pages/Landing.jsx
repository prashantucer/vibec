import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronRight, ShieldCheck, Star, BookOpen } from 'lucide-react';
import { PROFESSORS, COLLEGES } from '../data/mockData';
import ProfessorCard from '../components/ProfessorCard';

export default function Landing() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const topProfessors = [...PROFESSORS].sort((a, b) => b.avgRating - a.avgRating).slice(0, 3);

  function handleSearch(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const results = PROFESSORS.filter(p =>
        p.name.toLowerCase().includes(val.toLowerCase()) ||
        p.department.toLowerCase().includes(val.toLowerCase()) ||
        p.subjects.some(s => s.toLowerCase().includes(val.toLowerCase()))
      );
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  const steps = [
    { icon: ShieldCheck, title: 'Verify College Email', desc: 'Sign up with your official college email. No personal emails allowed.' },
    { icon: Search, title: 'Find Your Professor', desc: 'Search by name, department, subject, or browse by college.' },
    { icon: Star, title: 'Rate Anonymously', desc: 'Rate on teaching, clarity, fairness. Your identity stays hidden.' },
    { icon: BookOpen, title: 'Read Verified Reviews', desc: 'Access honest feedback to make better academic decisions.' },
  ];

  return (
    <div className="bg-apple-bg min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[13px] font-medium bg-blue-50 text-apple-blue px-3 py-1 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-pulse" />
          Beta · For AKTU Students
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-apple-text leading-[1.1] mb-6">
          Rate your professors.<br />
          <span className="text-gray-400">Completely anonymously.</span>
        </h1>

        <p className="text-[20px] text-apple-text-muted max-w-2xl mx-auto mb-12 font-medium">
          Verified college email only. Zero fake reviews. The most honest professor review platform for Indian universities.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative z-10">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3.5 apple-shadow focus-within:ring-4 focus-within:ring-apple-blue/10 focus-within:border-apple-blue/50 transition-all">
            <Search size={22} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search professor, subject, or department..."
              className="flex-1 bg-transparent text-apple-text placeholder:text-gray-400 outline-none text-[17px]"
            />
            <button type="submit" className="bg-apple-blue text-white text-[15px] font-medium px-5 py-2 rounded-full hover:bg-apple-blue-hover transition-colors shrink-0">
              Search
            </button>
          </form>

          {/* Autocomplete */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl overflow-hidden apple-shadow-hover z-20">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to={`/professor/${p.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0"
                  onClick={() => setSuggestions([])}
                >
                  <div className="text-left">
                    <p className="text-[16px] font-semibold text-apple-text">{p.name}</p>
                    <p className="text-[13px] text-apple-text-muted mt-0.5">{p.department} · {p.collegeName}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                    <Star size={12} className="fill-apple-text text-apple-text" />
                    <span className="text-[14px] font-bold text-apple-text">{p.avgRating.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <p className="text-[13px] text-gray-400 mt-5 font-medium">
          Try: "Ramesh Chandra", "Data Structures", or "KIET"
        </p>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 px-4 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-apple-text">Top Rated Professors</h2>
              <p className="text-[17px] text-apple-text-muted mt-2">Highest rated across all universities this month.</p>
            </div>
            <Link to="/search" className="hidden sm:flex items-center gap-1 text-[15px] font-medium text-apple-blue hover:text-apple-blue-hover transition-colors group">
              View all <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topProfessors.map((p) => (
              <ProfessorCard key={p.id} professor={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-apple-text text-center mb-4">Browse by College</h2>
        <p className="text-[17px] text-apple-text-muted text-center mb-12">Select your institution to find professors instantly.</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLEGES.map((c) => (
            <Link
              key={c.id}
              to={`/search?college=${c.id}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 apple-shadow hover:apple-shadow-hover transition-all group flex items-center justify-between"
            >
              <div>
                <p className="text-[17px] font-semibold text-apple-text group-hover:text-apple-blue transition-colors">{c.name}</p>
                <p className="text-[14px] text-apple-text-muted mt-1">{c.university} · {c.location}</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-apple-blue transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-apple-text">How It Works</h2>
            <p className="text-[17px] text-apple-text-muted mt-3">Simple, secure, and built for students.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-apple-text">
                  <Icon size={24} />
                </div>
                <h3 className="text-[18px] font-semibold text-apple-text mb-3">{title}</h3>
                <p className="text-[15px] text-apple-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-apple-text mb-6">
          Ready to share your experience?
        </h2>
        <p className="text-[18px] text-apple-text-muted mb-10 max-w-xl mx-auto">
          Your honest reviews help thousands of students make informed decisions about their education.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-apple-text text-white font-medium px-8 py-3.5 rounded-full text-[17px] hover:bg-apple-text/80 transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
}
