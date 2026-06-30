import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Mic, MicOff, SkipForward, Send } from 'lucide-react';

const peerConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default function Connect() {
  const [status, setStatus] = useState<'idle' | 'searching' | 'connected'>('idle');
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // 1. Initialize Socket
  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://cross-pollination-backend.onrender.com';
    socketRef.current = io(BACKEND_URL);

    socketRef.current.on('matched', async ({ roomId, peer }) => {
      setStatus('connected');
      setChatLog([{ text: `Connected to ${peer.name}`, sender: 'System', isMe: false }]);
      setupWebRTC(roomId, true);
    });

    socketRef.current.on('video_offer', async ({ roomId, sdp }) => {
      setupWebRTC(roomId, false);
      await pcRef.current?.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pcRef.current?.createAnswer();
      await pcRef.current?.setLocalDescription(answer!);
      socketRef.current?.emit('video_answer', { roomId, sdp: answer });
    });

    socketRef.current.on('video_answer', async ({ sdp }) => {
      await pcRef.current?.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socketRef.current.on('ice_candidate', async ({ candidate }) => {
      await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socketRef.current.on('receive_message', ({ message, senderName }) => {
      setChatLog(prev => [...prev, { text: message, sender: senderName, isMe: false }]);
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  // 2. Camera Setup
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      });
  }, []);

  // 3. WebRTC Logic
  const setupWebRTC = (roomId: string, isCaller: boolean) => {
    const pc = new RTCPeerConnection(peerConfiguration);
    pcRef.current = pc;

    localStreamRef.current?.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) socketRef.current?.emit('ice_candidate', { roomId, candidate: event.candidate });
    };

    if (isCaller) {
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer);
        socketRef.current?.emit('video_offer', { roomId, sdp: offer });
      });
    }
  };

  const startSearch = () => {
    setStatus('searching');
    socketRef.current?.emit('join_pool', { userProfile: { name: "User" } });
  };

  const handleSkip = () => {
    pcRef.current?.close();
    socketRef.current?.emit('leave_room');
    setChatLog([]);
    startSearch();
  };

  const toggleMute = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (track) { track.enabled = !track.enabled; setIsMuted(!track.enabled); }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#030712] overflow-hidden relative">
      
      {/* Overlay */}
      {status === 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 backdrop-blur-sm">
          <button onClick={startSearch} className="px-8 py-4 text-lg font-black rounded-full bg-cyan-500 text-slate-950 animate-pulse">Find Match</button>
        </div>
      )}

      {/* Video */}
      <div className="relative flex flex-col flex-1 min-h-0 gap-2 p-2 md:flex-row">
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Them</div>
        </div>
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Me</div>
          
          <div className="absolute flex gap-2 bottom-4 right-4">
            <button onClick={toggleMute} className={`p-4 rounded-full border border-slate-700/50 backdrop-blur-md ${isMuted ? 'bg-red-600' : 'bg-black/60'}`}>
              {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
            </button>
            <button onClick={handleSkip} className="p-4 rounded-full shadow-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Footer */}
      <div className="h-24 md:h-28 bg-[#0B0F19] border-t border-slate-900/50 flex flex-col px-4 py-2 justify-center shrink-0">
        <div className="flex-1 overflow-y-auto space-y-0.5 mb-1">
          {chatLog.map((msg, idx) => (
            <div key={idx} className="flex gap-2">
              <span className={`text-[10px] font-bold ${msg.isMe ? 'text-cyan-400' : 'text-slate-500'}`}>{msg.sender}:</span>
              <span className="text-xs text-slate-300">{msg.text}</span>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); socketRef.current?.emit('send_message', { message: messageText }); setChatLog([...chatLog, { text: messageText, sender: 'Me', isMe: true }]); setMessageText(''); }} className="flex h-8 gap-2">
          <input value={messageText} onChange={(e) => setMessageText(e.target.value)} className="flex-1 bg-[#030712] border border-slate-800 rounded px-3 py-1 text-xs text-slate-200 outline-none" placeholder="Send IG / Numbers..." />
          <button type="submit" className="px-4 text-xs font-bold rounded bg-slate-800 text-slate-300">SEND</button>
        </form>
      </div>
    </div>
  );
}