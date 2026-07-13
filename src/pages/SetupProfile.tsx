import React, { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { MapPin, Sparkles, Check } from 'lucide-react';

interface SetupProfileProps {
  onNavigate: (page: string) => void;
}

export const SetupProfile: React.FC<SetupProfileProps> = ({ onNavigate }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const availableTags = [
    'Divine Service', 
    'Youth Fellowship', 
    'Choir Ministry', 
    'Sunday School', 
    'Evangelism', 
    'Prayer Fellowship', 
    'Women\'s Fellowship', 
    'Men\'s Fellowship'
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
    onNavigate('app');
  };

  return (
    <AuthLayout 
      title="Complete Your OAC Profile" 
      subtitle="Configure your membership details to connect with your local assembly and district."
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
              placeholder="25"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">
              Location
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Cape Town, ZA"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
        </div>

        {/* Assembly/Overseership Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">
            Home Assembly / Overseership
          </label>
          <input 
            type="text" 
            required
            placeholder="e.g. Mitchell's Plain Assembly"
            className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-800 focus:outline-none focus:border-cyan-400/50 transition-all"
          />
        </div>

        {/* Fellowship Focus Tags */}
        <div className="pt-1 space-y-2.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-0.5">
            Select Ministry Interests <span className="font-black text-cyan-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/40'
                      : 'bg-[#030712] text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{tag}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[3.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Trigger */}
        <div className="pt-2">
          <button 
            type="submit"
            disabled={selectedTags.length === 0}
            className="flex items-center justify-center w-full gap-2 py-3 text-xs font-black transition-all bg-gradient-to-r from-cyan-400 to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:opacity-30 text-slate-950 rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" /> 
            <span>Complete My Profile</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};