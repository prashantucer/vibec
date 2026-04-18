import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, GraduationCap, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 apple-glass">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-apple-text text-apple-surface p-1.5 rounded-lg group-hover:bg-apple-blue transition-colors">
            <GraduationCap size={18} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-apple-text">
            ProfessorRater
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/search" className="flex items-center gap-1.5 text-apple-text-muted hover:text-apple-text transition-colors text-[15px] font-medium">
            <Search size={16} />
            Search
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 text-apple-text-muted hover:text-apple-text transition-colors text-[15px] font-medium">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button className="flex items-center gap-1.5 text-apple-text-muted hover:text-red-500 transition-colors text-[15px] font-medium">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[15px] font-medium text-apple-text hover:text-apple-blue transition-colors">
                Sign in
              </Link>
              <Link to="/signup" className="text-[14px] bg-apple-text text-apple-surface font-medium px-4 py-1.5 rounded-full hover:bg-apple-text/80 transition-all active:scale-95">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-apple-text" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-b border-apple-border/30 px-6 py-6 flex flex-col gap-6 shadow-xl">
          <Link to="/search" className="text-apple-text text-lg font-medium flex items-center gap-3" onClick={() => setMobileOpen(false)}><Search size={20}/> Search Professors</Link>
          <div className="h-px bg-apple-border/30 w-full" />
          <Link to="/login" className="text-apple-text text-lg font-medium" onClick={() => setMobileOpen(false)}>Sign in</Link>
          <Link to="/signup" className="text-lg bg-apple-blue text-white font-medium px-6 py-3 rounded-xl text-center shadow-md shadow-apple-blue/20" onClick={() => setMobileOpen(false)}>Create an account</Link>
        </div>
      )}
    </nav>
  );
}
