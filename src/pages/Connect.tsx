import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Video, VideoOff, Mic, MicOff, RefreshCw, Sparkles, Send, User, ShieldCheck } from 'lucide-react';

const peerConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default function Connect() {
  const [status, setStatus] = useState<'idle' | 'searching' | 'connected'>('idle');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  // 📝 Text Chat & Peer Information States
  const [peerInfo, setPeerInfo] = useState<{ name: string; bio: string } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);

  // Local user data mock (In production, pull this from your actual auth context/localStorage)
  const myProfileData = {
    name: localStorage.getItem('username') || `User_${Math.floor(Math.random() * 9000 + 1000)}`,
    bio: "Full-Stack Dev exploring real-time connections 🚀"
  };

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const BACKEND_WS_URL = 'http://localhost:5000';
    const newSocket = io(BACKEND_WS_URL);
    socketRef.current = newSocket;

    // A. Backend found a match -> Hook into peer info data payload
    newSocket.on('matched', async ({ roomId, peer }) => {
      setCurrentRoom(roomId);
      setPeerInfo(peer); // Save stranger profile metadata
      setStatus('connected');
      setChatLog([{ text: `System: Secured connection with ${peer.name}.`, sender: 'System', isMe: false }]);
      await setupWebRTCPeer(roomId, true);
    });

    newSocket.on('video_offer', async ({ sdp }) => {
      if (!peerConnectionRef.current) await setupWebRTCPeer(currentRoom!, false);
      await peerConnectionRef.current!.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await peerConnectionRef.current!.createAnswer();
      await peerConnectionRef.current!.setLocalDescription(answer);
      newSocket.emit('video_answer', { roomId: currentRoom, sdp: answer });
    });

    newSocket.on('video_answer', async ({ sdp }) => {
      await peerConnectionRef.current!.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    newSocket.on('ice_candidate', async ({ candidate }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // B. Catch incoming text transmissions
    newSocket.on('receive_message', ({ message, senderName }) => {
      setChatLog((prev) => [...prev, { text: message, sender: senderName, isMe: false }]);
    });

    return () => {
      cleanUpConnection();
      newSocket.disconnect();
    };
  }, [currentRoom]);

  // Auto-scroll chat box utility helper
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const setupWebRTCPeer = async (roomId: string, isCaller: boolean) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection(peerConfiguration);
      peerConnectionRef.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit('ice_candidate', { roomId, candidate: event.candidate });
        }
      };

      if (isCaller) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current!.emit('video_offer', { roomId, sdp: offer });
      }
    } catch (err) {
      console.error("WebRTC Error", err);
    }
  };

  const startSearch = () => {
    setStatus('searching');
    setChatLog([]);
    // Dispatch local metadata package properties straight to matchmaking queue core
    socketRef.current?.emit('join_pool', { userProfile: myProfileData });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentRoom || !socketRef.current) return;

    socketRef.current.emit('send_message', { 
      roomId: currentRoom, 
      message: messageText, 
      senderName: myProfileData.name 
    });

    setChatLog((prev) => [...prev, { text: messageText, sender: myProfileData.name, isMe: true }]);
    setMessageText('');
  };

  const cleanUpConnection = () => {
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    setCurrentRoom(null);
    setPeerInfo(null);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getAudioTracks()[0];
      if (track) { track.enabled = !track.enabled; setIsMuted(!track.enabled); }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const track = localStreamRef.current.getVideoTracks()[0];
      if (track) { track.enabled = !track.enabled; setIsVideoOff(!track.enabled); }
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-6xl mx-auto bg-[#030712] border border-slate-900 rounded-2xl overflow-hidden mt-4 shadow-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b bg-slate-950/60 border-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-slate-200">Identity Matrix Core</h1>
            <p className="text-[10px] text-slate-500">Live Video Stream + Encrypted Text Matrix Module</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
          status === 'connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          status === 'searching' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
          'bg-slate-800 text-slate-400'
        }`}>
          {status === 'idle' ? 'Offline' : status === 'searching' ? 'Matching...' : 'Session Matrix Active'}
        </span>
      </div>

      {/* Main Container Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Video Grid Component */}
        <div className="relative flex flex-col justify-center flex-1 p-4 border-r bg-slate-950/20 border-slate-900">
          {status === 'idle' && (
            <div className="max-w-sm p-6 mx-auto space-y-4 text-center border bg-slate-950 border-slate-900 rounded-2xl">
              <Video className="w-6 h-6 mx-auto text-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-300">Initialize Live Stream Link</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Step into an active network node. Your account name and info summary will be securely relayed to your partner upon pairing.
              </p>
              <button onClick={startSearch} className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold py-2.5 rounded-xl transition">
                Start Full-Stack Matchmaking
              </button>
            </div>
          )}

          {status === 'searching' && (
            <div className="space-y-3 text-center">
              <RefreshCw className="w-6 h-6 mx-auto text-cyan-400 animate-spin" />
              <p className="text-[11px] text-slate-400 font-medium">Scanning index blocks for another node...</p>
            </div>
          )}

          {status === 'connected' && (
            <div className="flex flex-col w-full h-full gap-4">
              
              {/* 👤 NEW PANEL Overlay: Displays information about the person you matched with */}
              {peerInfo && (
                <div className="flex items-center justify-between p-3 border shadow-sm bg-slate-950 rounded-xl border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-slate-900 text-cyan-400 border-slate-800">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-200">{peerInfo.name}</h4>
                        <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 italic max-w-md truncate">{peerInfo.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Matrix Grid Containers */}
              <div className="relative grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative flex items-center justify-center overflow-hidden border bg-slate-900/60 border-slate-800/60 rounded-xl">
                  <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                  <span className="absolute bottom-3 left-3 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-bold text-slate-400 border border-slate-800">
                    {peerInfo ? peerInfo.name.toUpperCase() : 'STRANGER'}
                  </span>
                </div>
                <div className="relative flex items-center justify-center overflow-hidden border bg-slate-900/60 border-slate-800/60 rounded-xl">
                  <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                  <span className="absolute bottom-3 left-3 bg-cyan-400 px-2 py-0.5 rounded text-[9px] font-bold text-slate-950 uppercase">
                    YOU
                  </span>
                </div>
              </div>

              {/* Control Actions Bar Menu */}
              <div className="flex items-center justify-center w-full max-w-xs gap-3 px-4 py-1 mx-auto border bg-slate-950 border-slate-900 rounded-xl">
                <button onClick={toggleMute} className={`p-2 rounded-lg ${isMuted ? 'text-red-400 bg-red-500/10' : 'text-slate-400 hover:text-slate-200'}`}>
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button onClick={toggleVideo} className={`p-2 rounded-lg ${isVideoOff ? 'text-red-400 bg-red-500/10' : 'text-slate-400 hover:text-slate-200'}`}>
                  {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
                <div className="w-px h-4 bg-slate-800" />
                <button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-400 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition uppercase tracking-wider">
                  Next Match
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Unified Scrolling Live Text Chat Column */}
        <div className="flex flex-col w-80 bg-slate-950/40">
          <div className="p-3 bg-slate-950/60 border-b border-slate-900 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Live Stream Feed Chat Log
          </div>
          
          {/* Chat scrolling viewport block */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 flex flex-col justify-start">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] text-slate-600 font-semibold mb-0.5 px-1">{msg.sender}</span>
                <div className={`max-w-[90%] rounded-xl px-3 py-1.5 text-xs font-medium leading-relaxed shadow-sm ${
                  msg.isMe 
                    ? 'bg-cyan-400 text-slate-950 rounded-tr-none' 
                    : 'bg-slate-950 border border-slate-900 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Form message dispatch string submission input anchor footer */}
          {status === 'connected' && (
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-3 border-t border-slate-900 bg-slate-950/60">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Send secure text packet..."
                className="flex-1 bg-[#030712] border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition"
              />
              <button type="submit" className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 p-1.5 rounded-lg transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}