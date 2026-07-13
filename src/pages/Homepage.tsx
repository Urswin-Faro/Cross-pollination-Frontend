import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';

const events = [
  { id: 1, date: 'Sun, Jul 19', attendees: 320, time: '9:00 AM', location: 'Mitchell\'s Plain Assembly', title: 'Sunday Divine Service', host: 'Cape Town District', image: 'https://images.unsplash.com/photo-1548695886-559d288d4474?auto=format&fit=crop&w=600&q=80' },
  { id: 2, date: 'Wed, Jul 22', attendees: 85, time: '7:30 PM', location: 'Khayelitsha Central', title: 'Bible Study & Fellowship', host: 'Khayelitsha Assembly', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80' },
  { id: 3, date: 'Sat, Jul 25', attendees: 145, time: '2:00 PM', location: 'Paarl Town Hall', title: 'District Youth Fellowship', host: 'Boland District', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80' },
];

const connections = [
  { name: 'Thabo Dlamini', age: 25, match: 96, location: 'Johannesburg, Gauteng', hostChurch: 'Soweto Assembly', tags: ['Youth', 'Choir', 'Evangelism'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Elize Botha', age: 29, match: 92, location: 'Bloemfontein, FS', hostChurch: 'Willows Assembly', tags: ['Sunday School', 'Prayer', 'Teaching'], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sipho Nkosi', age: 23, match: 89, location: 'Durban, KZN', hostChurch: 'Durban North Assembly', tags: ['Choir', 'Music', 'Outreach'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Nomsa Mbeki', age: 27, match: 87, location: 'Gqeberha, EC', hostChurch: 'Walmer Assembly', tags: ['Women\'s Fellowship', 'Prayer'], image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
];

const ministries = [
  { name: 'Youth Fellowship', desc: 'Connecting young souls through faith and service.', members: '450 members', tag: 'Youth', image: 'https://images.unsplash.com/photo-1511632765406-a2292305e504?auto=format&fit=crop&w=400&q=80' },
  { name: 'Choir Ministry', desc: 'Lifting voices in praise during Divine Services.', members: '210 members', tag: 'Choir', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sunday School Teachers', desc: 'Guiding our children on the path of righteousness.', members: '125 members', tag: 'Teaching', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Prayer Fellowship', desc: 'United intercession for our brothers and sisters.', members: '890 members', tag: 'Prayer', image: 'https://images.unsplash.com/photo-1543966888-7c1dc482a810?auto=format&fit=crop&w=400&q=80' },
];

export default function Homepage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white min-h-dvh bg-[#030712]">
      
      <header className="flex flex-col gap-4 pt-4 pb-4 mb-8 border-b sm:flex-row sm:items-center sm:justify-between border-slate-900">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase cursor-pointer text-slate-400 hover:text-white">
            <span>OAC Portal</span>
            <FiChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-center gap-3 sm:hidden">
            <div className="relative p-2 bg-[#041421] border border-slate-800 rounded-full cursor-pointer">
              <FiBell className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </div>

        <div className="relative w-full sm:max-w-md md:max-w-xl">
          <FiSearch className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-slate-500" />
          <input 
            type="search" 
            placeholder="Search assemblies, ministries, and events..." 
            className="w-full bg-[#041421] border border-slate-800/80 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:border-cyan-400/50 outline-none text-slate-200 placeholder-slate-600 transition-all" 
          />
        </div>

        <div className="items-center hidden gap-4 sm:flex">
          <div className="relative p-2 bg-[#041421] border border-slate-800 rounded-full cursor-pointer hover:border-slate-700 transition">
            <FiBell className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </header>

      <section className="mb-10">
        <div className="p-6 md:p-10 rounded-2xl bg-gradient-to-br from-[#062636]/40 to-[#041926]/40 border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.03),transparent_40%)]" />
          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Welcome to the OAC Digital Community
          </div>
          <h2 className="relative z-10 mb-3 text-2xl font-black tracking-tight md:text-4xl">
            In Unity, <span className="text-cyan-400">We Grow.</span>
          </h2>
          <p className="relative z-10 max-w-xl mb-6 text-xs leading-relaxed md:text-sm text-slate-400">
            Keep updated with district events, participate in ministry outreach, and strengthen your fellowship with fellow members.
          </p>
          <div className="relative z-10 flex flex-col gap-3 xs:flex-row">
            <button className="w-full xs:w-auto px-5 py-2.5 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-400/5 hover:bg-cyan-300 transition-all text-center">My Assembly</button>
            <button className="w-full xs:w-auto px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 font-semibold text-xs rounded-xl transition text-center text-slate-300">View Calendar</button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Upcoming Events</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="flex flex-col overflow-hidden border bg-slate-950 border-slate-900 rounded-2xl group">
              <div className="relative h-40 overflow-hidden md:h-44 shrink-0">
                <img src={event.image} alt={event.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-md border border-slate-800">{event.date.toUpperCase()}</span>
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
                    <span className="font-medium truncate">{event.host}</span>
                  </div>
                  <button className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 font-bold text-xs rounded-xl transition-all">RSVP</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Church Ministries</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {ministries.map(group => (
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
                  <span className="text-[10px] text-slate-500 font-medium">{group.members}</span>
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