import { useState } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiSearch, FiFilter, FiCheckCircle, FiShield } from 'react-icons/fi';

interface EventItem {
  id: string;
  title: string;
  category: 'worship' | 'youth' | 'study' | 'outreach' | 'service';
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  overseership: string;
  type: 'In-Person' | 'Online';
  attendees: number;
  image: string;
}

const overseerships = [
  'All Overseerships',
  'Overseership Peters',
  'Overseership Norman',
  'Overseership Wilcox',
  'Overseership Daniels',
  'Overseership Jacobs',
  'Overseership Hendricks'
];

const initialEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Sunday Divine Service',
    category: 'worship',
    categoryLabel: 'Divine Service',
    date: 'Sunday, July 19',
    time: '09:00 AM',
    location: 'Mitchell\'s Plain Assembly',
    overseership: 'Overseership Peters',
    type: 'In-Person',
    attendees: 320,
    image: 'https://i.pinimg.com/736x/d7/b4/c3/d7b4c3f78fe9cbc7eb8fd77ccfb67f50.jpg'
  },
  {
    id: 'evt-2',
    title: 'Youth Fellowship Gathering',
    category: 'youth',
    categoryLabel: 'Youth Fellowship',
    date: 'Friday, July 24',
    time: '7:00 PM',
    location: 'Khayelitsha Central',
    overseership: 'Overseership Norman',
    type: 'In-Person',
    attendees: 85,
    image: 'https://i.pinimg.com/1200x/36/13/80/361380dbb1c6a5edd538f16f3ae00288.jpg'
  },
  {
    id: 'evt-3',
    title: 'Combined Choir Practice',
    category: 'worship',
    categoryLabel: 'Choir Ministry',
    date: 'Tuesday, July 28',
    time: '6:30 PM',
    location: 'Athlone Main Hall',
    overseership: 'Overseership Wilcox',
    type: 'In-Person',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-4',
    title: 'Community Outreach Program',
    category: 'outreach',
    categoryLabel: 'Evangelism',
    date: 'Saturday, August 01',
    time: '08:30 AM',
    location: 'George Town Center',
    overseership: 'Overseership Daniels',
    type: 'In-Person',
    attendees: 52,
    image: 'https://i.pinimg.com/1200x/35/fd/da/35fdda39acb667e97ccf514832786b1f.jpg'
  }
];

export default function Events() {
  const [events] = useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOverseership, setSelectedOverseership] = useState('All Overseerships');

  const filteredEvents = events.filter(evt => {
    const matchesOverseership = selectedOverseership === 'All Overseerships' || evt.overseership === selectedOverseership;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOverseership && matchesSearch;
  });

  return (
    <div className="w-full text-white min-h-dvh bg-[#030712] pb-12">
      <div className="mb-8">
        <h2 className="mb-1.5 text-2xl font-black tracking-tight">OAC Events Portal</h2>
        <p className="text-xs text-slate-400">View upcoming services and activities by your designated Overseership.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative group lg:col-span-2">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text"
            placeholder="Search events or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#04141f] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 focus:border-[#00f0ff]/50 outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-[#04141f] border border-slate-800 rounded-xl px-3">
          <FiShield className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedOverseership}
            onChange={(e) => setSelectedOverseership(e.target.value)}
            className="w-full py-3 text-xs font-bold bg-transparent cursor-pointer focus:outline-none text-slate-300"
          >
            {overseerships.map(o => <option key={o} value={o} className="bg-[#04141f]">{o}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredEvents.map(evt => (
          <div key={evt.id} className="bg-[#04141f]/70 border border-slate-900 rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative h-40 overflow-hidden">
              <img src={evt.image} alt={evt.title} className="object-cover w-full h-full brightness-[0.8]" />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2 py-1 rounded text-[9px] font-black uppercase text-[#00f0ff]">{evt.categoryLabel}</div>
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-slate-300">{evt.overseership}</div>
            </div>
            <div className="flex-1 p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-100">{evt.title}</h3>
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400"><FiCalendar className="w-3 h-3" /> {evt.date}</div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400"><FiClock className="w-3 h-3" /> {evt.time}</div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400"><FiMapPin className="w-3 h-3" /> {evt.location}</div>
              </div>
              <button className="w-full py-2 text-xs font-bold transition border rounded-lg bg-slate-900 border-slate-800 text-slate-300 hover:text-white">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}