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

  // EFFECT 1: Initialize Socket (Runs once)
  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://cross-pollination-backend.onrender.com';
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
    
    socketRef.current = newSocket;

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
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this stays connected

  // EFFECT 2: Camera setup (Runs once)
  useEffect(() => {
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
  }, []);

  // EFFECT 3: Chat scroll
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
    // ... your original JSX remains the same ...
    <div className="flex flex-col h-[calc(100dvh-2rem)] md:h-[85vh] w-full max-w-6xl mx-auto bg-[#030712] md:border md:border-slate-900 md:rounded-2xl overflow-hidden shadow-2xl">
      {/* ... (Keep all your existing JSX code here exactly as it was) ... */}
      {/* Note: I'm not pasting the long JSX again to save space, but it stays untouched! */}
    </div>
  );
}