import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Volume2, Sparkles, ArrowRight, HelpCircle, User, Loader2 } from 'lucide-react';
import DidiOrb from './DidiOrb';
import { chatPresets } from '../data/dummyData';
import { chatWithDidi, transcribeAudio } from '../lib/api';
import useVoiceRecorder from '../lib/useVoiceRecorder';

export default function ChatDemo() {
  const [activeCategory, setActiveCategory] = useState('career');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [didiMood, setDidiMood] = useState('reflective');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const messagesContainerRef = useRef(null);
  const recorder = useVoiceRecorder();

  // Load preset messages on category switch
  useEffect(() => {
    setMessages(chatPresets[activeCategory].messages);
    setDidiMood(chatPresets[activeCategory].mood);
  }, [activeCategory]);

  // Scroll only the chat container (NOT the whole page).
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Send a message to Didi via the backend.
  const askDidi = async (text) => {
    const clean = text?.trim();
    if (!clean) return;
    const userMsg = { sender: 'user', text: clean };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const history = [...messages, userMsg]
      .slice(-10)
      .slice(0, -1) // exclude the message we just added (we send it as `message`)
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const res = await chatWithDidi({ message: clean, history });
      if (res.mood) setDidiMood(res.mood);
      setMessages((prev) => [...prev, { sender: 'didi', text: res.reply }]);
    } catch (err) {
      console.warn('[chat] failed', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'didi',
          text:
            "I'm having trouble reaching my brain right now, sister 🌸 — make sure the backend is running on port 5050 and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => askDidi(suggestion);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    askDidi(text);
  };

  // Voice input via Whisper backend.
  const handleMicClick = async () => {
    setVoiceError('');
    if (transcribing) return;
    if (recorder.isRecording) {
      try {
        const blob = await recorder.stop();
        if (!blob) return;
        setTranscribing(true);
        const { text } = await transcribeAudio(blob);
        if (text?.trim()) {
          await askDidi(text.trim());
        } else {
          setVoiceError("I couldn't catch that — try again?");
        }
      } catch (err) {
        console.warn('[voice]', err);
        setVoiceError(err.message || 'Voice transcription failed.');
      } finally {
        setTranscribing(false);
      }
    } else {
      try {
        await recorder.start();
      } catch {
        /* recorder.error already set */
      }
    }
  };

  // Browser TTS — speak the latest Didi reply aloud.
  const triggerVoiceSimulation = () => {
    const lastDidi = [...messages].reverse().find((m) => m.sender === 'didi');
    if (!lastDidi || !('speechSynthesis' in window)) {
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 2500);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(lastDidi.text);
      utter.rate = 0.95;
      utter.pitch = 1.08;
      utter.onstart = () => setIsPlayingVoice(true);
      utter.onend = () => setIsPlayingVoice(false);
      utter.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utter);
    } catch {
      setIsPlayingVoice(false);
    }
  };

  const micBusy = recorder.isRecording || transcribing;
  const micTitle = transcribing
    ? 'Transcribing...'
    : recorder.isRecording
      ? 'Click to stop & send'
      : 'Click to record (Whisper)';

  return (
    <section
      id="demo"
      className="py-20 relative bg-gradient-to-b from-pink-50/60 to-white/40 dark:from-[#0c0512] dark:to-[#120417] transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/5 dark:bg-pink-900/5 filter blur-3xl -z-10" />

      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase bg-pink-100 dark:bg-pink-950/40 px-3 py-1 rounded-full">
            Interactive Chat Console
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-800 dark:text-white mt-4 mb-6 leading-tight">
            Experience Talking to Didi
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
            Choose a preset scenario below to see how Didi guides you, or start typing your own question to feel her empathetic response.
          </p>
        </div>

        {/* Categories / Presets buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(chatPresets).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 border cursor-pointer ${activeCategory === cat
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-[0_4px_15px_rgba(244,114,182,0.3)] scale-[1.03]'
                : 'bg-white/90 dark:bg-pink-950/20 text-slate-700 dark:text-slate-300 border-pink-100 dark:border-white/10 hover:border-pink-400 dark:hover:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-950/30'
                }`}
            >
              <span>{chatPresets[cat].label}</span>
            </button>
          ))}
        </div>

        {/* Chat Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Emotion Orb Reacting */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg border-white/20 dark:border-white/5 min-h-[380px] lg:min-h-auto">
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-2 flex items-center gap-1.5 justify-center">
              <Sparkles className="w-5 h-5 text-pink-500" /> Didi's Emotional Orb
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
              Didi's presence shifts form, pulsing and breathing based on the emotional undertones of your dialogue.
            </p>

            <DidiOrb mood={didiMood} size="medium" />

            <div className="mt-8 px-4 py-3 rounded-2xl bg-white/50 dark:bg-black/20 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2 max-w-xs">
              <Volume2 className="w-4 h-4 text-pink-500 shrink-0" />
              <span>Didi listens to your tone and provides customized breathing cycles.</span>
            </div>
          </div>

          {/* Right Column: Chat Console */}
          <div className="lg:col-span-8 flex flex-col glass-panel rounded-3xl overflow-hidden shadow-xl border-white/20 dark:border-white/5 min-h-[500px]">
            {/* Header */}
            <div className="px-6 py-4 bg-white/80 dark:bg-pink-950/30 border-b border-pink-100/50 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    🌸
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-didi-bg-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">Didi AI</h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Adaptive Big Sister Support</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isPlayingVoice ? (
                  <div className="flex items-center gap-1 h-4 px-2 bg-pink-500/10 rounded-full">
                    <span className="w-1 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-1 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <span className="w-1 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                ) : (
                  <button
                    onClick={triggerVoiceSimulation}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-pink-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-pink-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Speak Response
                  </button>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={messagesContainerRef} className="flex-1 p-6 overflow-y-auto max-h-[380px] space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${msg.sender === 'user'
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                      }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : '🌸'}
                  </div>

                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${msg.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-none'
                      : 'bg-white dark:bg-pink-950/25 text-slate-800 dark:text-slate-200 rounded-tl-none border border-pink-100/60 dark:border-white/5 shadow-pink-100/40'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-xs">🌸</div>
                  <div className="px-4 py-3 rounded-2xl bg-white dark:bg-pink-950/25 border border-pink-100/60 dark:border-white/5 rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-2 pt-2 border-t border-pink-100/50 dark:border-white/5 bg-pink-50/40 dark:bg-black/10">
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1 uppercase mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-pink-500" /> What would Didi do? Suggestion:
              </span>
              <div className="flex flex-wrap gap-2 pb-2">
                {chatPresets[activeCategory].suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="text-xs px-3 py-1.5 rounded-full border border-pink-200/60 dark:border-white/10 bg-white/90 dark:bg-pink-950/20 text-slate-700 dark:text-slate-300 hover:border-pink-400 dark:hover:border-pink-700 hover:bg-pink-50 transition-colors text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>{sug}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Voice errors */}
            {(voiceError || recorder.error) && (
              <div className="px-6 py-2 text-xs text-rose-500 bg-rose-50/70 dark:bg-rose-950/20 border-t border-rose-100/40 dark:border-rose-900/20">
                {voiceError || recorder.error}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white/70 dark:bg-pink-950/20 border-t border-pink-100/50 dark:border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={recorder.isRecording ? 'Listening... 🎙️' : "Ask Didi anything..."}
                disabled={micBusy}
                className="flex-1 px-4 py-3 rounded-xl border border-pink-200/60 dark:border-white/10 bg-white dark:bg-pink-950/30 text-slate-800 dark:text-white placeholder-pink-300 dark:placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm disabled:opacity-70"
              />
              <button
                type="button"
                onClick={handleMicClick}
                disabled={!recorder.isSupported || transcribing}
                title={micTitle}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${recorder.isRecording
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                  : 'bg-pink-50 dark:bg-white/5 border-pink-200/60 dark:border-white/10 text-pink-500 hover:text-pink-600 hover:bg-pink-100'
                  } disabled:opacity-50`}
              >
                {transcribing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                type="submit"
                disabled={isTyping}
                className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:opacity-90 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
