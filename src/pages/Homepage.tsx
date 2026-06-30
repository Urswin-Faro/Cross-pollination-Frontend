import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';

const events = [
  { id: 1, date: 'Fri, Jun 26', attendees: 248, time: '7:00 PM', location: 'Promenade, Mitchell\'s Plain', title: 'Worship Night Under The Stars', host: 'Hillsong Cape Town', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80' },
  { id: 2, date: 'Sat, Jul 04', attendees: 512, time: '10:00 AM', location: 'Atlantis Community Hall', title: 'Rooted 2026', host: 'Every Nation', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
  { id: 3, date: 'Sun, Jul 12', attendees: 180, time: '6:00 PM', location: 'Eerste River Auditorium', title: 'Prayer & Worship Encounter', host: 'His People Church', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' },
];

const connections = [
  { name: 'Sarah Mokoena', age: 22, match: 96, location: 'Mitchell\'s Plain, Cape Town', hostChurch: 'Hillsong Cape Town', tags: ['Worship', 'Bible Study', 'Youth Ministry'], image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { name: 'Daniel Petersen', age: 24, match: 92, location: 'Eerste River, Cape Town', hostChurch: 'His People Church', tags: ['Missions', 'Apologetics', 'Coffee'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Amara Okafor', age: 21, match: 89, location: 'Lagos', hostChurch: 'RCCG', tags: ['Prayer', 'Worship', 'Discipleship'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
  { name: 'Joshua Williams', age: 23, match: 87, location: 'Atlantis, Cape Town', hostChurch: 'Every Nation', tags: ['Music', 'Youth Ministry', 'Outreach'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
];

const communities = [
  { name: 'Cape Town Youth Worship', desc: 'Worshippers across the Mother City uniting in song.', members: '1,240 members', tag: 'Worship', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Apologetics Africa', desc: 'Defending the faith with grace and reason.', members: '832 members', tag: 'Apologetics', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Missions World', desc: 'Global missionaries connecting and sending.', members: '2,104 members', tag: 'Missions', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bible Study Daily', desc: 'Daily devotionals and deep dives into Scripture.', members: '5,612 members', tag: 'Study', image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab90?auto=format&fit=crop&w=400&q=80' },
];

export default function Homepage() {
  return (
    /* FIXED: Added lateral layout padding 'px-4 sm:px-6 lg:px-8' so content doesn't scrape small screen borders */
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white min-h-dvh bg-[#030712]">
      
      {/* Top Application Bar */}
      {/* FIXED: Improved search alignment, space preservation, and stacking orders across screen factors */}
      <header className="flex flex-col gap-4 pt-4 pb-4 mb-8 border-b sm:flex-row sm:items-center sm:justify-between border-slate-900">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase cursor-pointer text-slate-400 hover:text-white">
            <span>Connect & Grow</span>
            <FiChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          
          {/* Mobile Profile Display Shortcuts (Hidden on monitors) */}
          <div className="flex items-center gap-3 sm:hidden">
            <div className="relative p-2 bg-[#041421] border border-slate-800 rounded-full cursor-pointer">
              <FiBell className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div className="flex items-center gap-1.5 bg-[#041421]/60 border border-slate-800/80 p-1 rounded-full">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" className="object-cover w-6 h-6 rounded-full" alt="User" />
            </div>
          </div>
        </div>

        {/* Centralised Search Engine Input */}
        <div className="relative w-full sm:max-w-md md:max-w-xl">
          <FiSearch className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-slate-500" />
          <input 
            type="search" 
            placeholder="Search believers, events, communities..." 
            className="w-full bg-[#041421] border border-slate-800/80 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:border-cyan-400/50 outline-none text-slate-200 placeholder-slate-600 transition-all" 
          />
        </div>

        {/* Desktop Profile Display Actions Block */}
        <div className="items-center hidden gap-4 sm:flex">
          <div className="relative p-2 bg-[#041421] border border-slate-800 rounded-full cursor-pointer hover:border-slate-700 transition">
            <FiBell className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex items-center gap-2 bg-[#041421]/60 border border-slate-800/80 p-1 rounded-full cursor-pointer hover:border-slate-700 transition">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" className="object-cover rounded-full w-7 h-7" alt="User" />
            <FiChevronDown className="text-slate-500 w-3.5 h-3.5 pr-1" />
          </div>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <section className="mb-10">
        <div className="p-6 md:p-10 rounded-2xl bg-gradient-to-br from-[#062636]/40 to-[#041926]/40 border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.03),transparent_40%)]" />
          
          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> For You — curated by your interests
          </div>
          <h2 className="relative z-10 mb-3 text-2xl font-black tracking-tight md:text-4xl">
            Welcome back, <span className="text-cyan-400">Friend.</span>
          </h2>
          <p className="relative z-10 max-w-xl mb-6 text-xs leading-relaxed md:text-sm text-slate-400">
            Discover believers, join youth events, and grow together. Today there are <span className="font-semibold underline text-cyan-400 underline-offset-4">14 new connections</span> waiting for you.
          </p>
          <div className="relative z-10 flex flex-col gap-3 xs:flex-row">
            <button className="w-full xs:w-auto px-5 py-2.5 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-400/5 hover:bg-cyan-300 transition-all text-center">Start Connecting</button>
            <button className="w-full xs:w-auto px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 font-semibold text-xs rounded-xl transition text-center text-slate-300">Explore Events</button>
          </div>
        </div>
      </section>

      {/* Grid: Upcoming Events */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Upcoming Events</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="flex flex-col overflow-hidden border bg-slate-950 border-slate-900 rounded-2xl group">
              <div className="relative h-40 overflow-hidden md:h-44 shrink-0">
                <img src={event.image} alt={event.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-md border border-slate-800">{event.date.toUpperCase()}</span>
                <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-[9px] font-bold px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">👥 {event.attendees}</span>
              </div>
              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold uppercase tracking-wide mb-2">
                    <span>{event.time}</span>
                    <span className="text-slate-700">•</span>
                    <span className="truncate max-w-[180px]">{event.location}</span>
                  </div>
                  <h4 className="mb-4 text-sm font-bold leading-snug tracking-wide transition text-slate-200 group-hover:text-cyan-400">{event.title}</h4>
                </div>
                <div>
                  <div className="flex items-center gap-2 pt-3 mb-4 text-xs border-t text-slate-500 border-slate-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-medium truncate">{event.host}</span>
                  </div>
                  <button className="w-full py-2.5 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-400 hover:to-teal-400 text-cyan-400 hover:text-slate-950 border border-cyan-500/20 hover:border-transparent font-bold text-xs rounded-xl transition-all shadow-md">RSVP</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Suggested Connections */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Suggested Connections</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        {/* FIXED: Configured layout fluidly from single column to double on small screens, up to 4 on desktop */}
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {connections.map(person => (
            <div key={person.name} className="flex flex-col justify-between p-5 text-center border bg-slate-950 border-slate-900 rounded-2xl">
              <div>
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img src={person.image} alt={person.name} className="object-cover w-full h-full border rounded-full border-slate-800" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full bg-emerald-500 border-slate-950" />
                </div>
                <h4 className="text-xs font-bold tracking-wide md:text-sm text-slate-200">{person.name}, {person.age}</h4>
                <div className="text-[10px] font-bold text-cyan-400 mb-1">{person.match}% Match</div>
                <p className="text-[10px] text-slate-500 truncate mb-1">{person.location}</p>
                <p className="text-[10px] text-emerald-500 font-semibold truncate mb-3">{person.hostChurch}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4 max-h-[44px] overflow-hidden">
                  {person.tags.map(tag => (
                    <span key={tag} className="text-[9px] bg-slate-900 border border-slate-800/60 px-2 py-0.5 rounded-md text-slate-400">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 shrink-0">
                <button className="py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] rounded-xl transition shadow-sm">Connect</button>
                <button className="py-2 text-[11px] font-semibold border bg-slate-900 border-slate-800 text-slate-400 rounded-xl hover:text-slate-200 transition">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Featured Communities */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Featured Communities</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {communities.map(group => (
            <div key={group.name} className="flex flex-col justify-between overflow-hidden border bg-slate-950 border-slate-900 rounded-2xl group">
              <div className="relative h-24 overflow-hidden shrink-0">
                <img src={group.image} alt={group.name} className="object-cover object-center w-full h-full" />
                <span className="absolute top-2 right-2 bg-slate-950/90 text-[8px] font-bold px-2 py-0.5 rounded-md text-cyan-400 border border-slate-800 uppercase tracking-wider">{group.tag}</span>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h4 className="mb-1 text-xs font-bold truncate transition text-slate-200 group-hover:text-cyan-400">{group.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-normal mb-4">{group.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 font-medium">👥 {group.members.split(' ')[0]}</span>
                  <button className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-[10px] rounded-lg hover:bg-cyan-400 hover:text-slate-950 hover:border-transparent transition">Join</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}