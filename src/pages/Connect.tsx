import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Mic, MicOff, SkipForward, Send } from 'lucide-react';

const peerConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

export default function Connect() {
  const [status, setStatus] = useState<'idle' | 'searching' | 'connected'>('idle');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // 1. Initialize Socket and Listeners
  useEffect(() => {
    const BACKEND_URL = 'https://cross-pollination-backend.onrender.com';
    socketRef.current = io(BACKEND_URL);

    socketRef.current.on('matched', async ({ roomId, peer }) => {
      setStatus('connected');
      setCurrentRoom(roomId);
      setChatLog([{ text: `Connected with ${peer.name}`, sender: 'System', isMe: false }]);
      setupWebRTC(roomId, true);
    });

    socketRef.current.on('video_offer', async ({ roomId, sdp }) => {
      setCurrentRoom(roomId);
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
      try {
        await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) { console.error("Error adding ICE candidate", e); }
    });

    socketRef.current.on('receive_message', (data) => {
      setChatLog(prev => [...prev, { text: data.message, sender: data.senderName, isMe: false }]);
    });

    socketRef.current.on('peer_left', () => {
      handleSkip(); // Reset if other person leaves
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  // 2. Camera Setup
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      }).catch(err => console.error("Camera Error:", err));
  }, []);

  // 3. WebRTC Setup Logic
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
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    socketRef.current?.emit('leave_room', { roomId: currentRoom });
    setCurrentRoom(null);
    setChatLog([]);
    startSearch();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Debugging: Log what's happening in the console (F12)
    console.log("Attempting to send...");
    console.log("Current Room:", currentRoom);
    console.log("Message Text:", messageText);
    console.log("Socket Connected:", socketRef.current?.connected);

    // 2. Validate
    if (!messageText.trim()) {
      console.warn("Message is empty");
      return;
    }
    
    if (!currentRoom) {
      console.error("Cannot send message: No active room (Are you connected?)");
      alert("Please wait for a match before sending messages.");
      return;
    }

    if (!socketRef.current) {
      console.error("Cannot send message: Socket not initialized");
      return;
    }

    // 3. Send
    socketRef.current.emit('send_message', { 
      roomId: currentRoom, 
      message: messageText, 
      senderName: "Me" 
    });

    // 4. Update UI
    setChatLog(prev => [...prev, { text: messageText, sender: 'Me', isMe: true }]);
    setMessageText('');
  };
  return (
    <div className="h-screen w-full flex flex-col bg-[#030712] overflow-hidden">
      
      {/* VIDEO SECTION */}
      <div className="flex flex-col flex-1 min-h-0 gap-2 p-2 md:flex-row">
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Them</div>
          {status !== 'connected' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <button onClick={startSearch} className="px-8 py-4 font-black rounded-full bg-cyan-500 text-slate-950 animate-pulse">
                {status === 'searching' ? 'Searching...' : 'Find Match'}
              </button>
            </div>
          )}
        </div>
        
        <div className="relative flex-1 overflow-hidden border rounded-lg bg-slate-900 border-slate-900/50">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-cyan-400 font-bold uppercase">Me</div>
          <div className="absolute flex gap-2 bottom-4 right-4">
            <button onClick={() => { const t = localStreamRef.current?.getAudioTracks()[0]; if(t) { t.enabled = !t.enabled; setIsMuted(!t.enabled); } }} className={`p-4 rounded-full border border-slate-700 ${isMuted ? 'bg-red-600' : 'bg-black/60'}`}>
              {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
            </button>
            <button onClick={handleSkip} className="p-4 text-black rounded-full shadow-lg bg-cyan-500"><SkipForward size={20} /></button>
          </div>
        </div>
      </div>

      {/* CHAT FOOTER */}
      <div className="h-24 bg-[#0B0F19] border-t border-slate-900/50 flex flex-col px-4 py-2 justify-center shrink-0">
        <div className="flex-1 mb-1 overflow-y-auto">
          {chatLog.map((msg, idx) => (
            <div key={idx} className="text-xs text-slate-300"><span className="font-bold text-cyan-400">{msg.sender}:</span> {msg.text}</div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex h-8 gap-2">
          <input value={messageText} onChange={(e) => setMessageText(e.target.value)} className="flex-1 bg-[#030712] border border-slate-800 rounded px-3 text-xs text-slate-200 outline-none" placeholder="Send info..." />
          <button type="submit" className="px-4 text-xs font-bold text-white rounded bg-slate-800">SEND</button>
        </form>
      </div>
    </div>
  );
}