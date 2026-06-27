import { useState } from 'react';
import { FiUser, FiHome, FiAward, FiBookOpen, FiEdit2, FiCheck, FiPlus, FiMessageSquare, FiHeart } from 'react-icons/fi';

interface TestimonyItem {
  id: number;
  date: string;
  update: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Passionate about mobilizing campus student ministries and organizing inter-collegiate worship nights. Currently studying theology with a focus on urban youth evangelism structures.');
  const [church, setChurch] = useState('Hillsong Church, Cape Town');
  const [role, setRole] = useState('Youth Ministry Leader / Vocalist');
  
  const [gifts, setGifts] = useState(['Intercession', 'Teaching', 'Exhortation', 'Worship Leadership']);
  const [newGift, setNewGift] = useState('');

  const [testimonies, setTestimonies] = useState<TestimonyItem[]>([
    { id: 1, date: 'June 14, 2026', update: 'Praising God for an incredible turnout at our campus revival night! 45 students gathered for worship and prayer.' },
    { id: 2, date: 'May 28, 2026', update: 'Successfully launched our new weekly small group accountability structures for local young adults.' }
  ]);
  const [newTestimonyText, setNewTestimonyText] = useState('');

  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGift.trim()) return;
    if (!gifts.includes(newGift.trim())) {
      setGifts([...gifts, newGift.trim()]);
    }
    setNewGift('');
  };

  const handleAddTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonyText.trim()) return;

    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const freshItem: TestimonyItem = {
      id: Date.now(),
      date: today,
      update: newTestimonyText.trim()
    };

    setTestimonies([freshItem, ...testimonies]);
    setNewTestimonyText('');
  };

  return (
    <div className="w-full text-white">
      {/* Page Heading banner */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight">My Fellowship Profile</h2>
        <p className="text-xs text-slate-400">Manage your digital testimony identity, home church affiliations, and spiritual gifts inventory.</p>
      </div>

      {/* Main Responsive Grid Layout Assembly */}
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Column Profile Identity Card Frame */}
        <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 text-center shadow-xl">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
              alt="Profile Avatar" 
              className="w-full h-full object-cover rounded-full border-2 border-[#00f0ff] p-1"
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-[#04141f]" title="Active Now" />
          </div>

          <h3 className="text-base font-bold tracking-tight text-white">Elijah Ndlovu</h3>
          <p className="text-[11px] text-[#00f0ff] font-bold uppercase tracking-wider mt-0.5">Verified Believer</p>

          <div className="pt-5 mt-5 space-y-4 text-left border-t border-slate-800/60">
            <div>
              <label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                <FiHome className="w-3 h-3 text-slate-500" /> Home Church Base
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={church} 
                  onChange={(e) => setChurch(e.target.value)}
                  className="w-full bg-[#03121a] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 mt-1 focus:border-[#00f0ff] focus:outline-none"
                />
              ) : (
                <p className="text-xs font-semibold text-slate-200 mt-0.5">{church}</p>
              )}
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                <FiAward className="w-3 h-3 text-slate-500" /> Ministry Engagement
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#03121a] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 mt-1 focus:border-[#00f0ff] focus:outline-none"
                />
              ) : (
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{role}</p>
              )}
            </div>
          </div>

          {/* Action Trigger Box */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full mt-6 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              isEditing 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isEditing ? <FiCheck className="w-3.5 h-3.5" /> : <FiEdit2 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save Profile Changes' : 'Edit Profile Setup'}</span>
          </button>
        </div>

        {/* Right Column Core Faith Details Workspace (Takes 2 Columns) */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Section A: Biography About Statement */}
          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-extrabold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FiUser className="w-3.5 h-3.5" /> My Bio & Mission Call
            </h4>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-[#03121a] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none resize-none leading-relaxed"
              />
            ) : (
              <p className="text-xs font-medium leading-relaxed text-slate-300">
                "{bio}"
              </p>
            )}
          </div>

          {/* Section B: Spiritual Giftings Tag Module */}
          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FiBookOpen className="w-3.5 h-3.5 text-[#00f0ff]" /> Spiritual Gifts Profile
            </h4>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {gifts.map(gift => (
                <span key={gift} className="text-[10px] font-bold bg-[#051e2e] border border-slate-800/80 text-slate-300 px-3 py-1 rounded-full shadow-inner">
                  ✨ {gift}
                </span>
              ))}
            </div>

            {/* Interactive add-gift text trigger line inline form block */}
            <form onSubmit={handleAddGift} className="flex max-w-xs gap-2">
              <input 
                type="text" 
                placeholder="Add signature gift item..."
                value={newGift}
                onChange={(e) => setNewGift(e.target.value)}
                className="bg-[#03121a] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 flex-1 focus:border-[#00f0ff] focus:outline-none placeholder:text-slate-600"
              />
              <button type="submit" className="p-2 bg-slate-800 hover:bg-slate-700 text-[#00f0ff] rounded-lg transition-colors cursor-pointer shrink-0">
                <FiPlus className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Section C: Testimony Feed Micro-Blog Logging Container */}
          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiHeart className="w-3.5 h-3.5 text-[#00f0ff]" /> Live Praise & Testimony Feed
            </h4>

            {/* Interactive Testimony Logging Input Stream Panel */}
            <form onSubmit={handleAddTestimony} className="space-y-2">
              <textarea 
                placeholder="Share a recent breakthrough, prayer answer, or encouragement story..."
                value={newTestimonyText}
                onChange={(e) => setNewTestimonyText(e.target.value)}
                rows={2}
                className="w-full bg-[#03121a] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none resize-none leading-relaxed placeholder:text-slate-600"
              />
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={!newTestimonyText.trim()}
                  className="px-4 py-1.5 bg-[#00f0ff] text-[#03121a] font-bold text-xs rounded-xl hover:brightness-105 disabled:opacity-40 disabled:hover:brightness-100 transition-all cursor-pointer flex items-center gap-1"
                >
                  <FiMessageSquare className="w-3 h-3" /> Post Testimony
                </button>
              </div>
            </form>

            {/* Render loop displaying appended breakthroughs items cards list stack */}
            <div className="pt-2 space-y-3 border-t border-slate-900">
              {testimonies.map(item => (
                <div key={item.id} className="bg-[#03121a]/60 border border-slate-850 rounded-xl p-3.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-[#00f0ff] to-[#00b4d8]" />
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">{item.date}</span>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-300">{item.update}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}