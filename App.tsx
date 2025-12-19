
import React from 'react';
import VoiceWidget from './components/VoiceWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 relative">
      {/* Landing / Preview UI */}
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            Gemini Voice <span className="text-indigo-600">Cloud Widget</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A real-time, zero-latency voice plugin powered by Gemini 2.5. 
            Plug it into any website with a single line of code.
          </p>
        </div>

        {/* Integration Instructions */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              Quick Integration
            </h2>
            <p className="text-slate-500 text-sm mb-4">Paste this into your HTML to add the voice assistant instantly.</p>
            <div className="bg-slate-900 p-4 rounded-xl relative group">
              <code className="text-indigo-300 text-sm block overflow-x-auto whitespace-nowrap">
                &lt;script src="https://cdn.your-service.com/voice-widget.min.js"&gt;&lt;/script&gt;
              </code>
              <button className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"></path></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-1">Global Region</h3>
              <p className="text-xs text-indigo-700">Standard low-latency routes for international traffic via Gemini's edge network.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <h3 className="font-bold text-rose-900 mb-1">Mainland China (CN)</h3>
              <p className="text-xs text-rose-700">Dedicated proxy-routing via <code>shengsuanyun.com</code> for seamless accessibility in Mainland China.</p>
            </div>
          </div>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { title: "Real-time", desc: "Native Audio API support for 200ms responses" },
              { title: "Hybrid Routing", desc: "Intelligent switching between CN and Global" },
              { title: "Customizable", desc: "Easily skin via CSS variables and Tailwind" }
            ].map((feature, i) => (
              <div key={i} className="space-y-2">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
                <h4 className="font-bold text-slate-800">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>

      {/* The actual Widget - This is what users would see injected */}
      <VoiceWidget />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-300 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-rose-200 rounded-full blur-[80px]"></div>
      </div>
    </div>
  );
};

export default App;
