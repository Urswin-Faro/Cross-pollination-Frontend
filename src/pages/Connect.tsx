import React, { useState, useRef } from 'react';
import { Mic, MicOff, SkipForward, Send } from 'lucide-react';

export default function Connect() {
  const [messageText, setMessageText] = useState('');
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleNext = () => {
    // Add logic to skip the current person
    console.log("Skipping to next match...");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#030712] overflow-hidden">
      
      {/* 1. VIDEO SECTION (Primary Focus) */}
      <div className="relative flex flex-col flex-1 min-h-0 gap-2 p-2 md:flex-row">
        {/* Remote Video */}
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={remoteVideoRef} className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Them</div>
        </div>
        
        {/* Local Video + Controls */}
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={localVideoRef} className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Me</div>
          
          {/* Action Buttons: Floating overlay on the video */}
          <div className="absolute flex gap-2 bottom-4 right-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full border border-slate-700/50 backdrop-blur-md transition-all ${isMuted ? 'bg-red-600' : 'bg-black/60 hover:bg-slate-800'}`}
            >
              {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
            </button>
            <button 
              onClick={handleNext}
              className="p-4 transition-all rounded-full shadow-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. COMPACT CHAT SECTION (Minimized Height) */}
      <div className="h-24 md:h-28 bg-[#0B0F19] border-t border-slate-900/50 flex flex-col px-4 py-2 justify-center">
        {/* Minimal Message List */}
        <div className="flex-1 overflow-y-auto space-y-0.5 mb-1">
          {chatLog.length === 0 && <span className="text-[10px] text-slate-600 italic">Chat...</span>}
          {chatLog.map((msg, idx) => (
            <div key={idx} className="flex gap-2">
              <span className={`text-[10px] font-bold ${msg.isMe ? 'text-cyan-400' : 'text-slate-500'}`}>{msg.sender}:</span>
              <span className="text-xs text-slate-300">{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); setChatLog([...chatLog, { text: messageText, sender: 'Me', isMe: true }]); setMessageText(''); }} 
          className="flex h-8 gap-2"
        >
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 bg-[#030712] border border-slate-800 rounded px-3 py-1 text-xs text-slate-200 outline-none focus:border-cyan-500/50"
            placeholder="Type a message..."
          />
          <button type="submit" className="px-4 text-xs font-bold transition-colors rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
            SEND
          </button>
        </form>
      </div>

    </div>
  );
}