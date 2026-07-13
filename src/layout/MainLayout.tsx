import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void; // Add this line
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-white relative flex font-sans antialiased">
      
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 flex items-center px-4 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-900 z-30">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 transition-colors text-slate-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-3 text-xs font-bold tracking-widest uppercase text-slate-200">
          CrossPollination
        </span>
      </div>

      {/* Sidebar Component with State and onLogout passed down */}
     <Sidebar 
  activeTab={activeTab} 
  setActiveTab={setActiveTab}
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  onLogout={onLogout} // This is likely what caused the error if the interface wasn't saved
/>
      
      {/* Dynamic Content Container */}
      <div className="flex flex-col flex-1 min-h-screen pt-14 md:pt-0 pl-0 md:pl-[76px] min-w-0 w-full relative transition-all duration-300">
        <main className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};