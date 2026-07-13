import React, { useState } from 'react';
import { Home, Compass, Video, Calendar, User, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;       // Controls mobile visibility
  onClose: () => void;   // Closes the sidebar on mobile
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'connect', label: 'Connect', icon: Video },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop: Darkens the screen when sidebar is open on mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden" 
        />
      )}

      <aside 
        className={`bg-[#0B0F19] border-r border-slate-900 p-4 flex flex-col justify-between fixed h-screen top-0 left-0 z-40 select-none transition-all duration-300 ease-in-out
          /* Mobile: Off-screen by default, slide in when isOpen is true */
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} 
          /* Desktop: Variable width based on isCollapsed */
          ${isCollapsed ? 'md:w-[76px]' : 'md:w-64'}
        `}
      >
        <div className="space-y-8">
          {/* Brand System Logo */}
          <div className={`flex items-center space-x-3 px-1 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="flex items-center justify-center text-sm font-black shadow-lg w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-cyan-400/10 shrink-0">
              CP
            </div>
            
            {/* Mobile Close Button (Only visible on mobile) */}
            <button onClick={onClose} className="absolute md:hidden top-5 right-4 text-slate-400">
              <X className="w-5 h-5" />
            </button>

            {!isCollapsed && (
              <div className="min-w-0 duration-200 animate-in fade-in">
                <h1 className="text-xs font-black leading-none tracking-widest uppercase text-slate-100">
                  CrossConnect
                </h1>
                <p className="text-[10px] text-slate-500 font-bold mt-1 tracking-wide truncate">
                  Believers Worldwide
                </p>
              </div>
            )}
          </div>

          {/* Dynamic Route List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    // On mobile, auto-close sidebar when a tab is selected
                    if (window.innerWidth < 768) onClose();
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-bold tracking-wide transition-all duration-200 group cursor-pointer will-change-transform active:scale-[0.98] ${
                    isCollapsed ? 'justify-center py-3 px-0' : 'justify-start px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-cyan-500/5 text-cyan-400 border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'
                  }`}
                >
                  <Icon 
                    className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                      isCollapsed ? '' : 'mr-3.5'
                    } ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} 
                  />
                  {!isCollapsed && (
                    <span className="duration-200 animate-in fade-in sequential">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Segment: Scripture Box & Collapse Toggle */}
        <div className="space-y-4">
          {!isCollapsed && (
            <div className="bg-[#111827]/40 border border-slate-900/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 pl-0.5">
                Verse of the Day
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                "For where two or three gather in my name, there am I with them."
              </p>
              <span className="text-[10px] text-cyan-400 block mt-2.5 font-bold tracking-wide">
                — Matthew 18:20
              </span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-950 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px]">Minimize Console</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};