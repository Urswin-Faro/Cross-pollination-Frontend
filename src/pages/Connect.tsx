import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const peerConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default function Connect() {
  const [status, setStatus] = useState<'idle' | 'searching' | 'connected'>('idle');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);

  const myProfileData = {
    name: localStorage.getItem('username') || `User_${Math.floor(Math.random() * 9000 + 1000)}`,
  };

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Socket Effect
  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://cross-pollination-backend.onrender.com';
    const newSocket = io(BACKEND_URL, { transports: ['websocket', 'polling'], withCredentials: true });
    socketRef.current = newSocket;

    newSocket.on('matched', async ({ roomId, peer }) => {
      setCurrentRoom(roomId);
      setStatus('connected');
      setChatLog([{ text: `Connected with ${peer.name}.`, sender: 'System', isMe: false }]);
      await setupWebRTCPeer(roomId, true);
    });

    newSocket.on('receive_message', ({ message, senderName }) => {
      setChatLog((prev) => [...prev, { text: message, sender: senderName, isMe: false }]);
    });

    return () => { newSocket.disconnect(); };
  }, []);

  // 2. Camera Effect
  useEffect(() => {
    async function activateLocalCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch (err) { console.error("Camera access error:", err); }
    }
    activateLocalCamera();
  }, []);

  // 3. Chat scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const setupWebRTCPeer = async (roomId: string, isCaller: boolean) => {
    // ... (Your existing WebRTC setup logic remains here)
  };

  const startSearch = () => {
    setStatus('searching');
    socketRef.current?.emit('join_pool', { userProfile: myProfileData });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentRoom) return;
    socketRef.current?.emit('send_message', { roomId: currentRoom, message: messageText, senderName: myProfileData.name });
    setChatLog((prev) => [...prev, { text: messageText, sender: myProfileData.name, isMe: true }]);
    setMessageText('');
  };

  // --- UI RENDER ---
  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col">
      
      {/* 50/50 VIDEO GRID */}
      <div className="grid flex-1 grid-rows-2 gap-1 p-1 md:grid-rows-1 md:grid-cols-2">
        {/* Remote Video */}
        <div className="relative w-full h-full overflow-hidden border rounded-lg bg-slate-900 border-slate-800">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-2 left-2 text-[10px] bg-black/50 px-2 py-1 rounded text-white font-bold">THEM</div>
        </div>
        
        {/* Local Video */}
        <div className="relative w-full h-full overflow-hidden border rounded-lg bg-slate-900 border-slate-800">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-2 left-2 text-[10px] bg-black/50 px-2 py-1 rounded text-white font-bold">YOU</div>
        </div>
      </div>

      {/* Minecraft-Style Chat Overlay (Kept as requested) */}
      <div className={`absolute bottom-4 left-4 z-20 w-[90vw] md:w-[320px] transition-all duration-300 ${status === 'connected' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[200px]">
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {chatLog.map((msg, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase">{msg.sender}</span>
                <p className="text-xs font-medium text-white drop-shadow-md">{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-2 border-t border-white/10 bg-black/40">
            <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Send a message..." className="flex-1 px-2 py-1 text-xs text-white bg-transparent outline-none" />
            <button type="submit" className="px-3 py-1 bg-cyan-500/80 text-[10px] font-bold text-white rounded-lg active:scale-95">SEND</button>
          </form>
        </div>
      </div>

      {/* Floating Control Button */}
      <div className="absolute z-30 bottom-6 right-6">
         {status === 'idle' ? (
           <button onClick={startSearch} className="px-6 py-3 text-sm font-bold rounded-full shadow-xl bg-cyan-500 animate-pulse">Find Match</button>
         ) : (
           <button onClick={() => window.location.reload()} className="px-6 py-3 text-sm font-bold bg-red-600 rounded-full shadow-xl">Disconnect</button>
         )}
      </div>
    </div>
  );
}