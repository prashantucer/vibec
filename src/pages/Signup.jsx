import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, AlertCircle, ShieldCheck } from 'lucide-react';

const BLOCKED_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'yahoo.co.in'];

function validateCollegeEmail(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1].toLowerCase();
  return !BLOCKED_DOMAINS.includes(domain);
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.email.includes('@')) return setError('Please enter a valid email address.');
    if (!validateCollegeEmail(form.email)) return setError('Personal emails are not allowed. Use your college email.');
    if (form.password.length < 8) return setError('Password must be at least 8 characters long.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-email');
    }, 1000);
  }

  const domain = form.email.includes('@') ? form.email.split('@')[1] : null;
  const isBlocked = domain && BLOCKED_DOMAINS.includes(domain.toLowerCase());

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-apple-blue">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-apple-text mb-2">Create Account</h1>
          <p className="text-[15px] text-apple-text-muted">Use your college email to verify your status.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 apple-shadow flex flex-col gap-5">
          
          <div>
            <label className="block text-[14px] font-semibold text-apple-text mb-2">College Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="name@college.ac.in"
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all placeholder:text-gray-400"
            />
            {isBlocked && (
              <p className="text-[13px] text-red-500 font-medium mt-2 flex items-center gap-1.5">
                <AlertCircle size={14} /> Only institution emails allowed
              </p>
            )}
            {domain && !isBlocked && form.email.length > 5 && (
              <p className="text-[13px] text-emerald-600 font-medium mt-2 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Valid institution domain
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-apple-text mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Minimum 8 characters"
                className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 pr-12 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all placeholder:text-gray-400"
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-apple-text transition-colors">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-apple-text mb-2">Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              placeholder="Re-enter password"
              className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all placeholder:text-gray-400"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[14px] font-medium px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isBlocked}
            className="w-full py-3.5 bg-apple-blue text-white font-semibold rounded-xl text-[16px] hover:bg-apple-blue-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-apple-blue/20 mt-2"
          >
            {loading ? 'Creating account...' : 'Continue'}
          </button>
          
          <div className="text-center mt-2">
            <p className="text-[12px] text-gray-400 leading-relaxed font-medium">
              Your email is only used for verification. Your reviews remain 100% anonymous.
            </p>
          </div>
        </form>

        <p className="text-center text-[15px] text-apple-text-muted mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-apple-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
