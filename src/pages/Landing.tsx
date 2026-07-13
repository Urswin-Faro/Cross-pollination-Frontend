import React from 'react';
import { Flame, ArrowRight, ShieldCheck, Users, Radio } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-cyan-400/30">
      {/* Visual background atmospheric elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-3xl pointer-events-none" />

      {/* Top Header Branding Row */}
      <header className="relative z-10 flex items-center justify-between w-full h-20 px-6 mx-auto max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center text-base font-black shadow-md w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-cyan-400/10">
            CP
          </div>
          <span className="text-sm font-bold tracking-wider text-white">CrossConnect</span>
        </div>
        <button 
          onClick={() => onNavigate('login')}
          className="text-xs font-bold transition text-slate-300 hover:text-cyan-400"
        >
          Sign In
        </button>
      </header>

      {/* Hero Canvas Center Piece */}
      <main className="relative z-10 max-w-4xl px-6 py-12 mx-auto my-auto space-y-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>Connecting Gen Z Believers Worldwide</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Fellowship shouldn't be <br />
          <span className="text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text">
            hard to find.
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-xs leading-relaxed text-slate-400 md:text-sm">
          Discover vetted youth ministries, build authentic prayer partnerships, and track upcoming local worship encounters. A unified platform engineered for the global body of Christ.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <button 
            onClick={() => onNavigate('register')}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 text-xs font-bold transition duration-150 shadow-lg sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl shadow-cyan-400/15 group"
          >
            Create Free Account 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button 
            onClick={() => onNavigate('app')}
            className="w-full px-6 py-3 text-xs font-bold transition border sm:w-auto bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 rounded-xl"
          >
            Explore Anonymously
          </button>
        </div>

        {/* Dynamic Ecosystem Indicators */}
        <div className="grid max-w-lg grid-cols-3 gap-4 pt-12 mx-auto border-t border-slate-800/40">
          <div>
            <span className="block text-lg font-black text-white">12k+</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Members</span>
          </div>
          <div>
            <span className="block text-lg font-black text-cyan-400">450+</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Verified Churches</span>
          </div>
          <div>
            <span className="block text-lg font-black text-white">1,800+</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Monthly Events</span>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Footer legal note */}
      <footer className="h-14 border-t border-slate-900 flex items-center justify-center px-6 text-[10px] text-slate-600">
        &copy; 2026 CrossConnect. Built for global discipleship. All rights reserved.
      </footer>
    </div>
  );
};