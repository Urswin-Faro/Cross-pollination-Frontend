import React, { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { MapPin, Sparkles, Check } from 'lucide-react';

interface SetupProfileProps {
  onNavigate: (page: string) => void;
}

export const SetupProfile: React.FC<SetupProfileProps> = ({ onNavigate }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const availableTags = [
    'Worship', 
    'Bible Study', 
    'Youth Ministry', 
    'Missions', 
    'Apologetics', 
    'Prayer', 
    'Discipleship', 
    'Outreach'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCompleteSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTags.length === 0) return;
    onNavigate('app'); // Drops user straight down onto layout feed dashboard
  };

  return (
    <AuthLayout 
      title="Setup Your Profile Card" 
      subtitle="Configure your identity parameters to power the matching algorithm tracker framework."
    >
      <form onSubmit={handleCompleteSetup} className="space-y-5">
        
        {/* Two-Column Demographic Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">
              Age
            </label>
            <input 
              type="number" 
              required
              min="13"
              max="120"
              placeholder="22"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">
              Location
            </label>
            <div className="relative group">
              <input 
                type="text" 
                required
                placeholder="Cape Town, ZA"
                className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Affiliation Input Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">
            Local Church Affiliation
          </label>
          <input 
            type="text" 
            required
            placeholder="e.g. Hillsong, Every Nation"
            className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
          />
        </div>

        {/* Dynamic Tag Selection Pill Box Array */}
        <div className="pt-1 space-y-2.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-0.5">
            Select Fellowship Focus Tags <span className="font-black text-cyan-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none will-change-transform active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/40 shadow-sm shadow-cyan-400/5'
                      : 'bg-[#030712] text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span>{tag}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[3.5] animate-in fade-in zoom-in-75 duration-150" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Form Trigger Switch */}
        <div className="pt-2">
          <button 
            type="submit"
            disabled={selectedTags.length === 0}
            className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:opacity-30 disabled:text-slate-600 disabled:pointer-events-none text-slate-950 text-xs font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/5 active:scale-[0.99] hover:brightness-[1.03] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" /> 
            <span>Launch My Workspace Feed</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};