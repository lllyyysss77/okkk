
import React, { useState, useEffect, useRef } from 'react';
import { GeminiLiveService } from '../services/geminiLiveService';
import { ChinaDirectService } from '../services/chinaDirectService';
import { RegionType, VoiceMessage } from '../types';

const VoiceWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState<RegionType>(RegionType.GLOBAL);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  
  const serviceRef = useRef<GeminiLiveService | ChinaDirectService | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleConnection = async () => {
    if (isConnected) {
      serviceRef.current?.disconnect();
      serviceRef.current = null;
      setIsConnected(false);
      setVolume(0);
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      if (region === RegionType.CHINA_MAINLAND) {
        serviceRef.current = new ChinaDirectService();
      } else {
        serviceRef.current = new GeminiLiveService();
      }

      await serviceRef.current.connect({
        onVolume: (v) => {
          // Amplify sensitivity for better visualization
          setVolume(v * 2);
        },
        onMessage: (text, isUser) => {
          setMessages(prev => {
            const last = prev[prev.length - 1];
            const role = isUser ? 'user' : 'model';
            if (last && last.role === role && (Date.now() - last.timestamp < 3000)) {
                return [...prev.slice(0, -1), { ...last, text: last.text + text }];
            }
            return [...prev, { id: Math.random().toString(), role, text, timestamp: Date.now() }];
          });
        },
        onError: (err) => {
          setError(typeof err === 'string' ? err : "连接错误");
          setIsConnected(false);
          setIsConnecting(false);
          setVolume(0);
        }
      });
      setIsConnected(true);
    } catch (err) {
      setError("初始化失败");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRegionChange = (newRegion: RegionType) => {
    if (isConnected) {
      serviceRef.current?.disconnect();
      setIsConnected(false);
      setVolume(0);
    }
    setRegion(newRegion);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] mb-4 glassmorphism rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b bg-white/50 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Gemini Voice Cloud</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                <span className="text-xs text-slate-500 uppercase font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Region Selector */}
          <div className="p-3 bg-slate-50/80 flex gap-2">
            <button 
              onClick={() => handleRegionChange(RegionType.GLOBAL)}
              className={`flex-1 py-1.5 text-xs rounded-lg font-semibold transition-all ${region === RegionType.GLOBAL ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border'}`}
            >
              Global Line
            </button>
            <button 
              onClick={() => handleRegionChange(RegionType.CHINA_MAINLAND)}
              className={`flex-1 py-1.5 text-xs rounded-lg font-semibold transition-all ${region === RegionType.CHINA_MAINLAND ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border'}`}
            >
              大陆专线 (CN)
            </button>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            {messages.length === 0 && !error && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center px-8">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </div>
                <p>Click the microphone to start a {region === RegionType.CHINA_MAINLAND ? 'CN-optimized' : 'global'} voice session</p>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                {error}
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Action area */}
          <div className="p-6 border-t bg-white flex flex-col items-center gap-4 relative">
            {/* Visualizer Ring */}
            {isConnected && (
              <div 
                className="absolute w-24 h-24 rounded-full border-2 border-indigo-400 opacity-20 pointer-events-none transition-transform duration-75"
                style={{ transform: `scale(${1 + volume * 1.5})` }}
              ></div>
            )}
            
            <button 
              onClick={toggleConnection}
              disabled={isConnecting}
              style={{ transform: isConnected ? `scale(${1 + volume * 0.4})` : 'scale(1)' }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-75 transform hover:scale-105 active:scale-95 z-10 ${isConnected ? 'bg-red-500 hover:bg-red-600 shadow-red-200 shadow-2xl' : 'bg-indigo-600 hover:bg-indigo-700'} ${isConnecting ? 'animate-pulse opacity-50' : ''}`}
            >
              {isConnected ? (
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              )}
            </button>
            <p className="text-xs text-slate-400 font-medium">
              {isConnected ? (volume > 0.05 ? 'Speaking...' : 'Listening...') : 'Tap to start conversation'}
            </p>
          </div>
        </div>
      )}

      {/* Floating Launcher */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-indigo-700 transition-all transform hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>
    </div>
  );
};

export default VoiceWidget;
