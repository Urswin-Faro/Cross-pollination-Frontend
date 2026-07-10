import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Mic, MicOff, SkipForward } from 'lucide-react';

const peerConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

export default function Connect() {
  const [status, setStatus] = useState<'idle' | 'searching' | 'connected'>('idle');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<{ text: string; sender: string; isMe: boolean }[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const currentRoomRef = useRef<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const BACKEND_URL = 'https://cross-pollination-backend.onrender.com';
    socketRef.current = io(BACKEND_URL);

    socketRef.current.on('matched', async ({ roomId, peer, initiator }) => {
      setStatus('connected');
      currentRoomRef.current = roomId;
setCurrentRoom(roomId);
      setChatLog([{ text: `Connected with ${peer.name}`, sender: 'System', isMe: false }]);
      await setupWebRTC(roomId, initiator);
    });

    socketRef.current.on("video_offer", async ({ roomId, sdp }) => {
    console.log("📥 Received offer");

    currentRoomRef.current = roomId;
    setCurrentRoom(roomId);

    await setupWebRTC(roomId, false);

    console.log("Setting remote description...");

    await pcRef.current!.setRemoteDescription(
        new RTCSessionDescription(sdp)
    );

    console.log("Creating answer...");

    const answer = await pcRef.current!.createAnswer();

    await pcRef.current!.setLocalDescription(answer);

    console.log("Sending answer...");

    socketRef.current?.emit("video_answer", {
        roomId,
        sdp: pcRef.current!.localDescription
    });
});

    socketRef.current.on("video_answer", async ({ roomId, sdp }) => {
  console.log("📥 Received answer");

  if (!pcRef.current) return;

  await pcRef.current.setRemoteDescription(
    new RTCSessionDescription(sdp)
  );

  console.log("✅ Remote description set");
});

    socketRef.current.on("ice_candidate", async ({ roomId, candidate }) => {
  console.log("🧊 ICE received");

  try {
    if (pcRef.current) {
      await pcRef.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    }
  } catch (err) {
    console.error(err);
  }
});

    socketRef.current.on('receive_message', (data) => {
      setChatLog(prev => [...prev, { text: data.message, sender: data.senderName, isMe: false }]);
    });

    socketRef.current.on('peer_left', () => {
      handleSkip(); 
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      }).catch(err => console.error("Camera Error:", err));
  }, []);

  const setupWebRTC = async (
    roomId: string,
    isCaller: boolean
) => {

    if (pcRef.current) {
        pcRef.current.close();
    }

    const pc = new RTCPeerConnection(peerConfiguration);
    pcRef.current = pc;

    console.log("Creating PeerConnection. Caller:", isCaller);

    localStreamRef.current?.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
    });

    pc.ontrack = (event) => {
        console.log("🎥 Remote track received");
console.log(event.streams);
console.log(event.track.kind);

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
        }
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {

            console.log("Sending ICE");

            socketRef.current?.emit("ice_candidate", {
                roomId,
                candidate: event.candidate
            });
        }
    };

    pc.onconnectionstatechange = () => {
        console.log("Connection:", pc.connectionState);
    };

    pc.oniceconnectionstatechange = () => {
        console.log("ICE:", pc.iceConnectionState);
    };

    if (isCaller) {

        console.log("Creating offer");

        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);

        socketRef.current?.emit("video_offer", {
            roomId,
            sdp: pc.localDescription
        });
    }
};

  const startSearch = () => {
    if (!socketRef.current || !socketRef.current.connected) {
      socketRef.current?.connect();
      return;
    }
    setStatus('searching');
    socketRef.current.emit('join_pool', { userProfile: { name: "User" } });
  };

  const handleSkip = () => {
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    if (currentRoomRef.current) {
  socketRef.current?.emit("leave_room", {
    roomId: currentRoomRef.current
  });
}
    currentRoomRef.current = null;
    setCurrentRoom(null);
    setChatLog([]);
    startSearch();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("=== handleSendMessage ===");

    if (!messageText.trim()) {
        console.log("❌ Message is empty");
        return;
    }

    const roomId = currentRoomRef.current;

    if (!roomId) {
        console.log("❌ currentRoomRef is null");
        return;
    }

    console.log("✅ Sending to room:", roomId);

    socketRef.current?.emit("send_message", {
        roomId,
        message: messageText,
        senderName: "Me"
    });

    setChatLog(prev => [
        ...prev,
        {
            text: messageText,
            sender: "Me",
            isMe: true
        }
    ]);

    setMessageText("");
};

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#030712] overflow-hidden">
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
      <div className="h-28 md:h-32 bg-[#0B0F19] border-t border-slate-900/50 flex flex-col px-4 py-2 shrink-0">
        <div className="flex-1 mb-2 overflow-y-auto">
          {chatLog.map((msg, idx) => (
            <div key={idx} className="text-xs text-slate-300 py-0.5">
              <span className="font-bold text-cyan-400">{msg.sender}:</span> {msg.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage}
          className="flex items-center h-10 gap-2 shrink-0"
        >
          <input 
            type="text"
            value={messageText} 
            onChange={(e) => setMessageText(e.target.value)} 
            className="flex-1 bg-[#030712] border border-slate-800 rounded px-3 h-full text-xs text-slate-200 outline-none" 
            placeholder="Send info..." 
          />
          <button
  type="submit"
  className="h-full px-6 text-xs font-bold text-white rounded bg-slate-800"
  onClick={() => console.log("🔥 Button clicked")}
>
  SEND
</button>
        </form>
      </div>
    </div>
  );}