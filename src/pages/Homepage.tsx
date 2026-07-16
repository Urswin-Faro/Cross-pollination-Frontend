import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';

const events = [
  { id: 1, date: 'Sun, Jul 19', attendees: 320, time: '9:00 AM', location: 'Mitchell\'s Plain Assembly', title: 'Sunday Divine Service', host: 'Cape Town District', image: 'https://i.pinimg.com/736x/d7/b4/c3/d7b4c3f78fe9cbc7eb8fd77ccfb67f50.jpg' },
  { id: 2, date: 'Wed, Jul 22', attendees: 85, time: '7:30 PM', location: 'Khayelitsha Central', title: 'Bible Study & Fellowship', host: 'Khayelitsha Assembly', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80' },
  { id: 3, date: 'Sat, Jul 25', attendees: 145, time: '2:00 PM', location: 'Paarl Town Hall', title: 'District Youth Fellowship', host: 'Boland District', image: 'https://i.pinimg.com/1200x/36/13/80/361380dbb1c6a5edd538f16f3ae00288.jpg' },
];

const ministries = [
  { name: 'Band', desc: 'Providing instrumental accompaniment for divine services.', members: '45 members', tag: 'Music', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80' },
  { name: 'Male Voice Choir', desc: 'A dedicated ensemble for tenor, baritone, and bass.', members: '60 members', tag: 'Choir', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80' },
  { name: 'Female Voice Choir', desc: 'Harmonizing voices in praise and worship.', members: '65 members', tag: 'Choir', image: 'https://i.pinimg.com/1200x/7f/19/80/7f19801cbd1b994465d6533653b0cb9b.jpg' },
  { name: 'Community Choir', desc: 'Bringing members together to lift our voices in unity.', members: '120 members', tag: 'Choir', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bible Study', desc: 'Deepening our understanding of the Holy Scriptures.', members: '200 members', tag: 'Teaching', image: 'https://i.pinimg.com/1200x/f1/f0/17/f1f01753f5f8d65795b8ebf54e323d93.jpg' },
  { name: 'Drama Club', desc: 'Expressing faith through theatrical performance.', members: '30 members', tag: 'Creative', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' },
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
        </div>
        <div className="relative w-full sm:max-w-md md:max-w-xl">
          <FiSearch className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-slate-500" />
          <input type="search" placeholder="Search..." className="w-full bg-[#041421] border border-slate-800/80 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:border-cyan-400/50 outline-none text-slate-200 placeholder-slate-600 transition-all" />
        </div>
      </header>

      <section className="mb-10">
        <div className="p-6 md:p-10 rounded-2xl bg-gradient-to-br from-[#062636]/40 to-[#041926]/40 border border-slate-900 relative overflow-hidden shadow-xl">
          <h2 className="relative z-10 mb-3 text-2xl font-black tracking-tight md:text-4xl">In Unity, <span className="text-cyan-400">We Grow.</span></h2>
          <p className="relative z-10 max-w-xl mb-6 text-xs text-slate-400">Keep updated with district events, participate in ministry outreach, and strengthen your fellowship.</p>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="mb-5 text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Upcoming Events</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="flex flex-col overflow-hidden border bg-slate-950 border-slate-900 rounded-2xl group">
              <div className="relative h-40 overflow-hidden md:h-44 shrink-0">
                <img src={event.image} alt={event.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-md border border-slate-800">{event.date.toUpperCase()}</span>
              </div>
              <div className="p-5">
                <h4 className="mb-1 text-sm font-bold text-slate-200">{event.title}</h4>
                {/* Location added here */}
                <p className="mb-4 text-[11px] text-cyan-400 font-medium uppercase tracking-wide">{event.location}</p>
                <button className="w-full py-2 text-xs font-bold transition border bg-slate-900 border-slate-800 rounded-xl hover:border-cyan-400/50">RSVP</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-sm font-bold tracking-wider uppercase md:text-base text-slate-300">Church Ministries</h3>
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {ministries.map(group => (
            <div key={group.name} className="flex flex-col overflow-hidden border bg-slate-950 border-slate-900 rounded-2xl">
              <div className="relative h-24 overflow-hidden">
                <img src={group.image} alt={group.name} className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col justify-between flex-1 p-4">
                <h4 className="mb-1 text-xs font-bold text-slate-200">{group.name}</h4>
                <span className="text-[10px] text-slate-500 mb-3">{group.members}</span>
                <button className="px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] rounded-lg hover:bg-cyan-400 hover:text-slate-950 transition">Join</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}