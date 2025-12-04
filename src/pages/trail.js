import React from "react";
import {
  Home,
  Compass,
  PlaySquare,
  User,
  Plus,
  Search,
  MoreHorizontal,
  Sparkles,
  Command,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Premium Glass Helper Classes ---
// "Crystal" effect: crisper borders, deeper shadows, subtle noise
const premiumGlass =
  "bg-white/[0.03] hover:bg-white/[0.06] " +
  "backdrop-blur-[24px] backdrop-saturate-[180%] " +
  "border border-white/[0.08] " +
  "shadow-[0_8px_32px_0_rgba(0,0,0,0.36),_inset_0_0_0_1px_rgba(255,255,255,0.05)] " +
  "relative overflow-hidden group transition-all duration-300";

const sidebarGlass =
  "bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent " +
  "backdrop-blur-[40px] backdrop-saturate-[160%] " +
  "border-r border-white/[0.08] " +
  "shadow-[5px_0_40px_0_rgba(0,0,0,0.4)]";

const animationStyle = `
  @keyframes float-lava {
    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
    33% { transform: translate(50px, -30px) scale(1.1) rotate(10deg); opacity: 0.8; }
    66% { transform: translate(-30px, 40px) scale(0.9) rotate(-5deg); opacity: 0.6; }
  }
  .lava-blob {
    animation: float-lava 25s infinite ease-in-out;
    filter: blur(100px);
  }
  .noise-bg {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

export default function LearnAIPlatform() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* --- Styles --- */}
      <style>{animationStyle}</style>

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="lava-blob absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/40 mix-blend-screen"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="lava-blob absolute top-[10%] right-[-20%] w-[700px] h-[700px] bg-purple-900/30 mix-blend-screen"
          style={{ animationDelay: "-8s" }}
        ></div>
        <div
          className="lava-blob absolute bottom-[-20%] left-[20%] w-[900px] h-[900px] bg-blue-900/20 mix-blend-screen"
          style={{ animationDelay: "-15s" }}
        ></div>
        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 noise-bg z-0 opacity-30"></div>
      </div>

      {/* --- Sidebar (Premium Crystal Pane) --- */}
      <aside className={`w-72 flex flex-col z-20 ${sidebarGlass} relative`}>
        {/* Logo Area */}
        <div className="p-8 pb-10">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
                <Sparkles className="w-5 h-5 text-white" fill="white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                LearnAI
              </h1>
              <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">
                Premium
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            active
            onClick={() => navigate("/trail")}
          />
          <NavItem
            icon={<Compass size={20} />}
            label="Explore"
            onClick={() => navigate("/explore")}
          />
          <NavItem
            icon={<PlaySquare size={20} />}
            label="My Courses"
            onClick={() => navigate("/courses")}
          />
          <NavItem
            icon={<User size={20} />}
            label="Profile"
            onClick={() => navigate("/profile")}
          />
          <div className="pt-4 mt-4 border-t border-white/10">
            <NavItem
                icon={<ChevronLeft size={20} />}
                label="Back to Landing"
                onClick={() => navigate("/")}
            />
          </div>
        </nav>

        {/* Action Area */}
        <div className="p-6 mt-auto">
          <button className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-[1px] shadow-2xl shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40">
            <div className="relative flex items-center justify-center gap-2 rounded-2xl bg-black/20 backdrop-blur-xl px-4 py-3.5 transition-all group-hover:bg-transparent">
              <Plus size={18} className="text-white" />
              <span className="font-semibold text-white tracking-wide text-sm">
                Create Reel
              </span>
            </div>
          </button>
        </div>

        {/* User Mini-Profile */}
        <div className="p-6 border-t border-white/[0.05] bg-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 p-[2px] shadow-lg">
              <div
                className="w-full h-full rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://i.pravatar.cc/150?img=33)",
                }}
              ></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                Alex Morgan
              </p>
              <p className="text-xs text-slate-500 truncate">Pro Member</p>
            </div>
            <MoreHorizontal
              size={18}
              className="text-slate-500 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-hide">
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-30 px-8 py-6 flex items-center justify-between border-b border-white/[0.05] bg-[#02040a]/60 backdrop-blur-xl">
          {/* Search */}
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-96 ${premiumGlass} !bg-white/[0.02] hover:!bg-white/[0.05] !shadow-none focus-within:!border-indigo-500/50 focus-within:!bg-white/[0.08] transition-all`}
          >
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
            />
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-slate-400 font-mono">
              <Command size={10} />
              <span>K</span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#02040a] bg-slate-700 bg-cover"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/150?img=${
                      i + 10
                    })`,
                  }}
                ></div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#02040a] bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                +5
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <p className="text-sm text-slate-400 font-medium">120 pts</p>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 pb-20 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 relative">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Master the Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                of Intelligence.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
              Dive into curated paths designed for the next generation of
              creators. Learn neural networks, generative AI, and data
              storytelling.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Premium Card 1 */}
            <CourseCard
              title="C++ STL in 60 Seconds"
              category="Programming"
              duration="1m"
              bgClass="bg-gradient-to-br from-sky-900/50 to-slate-900/50"
              accentColor="bg-sky-400"
              borderColor="group-hover:border-sky-400/30"
              visual={
                <div className="relative w-full h-full flex items-center justify-center text-sky-400 text-6xl font-bold opacity-80 font-mono">
                  {"< >"}
                </div>
              }
            />
            {/* Premium Card 2 */}
            <CourseCard
              title="Machine Learning in 1 Minute"
              category="AI & ML"
              duration="1m"
              bgClass="bg-gradient-to-br from-green-900/50 to-slate-900/50"
              accentColor="bg-green-400"
              borderColor="group-hover:border-green-400/30"
              visual={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400/20 to-transparent opacity-50"></div>
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              }
            />
            {/* Premium Card 3 */}
            <CourseCard
              title="Git & GitHub for Beginners"
              category="Version Control"
              duration="3m"
              bgClass="bg-gradient-to-br from-red-900/50 to-slate-900/50"
              accentColor="bg-red-400"
              borderColor="group-hover:border-red-400/30"
              visual={
                <div className="relative w-full h-full flex items-center justify-center text-red-400 text-5xl font-bold">
                  {"</>"}
                </div>
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
      active
        ? "bg-white/[0.08] border border-white/[0.05] shadow-lg"
        : "hover:bg-white/[0.04]"
    }`}
  >
    <div
      className={`transition-colors ${
        active
          ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          : "text-slate-400 group-hover:text-slate-200"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-sm font-medium tracking-wide ${
        active ? "text-white" : "text-slate-400 group-hover:text-slate-200"
      }`}
    >
      {label}
    </span>
    {active && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
    )}
  </button>
);

