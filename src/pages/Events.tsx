import { useState } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiSearch, FiFilter, FiCheckCircle } from 'react-icons/fi';

interface EventItem {
  id: string;
  title: string;
  category: 'rally' | 'prayer' | 'workshop' | 'service';
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  type: 'In-Person' | 'Online Zoom';
  attendees: number;
  image: string;
}

const initialEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Global Youth Intercession Night',
    category: 'prayer',
    categoryLabel: 'Prayer & Worship',
    date: 'Friday, June 26',
    time: '8:00 PM UTC',
    location: 'Global Streaming Hub',
    type: 'Online Zoom',
    attendees: 148,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-2',
    title: 'Regional Youth Leadership Summit',
    category: 'rally',
    categoryLabel: 'Youth Rally',
    date: 'Saturday, July 04',
    time: '10:00 AM - 4:00 PM',
    location: 'Grace Community Center, CPT',
    type: 'In-Person',
    attendees: 85,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-3',
    title: 'Apologetics Workshop: Faith & Science',
    category: 'workshop',
    categoryLabel: 'Theology Seminar',
    date: 'Tuesday, July 07',
    time: '7:30 PM SAST',
    location: 'Interactive Webinar Room 4',
    type: 'Online Zoom',
    attendees: 62,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-4',
    title: 'City Harvest Inner-City Outreach',
    category: 'service',
    categoryLabel: 'Community Service',
    date: 'Saturday, July 11',
    time: '08:30 AM',
    location: 'Downtown Hope Soup Kitchen',
    type: 'In-Person',
    attendees: 34,
    image: 'https://images.unsplash.com/photo-1469571486040-0b9b1743f559?auto=format&fit=crop&w=600&q=80'
  }
];

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'prayer', name: 'Prayer Meets' },
  { id: 'rally', name: 'Rallies' },
  { id: 'workshop', name: 'Workshops' },
  { id: 'service', name: 'Outreach' }
];

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [myScheduleIds, setMyScheduleIds] = useState<string[]>([]);
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  // Toggle internal state and compute real-time attendee offset increments
  const handleToggleRSVP = (eventId: string) => {
    const isRegistered = myScheduleIds.includes(eventId);
    
    if (isRegistered) {
      setMyScheduleIds(prev => prev.filter(id => id !== eventId));
      setEvents(prev => prev.map(evt => evt.id === eventId ? { ...evt, attendees: evt.attendees - 1 } : evt));
    } else {
      setMyScheduleIds(prev => [...prev, eventId]);
      setEvents(prev => prev.map(evt => evt.id === eventId ? { ...evt, attendees: evt.attendees + 1 } : evt));
    }
  };

  // Unified multi-layer data matrix filter routine
  const filteredEvents = events.filter(evt => {
    const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchedule = !showOnlyMine || myScheduleIds.includes(evt.id);
    
    return matchesCategory && matchesSearch && matchesSchedule;
  });

  return (
    <div className="w-full text-white">
      {/* Structural Heading Info Segment */}
      <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight">Kingdom Gatherings</h2>
          <p className="text-xs text-slate-400">Discover and coordinate upcoming conferences, localized service outreaches, and combined prayer networks.</p>
        </div>
        
        {/* Custom state toggle switch widget */}
        <button
          onClick={() => setShowOnlyMine(!showOnlyMine)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showOnlyMine 
              ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]' 
              : 'bg-[#04141f] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {showOnlyMine ? 'Showing My Schedule' : 'View My Schedule'}
        </button>
      </div>

      {/* Control Strip Section: Search field coupled with filter row indicators */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Text input search query framework */}
          <div className="relative md:col-span-2">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search gatherings by title, speaker, or location keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#04141f] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none placeholder:text-slate-500"
            />
          </div>
          
          {/* Responsive list categorization select row helper */}
          <div className="flex items-center gap-2 bg-[#04141f] border border-slate-800 rounded-xl px-3 text-xs text-slate-400">
            <FiFilter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full py-2 font-semibold bg-transparent cursor-pointer focus:outline-none text-slate-300"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-[#04141f] text-slate-300">{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Visual Element Grid Output */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {filteredEvents.map(evt => {
            const isRSVPed = myScheduleIds.includes(evt.id);
            return (
              <div 
                key={evt.id} 
                className="bg-[#04141f] border border-slate-900 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Top Container Section */}
                <div className="relative w-full overflow-hidden aspect-video bg-slate-950">
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    className="object-cover w-full h-full transition-transform duration-500 brightness-90 group-hover:scale-105"
                  />
                  {/* Dynamic Category Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider text-[#00f0ff]">
                    {evt.categoryLabel}
                  </div>
                  {/* Type Format Overlay Badge */}
                  <div className={`absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                    evt.type === 'In-Person' 
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                      : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'
                  }`}>
                    {evt.type}
                  </div>
                </div>

                {/* Information Layout Card Block */}
                <div className="flex flex-col justify-between flex-1 p-5">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-[#00f0ff] transition-colors">
                      {evt.title}
                    </h3>
                    
                    {/* Event metadata matrix rows */}
                    <div className="mb-5 space-y-2">
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                        <FiCalendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                        <FiClock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                        <FiMapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Interactive Footer Card Tray */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-900">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                      <FiUsers className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>{evt.attendees} Attending</span>
                    </div>

                    <button
                      onClick={() => handleToggleRSVP(evt.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isRSVPed
                          ? 'bg-[#00f0ff] text-[#03121a] shadow-md shadow-cyan-500/10'
                          : 'bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {isRSVPed && <FiCheckCircle className="w-3.5 h-3.5" />}
                      <span>{isRSVPed ? 'Going' : 'RSVP'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Fallback Search Array Warning Card */
        <div className="text-center py-20 bg-[#04141f] rounded-2xl border border-slate-900/60 max-w-xl mx-auto">
          <FiCalendar className="w-8 h-8 text-slate-600 mx-auto mb-2.5" />
          <h4 className="mb-1 text-sm font-bold text-slate-200">No gatherings located</h4>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto">Adjust your active filter configurations or clear the search keywords input parameters to look up upcoming items.</p>
        </div>
      )}
    </div>
  );
}