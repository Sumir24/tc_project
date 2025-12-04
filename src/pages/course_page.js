import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Play, Check, Lock, ChevronRight, Code, Terminal, Cpu, Database } from 'lucide-react';

// --- Premium Styles & Animation ---
const animationStyle = `
  @keyframes float-liquid {
    0%, 100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    33% { transform: translate(30px, -50px) scale(1.1); border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    66% { transform: translate(-20px, 20px) scale(0.9); border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; }
  }
  .liquid-blob {
    animation: float-liquid 20s infinite ease-in-out;
  }
`;

const liquidGlassClass = "bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group";

const CoursePage = () => {
  const navigate = useNavigate();
  // Updated Data for C++ STL
  const lessons = [
    {
      id: 1,
      title: "Vectors: Dynamic Arrays",
      duration: "1 min",
      status: "completed",
    },
    {
      id: 2,
      title: "Map vs Unordered Map",
      duration: "1 min",
      status: "current",
    },
    {
      id: 3,
      title: "Iterators Demystified",
      duration: "1 min",
      status: "locked",
    },
    {
      id: 4,
      title: "The Algorithm Library",
      duration: "1 min",
      status: "locked",
    },
    {
      id: 5,
      title: "Stack, Queue & Deque",
      duration: "1 min",
      status: "locked",
    },
  ];

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      <style>{animationStyle}</style>

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="liquid-blob absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/30 mix-blend-screen blur-[100px]"></div>
        <div className="liquid-blob absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/30 mix-blend-screen blur-[100px]" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* --- Navbar --- */}
      <nav className={`border-b border-white/10 sticky top-0 z-50 ${liquidGlassClass} !bg-[#02040a]/60 !rounded-none !border-x-0 !border-t-0`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                 <div className="w-3 h-3 bg-white/80 rounded-full blur-[1px]"></div>
              </div>
              <span>LearnAI</span>
            </div>
            <button onClick={() => navigate(-1)} className="text-sm font-medium hover:text-white transition-colors text-slate-400">Back to Courses</button>
          </div>

          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl ${liquidGlassClass} !bg-white/5`}>
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search lessons..." 
                className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-slate-500 w-48"
              />
            </div>
            <button className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10">
              <Bell className="w-5 h-5 text-slate-300" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold border border-white/10 shadow-lg">
                A
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-slate-500 mb-8 gap-2">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Courses</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-400 font-medium">C++ STL in 60 Seconds</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- Left Column: Course Info Card --- */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={`rounded-[2rem] p-8 ${liquidGlassClass}`}>
              
              {/* Hero Image / Visual */}
              <div className="w-full aspect-video bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative border border-white/10 shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                 {/* C++ Visual Elements */}
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-600/20 rounded-2xl border border-blue-500/50 flex items-center justify-center mb-4 backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                        <Code className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="font-mono text-xs text-blue-300 opacity-80">std::vector&lt;int&gt; v;</div>
                 </div>
                 {/* Decorative background glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px]"></div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">C++ STL in 60 Seconds</h1>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Master the Standard Template Library efficiently. Learn Vectors, Maps, Algorithms, and iterators through rapid-fire reels designed for competitive programming.
              </p>

              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                <MetadataPill icon={<Terminal size={14}/>} label="5 Reels" />
                <MetadataPill icon={<Cpu size={14}/>} label="High Performance" />
                <MetadataPill icon={<Database size={14}/>} label="Data Structures" />
              </div>

              {/* Progress Section */}
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Completion</span>
                  <span className="text-sm font-bold text-blue-400">20%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-800/50 rounded-full mb-8 overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[20%] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.6)] relative">
                      <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"></div>
                  </div>
                </div>

                <button className="w-full bg-white text-black hover:bg-slate-200 font-bold py-4 rounded-xl transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 group active:scale-95">
                  <Play className="w-4 h-4 fill-current" />
                  Continue Learning
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Lessons List --- */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span>Course Content</span>
                <span className="text-xs font-normal text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/10">5 min total</span>
            </h2>
            
            <div className="flex flex-col gap-4">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  onClick={() => {
                    if (lesson.id === 2) {
                      navigate('/reel');
                    }
                  }}
                  className={`
                    relative flex items-center p-5 rounded-2xl transition-all duration-300 border group cursor-pointer
                    ${lesson.status === 'current' 
                      ? `${liquidGlassClass} !bg-blue-600/10 !border-blue-500/50` 
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10'
                    }
                    ${lesson.status === 'locked' ? 'opacity-60' : 'opacity-100'}
                  `}
                >
                  {/* Icon Status */}
                  <div className="mr-6 flex-shrink-0">
                    {lesson.status === 'completed' && (
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                        <Check className="w-5 h-5" strokeWidth={3} />
                      </div>
                    )}
                    {lesson.status === 'current' && (
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] text-white animate-pulse">
                        <Play className="w-5 h-5 fill-current ml-1" />
                      </div>
                    )}
                    {lesson.status === 'locked' && (
                      <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10 text-slate-500">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Text Info */}
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-1 ${lesson.status === 'current' ? 'text-white' : 'text-slate-300'}`}>
                      {lesson.id}. {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">{lesson.duration}</p>
                  </div>
                  
                  {/* Hover indicator */}
                  {lesson.status !== 'locked' && (
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                        <ChevronRight className="w-4 h-4 text-white" />
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Sub-component for metadata
const MetadataPill = ({ icon, label }) => (
    <span className="flex items-center gap-2 bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10">
        {icon}
        {label}
    </span>
);

export default CoursePage;
