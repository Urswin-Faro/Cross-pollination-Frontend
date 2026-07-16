import { useState } from 'react';
import { FiUser, FiHome, FiAward, FiBookOpen, FiEdit2, FiCheck, FiPlus, FiMessageSquare, FiHeart } from 'react-icons/fi';

interface TestimonyItem {
  id: number;
  date: string;
  update: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  // Personalized Bio for an OAC member
  const [bio, setBio] = useState('Dedicated member of the Old Apostolic Church. Passionate about participating in district choirs, contributing to Bible study fellowships, and supporting our mission of service and faith.');
  const [church, setChurch] = useState('Old Apostolic Church (OAC)');
  const [role, setRole] = useState('Congregation Member / Choir Ministry');
  
  const [gifts, setGifts] = useState(['Intercession', 'Choir Service', 'Teaching', 'Youth Fellowship']);
  const [newGift, setNewGift] = useState('');

  const [testimonies, setTestimonies] = useState<TestimonyItem[]>([
    { id: 1, date: 'July 15, 2026', update: 'Blessed to serve in the District Choir ministry this past Sunday. The message was truly edifying.' },
    { id: 2, date: 'July 01, 2026', update: 'Grateful for the fellowship and warmth at our local Assembly during the midweek service.' }
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
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight">My OAC Fellowship Profile</h2>
        <p className="text-xs text-slate-400">Manage your OAC testimony identity and ministry engagement.</p>
      </div>

      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 text-center shadow-xl">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
              alt="Profile Avatar" 
              className="w-full h-full object-cover rounded-full border-2 border-[#00f0ff] p-1"
            />
          </div>

          <h3 className="text-base font-bold tracking-tight text-white">Urswin Faro</h3>
          <p className="text-[11px] text-[#00f0ff] font-bold uppercase tracking-wider mt-0.5">OAC Member</p>

          <div className="pt-5 mt-5 space-y-4 text-left border-t border-slate-800/60">
            <div>
              <label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                <FiHome className="w-3 h-3 text-slate-500" /> Home Assembly
              </label>
              {isEditing ? (
                <input type="text" value={church} onChange={(e) => setChurch(e.target.value)} className="w-full bg-[#03121a] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 mt-1 focus:border-[#00f0ff] outline-none" />
              ) : (
                <p className="text-xs font-semibold text-slate-200 mt-0.5">{church}</p>
              )}
            </div>

            <div>
              <label className="text-[9px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                <FiAward className="w-3 h-3 text-slate-500" /> Ministry Role
              </label>
              {isEditing ? (
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#03121a] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 mt-1 focus:border-[#00f0ff] outline-none" />
              ) : (
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{role}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full mt-6 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${isEditing ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/40 border-slate-700/50 text-slate-300'}`}
          >
            {isEditing ? <FiCheck className="w-3.5 h-3.5" /> : <FiEdit2 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save Profile' : 'Edit OAC Profile'}</span>
          </button>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-extrabold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FiUser className="w-3.5 h-3.5" /> Biography
            </h4>
            {isEditing ? (
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full bg-[#03121a] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-[#00f0ff] outline-none resize-none" />
            ) : (
              <p className="text-xs font-medium leading-relaxed text-slate-300">"{bio}"</p>
            )}
          </div>

          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FiBookOpen className="w-3.5 h-3.5 text-[#00f0ff]" /> Ministry Gifts
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {gifts.map(gift => (
                <span key={gift} className="text-[10px] font-bold bg-[#051e2e] border border-slate-800/80 text-slate-300 px-3 py-1 rounded-full">✨ {gift}</span>
              ))}
            </div>
            <form onSubmit={handleAddGift} className="flex max-w-xs gap-2">
              <input type="text" placeholder="Add ministry gift..." value={newGift} onChange={(e) => setNewGift(e.target.value)} className="bg-[#03121a] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 flex-1 focus:border-[#00f0ff] outline-none" />
              <button type="submit" className="p-2 bg-slate-800 text-[#00f0ff] rounded-lg transition-colors"><FiPlus className="w-3.5 h-3.5" /></button>
            </form>
          </div>

          <div className="bg-[#04141f] border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiHeart className="w-3.5 h-3.5 text-[#00f0ff]" /> OAC Testimony Feed
            </h4>
            <form onSubmit={handleAddTestimony} className="space-y-2">
              <textarea placeholder="Share your testimony or prayer report..." value={newTestimonyText} onChange={(e) => setNewTestimonyText(e.target.value)} rows={2} className="w-full bg-[#03121a] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-[#00f0ff] outline-none resize-none" />
              <div className="flex justify-end">
                <button type="submit" disabled={!newTestimonyText.trim()} className="px-4 py-1.5 bg-[#00f0ff] text-[#03121a] font-bold text-xs rounded-xl opacity-90 hover:opacity-100 disabled:opacity-40 transition-all flex items-center gap-1">
                  <FiMessageSquare className="w-3 h-3" /> Post Testimony
                </button>
              </div>
            </form>
            <div className="pt-2 space-y-3 border-t border-slate-900">
              {testimonies.map(item => (
                <div key={item.id} className="bg-[#03121a]/60 border border-slate-850 rounded-xl p-3.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-[#00f0ff]" />
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