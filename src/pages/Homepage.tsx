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
    <div className="max-w-[1400px] mx-auto pb-16 text-white">
      {/* Top Application Bar */}
      <header className="flex flex-col items-center justify-between gap-4 pb-4 mb-8 border-b sm:flex-row border-slate-800/40">
        <div className="flex items-center gap-1 text-xs font-medium cursor-pointer text-slate-400 hover:text-white">
          <span>Connect & Grow</span>
          <FiChevronDown className="w-3.5 h-3.5" />
        </div>
        <div className="relative w-full sm:max-w-xl">
          <FiSearch className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-slate-400" />
          <input 
            type="search" 
            placeholder="Search believers, events, communities..." 
            className="w-full bg-[#041421] border border-slate-800 rounded-full pl-11 pr-4 py-2 text-xs focus:border-cyan-500 outline-none text-slate-200" 
          />
        </div>
        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          <div className="relative p-2 bg-[#041421] border border-slate-800 rounded-full cursor-pointer">
            <FiBell className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex items-center gap-2 bg-[#041421]/60 border border-slate-800/80 p-1 rounded-full">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" className="object-cover w-8 h-8 rounded-full" alt="User" />
            <FiChevronDown className="text-slate-400 w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* Hero Welcome Card */}
      <section className="mb-10">
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#062636] to-[#041926] border border-slate-800/50 relative overflow-hidden shadow-xl">
          <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> For You — curated by your interests
          </div>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Welcome back, <span className="text-cyan-400">Friend.</span>
          </h2>
          <p className="max-w-xl mb-6 text-sm leading-relaxed text-slate-300">
            Discover believers, join youth events, and grow together. Today there are <span className="font-semibold underline text-cyan-400 underline-offset-4">14 new connections</span> waiting for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-teal-400 text-[#051926] font-bold text-xs rounded-full shadow-lg shadow-cyan-400/10 hover:brightness-110 transition-all">Start Connecting</button>
            <button className="px-5 py-2.5 bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700 font-semibold text-xs rounded-full transition-colors">Explore Events</button>
          </div>
        </div>
      </section>

      {/* Grid: Upcoming Events */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold tracking-tight">Upcoming Events</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="bg-[#092537] border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative overflow-hidden h-44">
                <img src={event.image} alt={event.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full">{event.date}</span>
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full text-slate-300">👥 {event.attendees}</span>
              </div>
              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-semibold mb-1.5">
                    <span>{event.time}</span>
                    <span className="text-slate-600">•</span>
                    <span className="truncate">{event.location}</span>
                  </div>
                  <h4 className="mb-3 text-sm font-bold leading-snug tracking-tight text-white">{event.title}</h4>
                </div>
                <div>
                  <div className="flex items-center gap-2 pt-3 mb-4 text-xs border-t text-slate-400 border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate">{event.host}</span>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-[#051926] font-bold text-xs rounded-xl shadow-md">RSVP</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Suggested Connections */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold tracking-tight">Suggested Connections</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {connections.map(person => (
            <div key={person.name} className="bg-[#092537] border border-slate-800/60 rounded-2xl p-5 text-center flex flex-col justify-between">
              <div>
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <img src={person.image} alt={person.name} className="object-cover w-full h-full rounded-full" />
                  <div className="absolute bottom-0 right-0 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#092537]" />
                </div>
                <h4 className="text-sm font-bold tracking-tight text-white">{person.name}, {person.age}</h4>
                <div className="text-[11px] font-bold text-cyan-400 mb-1">{person.match}% Match</div>
                <p className="text-[11px] text-slate-400 truncate mb-1">{person.location}</p>
                <p className="text-[10px] text-emerald-400 font-medium truncate mb-3">{person.hostChurch}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {person.tags.map(tag => (
                    <span key={tag} className="text-[9px] bg-[#041421] border border-slate-800 px-2 py-0.5 rounded-full text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="py-2 bg-cyan-400 text-[#051926] font-bold text-xs rounded-xl shadow-sm">Connect</button>
                <button className="py-2 text-xs font-semibold border bg-slate-800/50 border-slate-700/40 text-slate-200 rounded-xl">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Featured Communities */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold tracking-tight">Featured Communities</h3>
          <a href="#" className="text-xs font-semibold text-cyan-400 hover:underline">See all →</a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map(group => (
            <div key={group.name} className="bg-[#092537] border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col justify-between group">
              <div className="relative overflow-hidden h-28">
                <img src={group.image} alt={group.name} className="object-cover w-full h-full" />
                <span className="absolute top-2 right-2 bg-slate-900/80 text-[9px] font-bold px-2 py-0.5 rounded-full text-cyan-400 uppercase tracking-wider">{group.tag}</span>
              </div>
              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h4 className="mb-1 text-xs font-bold text-white truncate">{group.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">{group.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                  <span className="text-[10px] text-slate-500 font-medium">👥 {group.members}</span>
                  <button className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 text-white font-bold text-[10px] rounded-lg hover:bg-cyan-400 hover:text-[#051926]">Join</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}