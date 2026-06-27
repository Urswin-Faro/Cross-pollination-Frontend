import React, { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  // 1. Hook up local state for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Track networking operational state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      // 3. Dispatch auth credentials to the backend
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Fallback to explicit backend response string or generic error
        throw new Error(data.error || 'Invalid credential configuration.');
      }

      // 4. Stash the verified JWT token and session metadata
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      // 5. Secure pass validated: Route directly into the app dashboard container
      onNavigate('app');
    } catch (err: any) {
      setError(err.message || 'Network handshake failed. Verify server is online.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log into your dashboard container to resume your connections.">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Render crisp, dark-mode alert warning if credentials fail validation */}
        {error && (
          <div className="p-3 text-xs font-medium text-center text-red-400 border bg-red-500/10 border-red-500/30 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <Mail className="absolute w-4 h-4 left-3 top-3 text-slate-600" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <a href="#" className="text-[10px] font-bold text-cyan-400 hover:underline">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="absolute w-4 h-4 left-3 top-3 text-slate-600" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-800 disabled:text-slate-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 pt-3 shadow-md shadow-cyan-400/5"
        >
          {loading ? 'Verifying Credentials...' : 'Access Dashboard'} 
          {!loading && <ArrowRight className="w-3.5 h-3.5" />}
        </button>

        <p className="text-center text-[11px] text-slate-500 pt-2">
          New to the community?{' '}
          <button type="button" onClick={() => onNavigate('register')} className="font-bold text-cyan-400 hover:underline">
            Create account
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};