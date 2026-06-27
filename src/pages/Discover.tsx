import { useState } from 'react';
import { FiSearch, FiSliders, FiMapPin, FiBookOpen, FiActivity, FiMessageSquare, FiUserPlus } from 'react-icons/fi';

// Premium Mock Data for Believers matching the architecture specifications
const mockBelievers = [
  {
    id: 1,
    name: "Sarah Mokoena",
    age: 22,
    church: "Hillsong Cape Town",
    location: { country: "South Africa", province: "Western Cape", city: "Cape Town", area: "Mitchell's Plain" },
    ministry: "Youth Worship Leader",
    interests: ["Worship Music", "Vocal Training", "Discipleship"],
    verse: "Psalm 119:105",
    testimony: "Grew up in the church but truly found my identity in Christ during a youth camp in 2022. Now passionate about leading the next generation into true worship.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Daniel Petersen",
    age: 24,
    church: "His People Church",
    location: { country: "South Africa", province: "Western Cape", city: "Cape Town", area: "Eerste River" },
    ministry: "Apologetics Coordinator",
    interests: ["Theology", "Coffee Culture", "Street Outreach"],
    verse: "1 Peter 3:15",
    testimony: "Challenged by secular worldviews in college, which led me deeper into defending the structural truth of the Gospel. Now helping youth answer tough questions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Elijah Ndlovu",
    age: 23,
    church: "Every Nation",
    location: { country: "South Africa", province: "Western Cape", city: "Cape Town", area: "Atlantis" },
    ministry: "Media & Tech Team",
    interests: ["Photography", "Video Editing", "Short-term Missions"],
    verse: "Matthew 28:19",
    testimony: "Using my passion for digital media to document what God is doing across local communities and cross-border mission fields.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    name: "Amara Okafor",
    age: 21,
    church: "Redeemed Christian Church of God",
    location: { country: "Nigeria", province: "Lagos", city: "Lagos Island", area: "Ikoyi" },
    ministry: "Prayer Ministry Intercessor",
    interests: ["Intercessory Prayer", "Bible Study Daily", "Children's Church"],
    verse: "Philippians 4:6-7",
    testimony: "Experienced a miraculous physical healing as a teenager which anchored my absolute faith in the power of persistent, community-wide prayer.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  }
];

const categories = {
  ministries: ["All", "Youth Worship Leader", "Apologetics Coordinator", "Media & Tech Team", "Prayer Ministry Intercessor"],
  areas: ["All", "Mitchell's Plain", "Eerste River", "Atlantis", "Ikoyi"]
};

export default function Discover() {
  const [selectedMinistry, setSelectedMinistry] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredBelievers = mockBelievers.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          person.church.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinistry = selectedMinistry === "All" || person.ministry === selectedMinistry;
    const matchesArea = selectedArea === "All" || person.location.area === selectedArea;
    return matchesSearch && matchesMinistry && matchesArea;
  });

  return (
    <div className="w-full text-white">
      {/* Search Header Banner */}
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight">Discover Believers</h2>
        <p className="text-xs text-slate-400">Find fellowship, ministry partners, and global peer networks.</p>
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        {/* Left Side Filter controls */}
        <aside className="w-full lg:w-64 bg-[#04141f] border border-slate-800/80 rounded-2xl p-5 shrink-0">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/60 text-xs font-bold uppercase tracking-wider text-[#00f0ff]">
            <FiSliders className="w-3.5 h-3.5" />
            <span>Search Filters</span>
          </div>

          {/* Name/Church Search input */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Keyword Search</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Name or church..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#03121a] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
              />
            </div>
          </div>

          {/* Hierarchical Location Selector - Area level mock */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Location / Area</label>
            <select 
              value={selectedArea} 
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-[#03121a] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:border-[#00f0ff] focus:outline-none cursor-pointer"
            >
              {categories.areas.map(area => (
                <option key={area} value={area} className="bg-[#04141f]">{area}</option>
              ))}
            </select>
          </div>

          {/* Ministry Involvement Selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Ministry Role</label>
            <div className="space-y-1">
              {categories.ministries.map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedMinistry(role)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all block truncate ${
                    selectedMinistry === role 
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-l-2 border-[#00f0ff]' 
                      : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side Cards Grid */}
        <div className="flex-1 w-full">
          {filteredBelievers.length === 0 ? (
            <div className="text-center p-12 bg-[#04141f] rounded-2xl border border-slate-800/60">
              <p className="text-sm text-slate-400">No believers found matching those criteria.</p>
              <button onClick={() => { setSelectedMinistry("All"); setSelectedArea("All"); setSearchQuery(""); }} className="mt-3 text-xs text-[#00f0ff] font-bold underline">Reset Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredBelievers.map(person => (
                <div key={person.id} className="bg-[#051e2e] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
                  
                  {/* Top Block: Profile Basics */}
                  <div className="flex items-start gap-4 mb-4">
                    <img src={person.image} alt={person.name} className="object-cover w-16 h-16 rounded-full ring-2 ring-slate-800 shrink-0" />
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 text-sm font-bold tracking-tight text-white">
                        {person.name}, <span className="font-medium text-slate-400">{person.age}</span>
                      </h3>
                      <p className="text-[11px] text-emerald-400 font-semibold truncate flex items-center gap-1 mt-0.5">
                        <FiActivity className="w-3 h-3 shrink-0" /> {person.ministry}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-1 flex items-center gap-1">
                        <FiMapPin className="w-3 h-3 text-[#00f0ff] shrink-0" /> {person.location.area}, {person.location.city}
                      </p>
                    </div>
                  </div>

                  {/* Testimony Segment */}
                  <div className="bg-[#03121a]/60 rounded-xl p-3 mb-4 border border-slate-900">
                    <h4 className="text-[9px] font-bold tracking-wider text-[#00f0ff] uppercase mb-1 flex items-center gap-1">
                      <FiBookOpen className="w-2.5 h-2.5" /> Favorite Verse: {person.verse}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 italic">
                      "{person.testimony}"
                    </p>
                  </div>

                  {/* Intersecting Tags & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                    <div className="flex flex-wrap gap-1">
                      {person.interests.map(interest => (
                        <span key={interest} className="text-[9px] bg-[#041421] border border-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-medium">{interest}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-1.5 ml-auto">
                      <button className="p-2 transition-colors border cursor-pointer bg-slate-800/60 border-slate-700/60 rounded-xl text-slate-300 hover:text-white">
                        <FiMessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button className="px-3 py-1.5 bg-[#00f0ff] text-[#03121a] font-bold text-xs rounded-xl flex items-center gap-1 hover:brightness-105 transition-all cursor-pointer">
                        <FiUserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}