import React from 'react';
import { Search, Bell } from 'lucide-react';

interface NavbarProps {
  onSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  return (
    <header className="h-16 border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 w-full">
      <div className="w-full max-w-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search believers, events, communities..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-xl bg-[#0B0F19] border border-slate-800/60 text-slate-400 hover:text-slate-200 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </button>
        <div className="w-px h-8 bg-slate-800" />
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
          alt="My Profile"
          className="object-cover w-8 h-8 border rounded-full shadow-inner border-cyan-400/30"
        />
      </div>
    </header>
  );
};