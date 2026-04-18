import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Please enter both email and password.');
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Firebase authentication is not fully configured yet.');
    }, 1000);
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-apple-blue">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-apple-text mb-2">Welcome Back</h1>
          <p className="text-[15px] text-apple-text-muted">Sign in to manage your reviews.</p>
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
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-apple-text">Password</label>
              <button type="button" className="text-[13px] font-medium text-apple-blue hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Enter password"
                className="w-full bg-gray-50 border border-gray-200 text-apple-text text-[15px] rounded-xl px-4 py-3 pr-12 outline-none focus:bg-white focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 transition-all placeholder:text-gray-400"
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-apple-text transition-colors">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[14px] font-medium px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-apple-blue text-white font-semibold rounded-xl text-[16px] hover:bg-apple-blue-hover transition-all disabled:opacity-50 shadow-md shadow-apple-blue/20 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-[15px] text-apple-text-muted mt-8 font-medium">
          New to ProfessorRater?{' '}
          <Link to="/signup" className="text-apple-blue hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
