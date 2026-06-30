import React from 'react';
import { Sidebar } from '../components/Sidebar'; // Adjust path if needed

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-white relative flex font-sans antialiased">
      {/* Fixed Navigation Sidebar Dock */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* THE CULPRIT DIV FROM YOUR INSPECTOR:
        ❌ BEFORE: className="flex flex-col flex-1 min-h-screen pl-64"
        👉 AFTER: Swapped to pl-[76px] to pull content perfectly flush with the icon dock.
      */}
      <div className="flex flex-col flex-1 min-h-screen pl-[76px] min-w-0 w-full relative">
        <main className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};