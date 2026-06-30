import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Video, VideoOff, Mic, MicOff, RefreshCw, Sparkles, Send, User, ShieldCheck, MessageSquare, XCircle } from 'lucide-react';

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
  
  // Mobile View Management
  const [activeTab, setActiveTab] = useState<'video' | 'chat'>('video');
  const [unreadChat, setUnreadChat] = useState(false);

  const [peerInfo, setPeerInfo] = useState<{ name: string; bio: string } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);

  const myProfileData = {
    name: localStorage.getItem('username') || `User_${Math.floor(Math.random() * 9000 + 1000)}`,
    bio: "Exploring the global real-time video matrix 🌐"
  };

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const currentRoomRef = useRef<string | null>(null);

  useEffect(() => {
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://cross-pollination-backend.onrender.com';    
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
    
    socketRef.current = newSocket;

    // Activate user camera instantly on mount
    async function activateLocalCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }
    activateLocalCamera();

    newSocket.on('matched', async ({ roomId, peer }) => {
      currentRoomRef.current = roomId;
      setCurrentRoom(roomId);
      setPeerInfo(peer);
      setStatus('connected');
      setChatLog([{ text: `Connected with ${peer.name}.`, sender: 'System', isMe: false }]);
      await setupWebRTCPeer(roomId, true);
    });

    newSocket.on('video_offer', async ({ sdp }) => {
      if (!peerConnectionRef.current) await setupWebRTCPeer(currentRoomRef.current!, false);
      await peerConnectionRef.current!.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await peerConnectionRef.current!.createAnswer();
      await peerConnectionRef.current!.setLocalDescription(answer);
      newSocket.emit('video_answer', { roomId: currentRoomRef.current, sdp: answer });
    });

    newSocket.on('video_answer', async ({ sdp }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    });

    newSocket.on('ice_candidate', async ({ candidate }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    newSocket.on('receive_message', ({ message, senderName }) => {
      setChatLog((prev) => [...prev, { text: message, sender: senderName, isMe: false }]);
      if (activeTab !== 'chat') setUnreadChat(true);
    });

    return () => {
      cleanUpConnection();
      newSocket.disconnect();
    };
  }, [activeTab]); // Listens to tab switches to clear notification counters cleanly

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const setupWebRTCPeer = async (roomId: string, isCaller: boolean) => {
    try {
      let stream = localStreamRef.current;
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection(peerConfiguration);
      peerConnectionRef.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream!));

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
    setChatLog([{ text: 'Looking for a connection...', sender: 'System', isMe: false }]);
    socketRef.current?.emit('join_pool', { userProfile: myProfileData });
  };

  const cancelSearch = () => {
    socketRef.current?.emit('leave_pool');
    cleanUpConnection();
    setStatus('idle');
    setChatLog([{ text: 'Search stopped.', sender: 'System', isMe: false }]);
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
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    currentRoomRef.current = null;
    setCurrentRoom(null);
    setPeerInfo(null);
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
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
    <div className="flex flex-col h-[calc(100dvh-2rem)] md:h-[85vh] w-full max-w-6xl mx-auto bg-[#030712] md:border md:border-slate-900 md:rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Header Banner */}
      <div className="flex items-center justify-between p-4 border-b bg-slate-950/60 border-slate-900 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-400/10 border border-cyan-500/20 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-wide md:text-sm text-slate-200">Identity Matrix</h1>
            <p className="text-[9px] md:text-[10px] text-slate-500 hidden sm:block">Cinematic P2P Live Network</p>
          </div>
        </div>

        {/* Mobile Screen Navigation Toggle Row */}
        {status === 'connected' && (
          <div className="flex md:hidden bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-md transition ${activeTab === 'video' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'}`}
            >
              <Video className="w-3.5 h-3.5" /> Streams
            </button>
            <button 
              onClick={() => { setActiveTab('chat'); setUnreadChat(false); }}
              className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-md transition relative ${activeTab === 'chat' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'}`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
              {unreadChat && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
            </button>
          </div>
        )}

        <span className={`text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 md:py-1 rounded-full uppercase tracking-wider ${
          status === 'connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          status === 'searching' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
          'bg-slate-800 text-slate-400'
        }`}>
          {status === 'idle' ? 'Offline' : status === 'searching' ? 'Matching...' : 'Live'}
        </span>
      </div>

      {/* Main Workspace Layout Area */}
      <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden md:flex-row">
        
        {/* LEFT COMPONENT: Large Video Centerpiece Area */}
        <div className={`flex-1 bg-slate-950/20 p-4 flex flex-col min-h-0 gap-4 justify-between ${status === 'connected' && activeTab !== 'video' ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Active Connected Profile Metadata bar */}
          {status === 'connected' && peerInfo && (
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 flex items-center gap-3 shrink-0 animate-in fade-in duration-200">
              <div className="flex items-center justify-center border rounded-lg w-7 h-7 bg-slate-900 text-cyan-400 border-slate-800 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold truncate text-slate-200">{peerInfo.name}</h4>
                  <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                </div>
                <p className="text-[10px] text-slate-500 italic truncate">{peerInfo.bio}</p>
              </div>
            </div>
          )}

          {/* High-Fidelity Video Feed Matrix Viewports Grid */}
          <div className="grid items-center justify-center flex-1 min-h-0 grid-cols-1 gap-4 sm:grid-cols-2">
            
            {/* STRANGER CONTAINER */}
            <div className="relative w-full h-full border bg-[#060913] border-slate-900/60 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden min-h-[160px]">
              {status === 'idle' && (
                <div className="flex flex-col items-center gap-2 text-center select-none opacity-15">
                  <User className="w-10 h-10 text-slate-500 stroke-[1.2]" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Stranger Stream Offline</span>
                </div>
              )}

              {status === 'searching' && (
                <div className="p-6 space-y-3 text-center duration-300 border bg-slate-950/40 rounded-2xl border-slate-900/50 backdrop-blur-sm animate-in fade-in">
                  <RefreshCw className="w-6 h-6 mx-auto text-cyan-400 animate-spin" />
                  <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">Scanning Node Matrix...</p>
                </div>
              )}

              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className={`w-full h-full object-cover transform scale-x-[-1] ${status === 'connected' ? 'block' : 'hidden'}`} 
              />
              
              {status === 'connected' && (
                <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-400 border border-slate-800 tracking-wider uppercase">
                  {peerInfo ? peerInfo.name : 'STRANGER'}
                </span>
              )}
            </div>

            {/* USER CONTAINER */}
            <div className="relative w-full h-full border bg-[#060913] border-slate-900/60 rounded-2xl shadow-2xl overflow-hidden min-h-[160px]">
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
              <span className="absolute bottom-3 left-3 bg-gradient-to-r from-cyan-400 to-blue-500 px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-950 tracking-wider">
                YOU
              </span>

              {/* Floating Audio / Video hardware controls */}
              <div className="absolute flex gap-2 top-3 right-3">
                <button onClick={toggleMute} className={`p-2 rounded-lg transition-all backdrop-blur-md ${isMuted ? 'text-red-400 bg-red-500/20 border border-red-500/30' : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800'}`}>
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button onClick={toggleVideo} className={`p-2 rounded-lg transition-all backdrop-blur-md ${isVideoOff ? 'text-red-400 bg-red-500/20 border border-red-500/30' : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800'}`}>
                  {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          {/* Unified Central Media Stream Engine Action Bar */}
          <div className="flex items-center justify-between w-full max-w-xl p-3 mx-auto border shadow-xl bg-slate-950 border-slate-900 rounded-2xl shrink-0">
            <div className="flex flex-col pl-2">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Network Status</span>
              <span className="text-[11px] font-medium text-slate-300">
                {status === 'idle' ? 'Ready to patch network connection' : status === 'searching' ? 'Searching system stack...' : 'P2P pipeline active'}
              </span>
            </div>

            {status === 'idle' && (
              <button 
                onClick={startSearch} 
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-400/10 active:scale-[0.98]"
              >
                Start Chatting
              </button>
            )}

            {status === 'searching' && (
              <button 
                onClick={cancelSearch} 
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs uppercase tracking-wide px-6 py-2.5 rounded-xl transition active:scale-[0.98] flex items-center gap-2"
              >
                <XCircle className="w-4 h-4 text-red-400" /> Cancel Search
              </button>
            )}

            {status === 'connected' && (
              <button 
                onClick={() => { cleanUpConnection(); setStatus('idle'); setChatLog([]); }} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition active:scale-[0.98]"
              >
                Disconnect / Next
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT: Small Compact Text Chat Sidebar Container */}
        <div className={`w-full md:w-[280px] lg:w-[320px] flex flex-col bg-slate-950/40 border-t md:border-t-0 md:border-l border-slate-900 shrink-0 min-h-0 ${status === 'connected' && activeTab !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 bg-slate-950/60 border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 hidden md:block">
            Secure Terminal Logs
          </div>
          
          {/* Chat text output log list feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 min-h-0 flex flex-col">
            {chatLog.length === 0 && (
              <div className="text-center my-auto p-4 text-[11px] text-slate-600 font-medium italic select-none">
                {status === 'connected' ? 'Secure logging active. Say hello!' : 'Text connection module asleep.'}
              </div>
            )}
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'System' ? 'items-center w-full my-1' : msg.isMe ? 'items-end' : 'items-start'} shrink-0`}>
                {msg.sender !== 'System' && (
                  <span className="text-[9px] text-slate-600 font-semibold mb-0.5 px-1">{msg.sender}</span>
                )}
                <div className={`max-w-[85%] rounded-xl px-3 py-1.5 text-xs font-medium leading-relaxed shadow-sm wrap-break-word ${
                  msg.sender === 'System'
                    ? 'bg-slate-900/80 text-cyan-400 border border-slate-800/60 text-[9px] font-bold uppercase tracking-wider rounded-md px-2 py-1 text-center'
                    : msg.isMe 
                    ? 'bg-cyan-400 text-slate-950 rounded-tr-none' 
                    : 'bg-slate-950 border border-slate-900 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Secure chat pipeline input form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-900 bg-slate-950/60 shrink-0 flex items-center gap-2 h-[60px]">
            <input
              type="text"
              disabled={status !== 'connected'}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={status === 'connected' ? "Type secure text packet..." : "Chat offline..."}
              className="flex-1 bg-[#030712] border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <button 
              type="submit" 
              disabled={status !== 'connected' || !messageText.trim()}
              className="p-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:hover:bg-cyan-400 text-slate-950 transition rounded-xl shrink-0 flex items-center justify-center active:scale-[0.96]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}