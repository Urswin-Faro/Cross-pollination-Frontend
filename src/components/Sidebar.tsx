import React from 'react';
import { Home, Compass, Video, MessageSquare, Calendar, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'connect', label: 'Connect', icon: Video },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-slate-800/60 p-5 flex flex-col justify-between fixed h-screen z-30">
      <div className="space-y-7">
        <div className="flex items-center px-2 space-x-3">
          <div className="flex items-center justify-center text-base font-black shadow-lg w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-cyan-400/10">
            CP
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none tracking-wider text-white">CrossPollination</h1>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Believers worldwide</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 group ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-4 shadow-sm">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Verse of the day</span>
        <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">
          "For where two or three gather in my name, there am I with them."
        </p>
        <span className="text-[10px] text-cyan-400 block mt-2 font-semibold">— Matthew 18:20</span>
      </div>
    </aside>
  );
};