const CourseCard = ({
  title,
  category,
  duration,
  bgClass,
  accentColor,
  borderColor,
  visual,
}) => (
  <div
    className={`h-[340px] rounded-3xl p-1.5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group ${premiumGlass} border-transparent ${borderColor}`}
  >
    {/* Inner Content Container */}
    <div className="w-full h-full rounded-2xl bg-[#02040a]/80 overflow-hidden flex flex-col relative">
      {/* Visual Area */}
      <div className={`flex-1 ${bgClass} relative overflow-hidden`}>
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-bg opacity-40 z-0"></div>
        <div className="relative z-10 w-full h-full transition-transform duration-700 group-hover:scale-105">
          {visual}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] transform scale-50 group-hover:scale-100 transition-transform">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="p-6 border-t border-white/[0.05] relative bg-gradient-to-b from-[#0B0F19] to-[#02040a]">
        <div className="flex justify-between items-start mb-3">          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/[0.05] border border-white/[0.05] text-slate-400 group-hover:text-white group-hover:border-white/10 transition-colors">
            {category}
          </span>
          <span className="text-xs font-mono text-slate-500">{duration}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
          {title}
        </h3>
        <div
          className={`h-1 w-0 group-hover:w-full ${accentColor} mt-4 rounded-full transition-all duration-700 ease-out opacity-80 shadow-[0_0_10px_currentColor]`}
        ></div>
      </div>
    </div>
  </div>
);
