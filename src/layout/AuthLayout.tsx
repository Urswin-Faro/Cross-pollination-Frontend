import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-cyan-500/30">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Short Logo Header branding */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 mx-auto text-lg font-black shadow-lg rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-cyan-400/10">
            CP
          </div>
          <h1 className="pt-1 text-xl font-bold tracking-tight text-white">{title}</h1>
          <p className="max-w-xs mx-auto text-xs leading-relaxed text-slate-400">{subtitle}</p>
        </div>

        {/* Central Core Content Card Container */}
        <div className="bg-[#0B0F19] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};