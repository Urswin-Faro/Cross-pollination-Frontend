import React, { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { Mail, Lock, User } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  // 1. Manage form input state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Manage network feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Dynamic environment fallback matching your backend config
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      // 3. Fire the credential payload over to the Express backend
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication server rejected registration registration.');
      }

      // 4. Stash session keys and name locally so the profile setup wizard can use them
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('temp_fullName', fullName);

      // 5. Handshake complete! Advance user to step-by-step profile setup matrix
      onNavigate('setup');
    } catch (err: any) {
      setError(err.message || 'Network connection failed. Verify backend is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Join CrossPollination" subtitle="Create your identity card to connect with global believers.">
      <form onSubmit={handleSignUp} className="space-y-4">
        
        {/* Render clean alert warning if backend rejects request */}
        {error && (
          <div className="p-3 text-xs font-medium text-center text-red-400 border bg-red-500/10 border-red-500/30 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
          <div className="relative">
            <User className="absolute w-4 h-4 left-3 top-3 text-slate-600" />
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <Mail className="absolute w-4 h-4 left-3 top-3 text-slate-600" />
            <input 
              type="type" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
          <div className="relative">
            <Lock className="absolute w-4 h-4 left-3 top-3 text-slate-600" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
            />
          </div>
        </div>

        <div className="flex items-start pt-1 space-x-2">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-800 bg-[#030712] text-cyan-400 focus:ring-0" />
          <p className="text-[10px] text-slate-500 leading-tight">
            I agree to the community code of conduct and safety guidelines.
          </p>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-800 disabled:text-slate-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition pt-3 shadow-md"
        >
          {loading ? 'Processing Secure Deployment...' : 'Register & Continue'}
        </button>

        <p className="text-center text-[11px] text-slate-500 pt-1">
          Already have an account?{' '}
          <button type="button" onClick={() => onNavigate('login')} className="font-bold text-cyan-400 hover:underline">
            Sign In
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};