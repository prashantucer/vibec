import { Link } from 'react-router-dom';
import { MailCheck, RefreshCw, ArrowLeft } from 'lucide-react';

export default function VerifyEmail() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px] text-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-apple-blue">
          <MailCheck size={40} />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-apple-text mb-4">Check Your Inbox</h1>
        <p className="text-[17px] text-apple-text-muted mb-10 leading-relaxed font-medium">
          We've sent a verification link to your college email. Click the link to activate your account.
        </p>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 apple-shadow mb-8 text-left">
          <h3 className="text-[16px] font-semibold text-apple-text mb-4">Didn't receive the email?</h3>
          <ul className="text-[15px] text-apple-text-muted space-y-2.5 mb-6 font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Check your spam folder
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Verify email spelling
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Wait a few minutes
            </li>
          </ul>
          
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-apple-text font-semibold rounded-xl transition-colors text-[15px]">
            <RefreshCw size={16} /> Resend Link
          </button>
        </div>

        <Link to="/" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-apple-text-muted hover:text-apple-text transition-colors">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
