import React, { useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { MapPin, Sparkles, Check } from 'lucide-react';

interface SetupProfileProps {
  onNavigate: (page: string) => void;
}

export const SetupProfile: React.FC<SetupProfileProps> = ({ onNavigate }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const availableTags = ['Worship', 'Bible Study', 'Youth Ministry', 'Missions', 'Apologetics', 'Prayer', 'Discipleship', 'Outreach'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCompleteSetup = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('app'); // Drop user straight down onto layout feed dashboard
  };

  return (
    <AuthLayout title="Setup Your Profile Card" subtitle="Configure your identity parameters to power the matching algorithm tracker framework.">
      <form onSubmit={handleCompleteSetup} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age</label>
            <input 
              type="number" 
              required
              placeholder="22"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-400/40"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
            <input 
              type="text" 
              required
              placeholder="Cape Town, ZA"
              className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-400/40"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Local Church Affiliation</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Hillsong, Every Nation"
            className="w-full bg-[#030712] border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-400/40 transition"
          />
        </div>

        {/* Dynamic Tag Selection Pill Box Array */}
        <div className="pt-1 space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Fellowship Focus Tags <span className="text-cyan-400">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30'
                      : 'bg-[#030712] text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {tag} {isSelected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        <button 
          type="submit"
          disabled={selectedTags.length === 0}
          className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 pt-3 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" /> Launch My Workspace Feed
        </button>
      </form>
    </AuthLayout>
  );
};