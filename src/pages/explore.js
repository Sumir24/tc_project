import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Plus,
  Play,
  BookOpen,
  Layout,
  Code,
  PenTool,
  BarChart,
  Smartphone,
  Globe,
  ChevronLeft,
} from "lucide-react";

// --- Liquid Glass Helper Classes ---
const liquidGlassClass =
  "bg-gradient-to-br from-white/10 via-white/5 to-transparent " +
  "backdrop-blur-[20px] backdrop-saturate-[180%] " +
  "border border-white/20 " +
  "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.3)] " +
  "relative overflow-hidden group";

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

const ExplorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      <style>{animationStyle}</style>

      {/* --- Background: The Fluid Engine --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="liquid-blob absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/30 mix-blend-screen blur-[80px]"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="liquid-blob absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 mix-blend-screen blur-[80px]"
          style={{ animationDelay: "-5s" }}
        ></div>
        <div
          className="liquid-blob absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/30 mix-blend-screen blur-[100px]"
          style={{ animationDelay: "-10s" }}
        ></div>
      </div>

      {/* --- Navbar --- */}
      <nav
        className={`border-b border-white/10 sticky top-0 z-50 ${liquidGlassClass} !bg-slate-900/60 !rounded-none`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              </div>
              <span>LearnAI</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Home
              </a>
              <a href="#" className="text-white">
                Explore
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                My Learning
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-900/20">
              Create
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]"></div>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#EAD8B1] overflow-hidden border border-slate-700">
              <User className="w-full h-full p-1 text-stone-800" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Header Section */}
        <div className="mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Explore</h1>
          <p className="text-slate-400 mb-8">
            Discover new skills with AI-powered reels and micro-courses.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-20" />
            <input
              type="text"
              placeholder="Search for topics, skills, or creators"
              className={`w-full ${liquidGlassClass} !bg-white/5 border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-500 relative z-10`}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <FilterPill label="All" active />
          <FilterPill label="Data Science" />
          <FilterPill label="Marketing" />
          <FilterPill label="Design" />
          <FilterPill label="Development" />
          <FilterPill label="Business" />
        </div>

        {/* Section 1: Curated Collections */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">
            Curated Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard
              title="Get Started with AI"
              desc="Fundamentals of machine learning and neural networks."
              count="5 Courses"
              icon={<BookOpen size={14} />}
              color="text-cyan-400"
              imgGradient="from-cyan-900/80 to-slate-900/80"
            />
            <CollectionCard
              title="Data Visualization Mastery"
              desc="Learn to tell compelling stories with data."
              count="8 Courses"
              icon={<BarChart size={14} />}
              color="text-blue-400"
              imgGradient="from-blue-900/80 to-slate-900/80"
            />
            <CollectionCard
              title="Productivity Hacks"
              desc="Boost your efficiency with these quick tips and tricks."
              count="12 Reels"
              icon={<Play size={14} />}
              color="text-purple-400"
              imgGradient="from-purple-900/80 to-slate-900/80"
            />
          </div>
        </section>

        {/* Section 2: Trending Now */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrendingCard
              title="React Hooks in 60 Seconds"
              type="Reel"
              duration="1 min"
              imageColor="bg-blue-900/40"
              icon={<Code className="text-blue-400" size={32} />}
            />
            <TrendingCard
              title="The Art of the Upsell"
              type="Reel"
              duration="2 min"
              imageColor="bg-emerald-900/40"
              icon={<BarChart className="text-emerald-400" size={32} />}
            />
            <TrendingCard
              title="Figma Autolayout Basics"
              type="Reel"
              duration="1 min"
              imageColor="bg-orange-900/40"
              icon={<Layout className="text-orange-400" size={32} />}
            />
            <TrendingCard
              title="Social Media Growth Hacks"
              type="Reel"
              duration="3 min"
              imageColor="bg-pink-900/40"
              icon={<Smartphone className="text-pink-400" size={32} />}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

// --- Sub-Components ---

const FilterPill = ({ label, active }) => (
  <button
    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
        : `${liquidGlassClass} !bg-white/5 hover:bg-white/10 text-slate-300 border-transparent`
    }`}
  >
    {label}
  </button>
);

const CollectionCard = ({ title, desc, count, icon, color, imgGradient }) => (
  <div
    className={`rounded-2xl overflow-hidden transition-all group cursor-pointer hover:-translate-y-1 ${liquidGlassClass}`}
  >
    {/* Image Placeholder */}
    <div
      className={`h-40 w-full bg-gradient-to-br ${imgGradient} relative p-6 flex items-center justify-center relative z-10 opacity-80 group-hover:opacity-100 transition-opacity`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      {/* Abstract shape */}
      <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/5 group-hover:scale-110 transition-transform duration-500">
        <div className="w-12 h-12 rounded-full border border-white/20"></div>
      </div>
    </div>

    <div className="p-5 relative z-10">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
        {desc}
      </p>
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold ${color} bg-white/10`}
      >
        {icon}
        <span>{count}</span>
      </div>
    </div>
  </div>
);

const TrendingCard = ({ title, type, duration, imageColor, icon }) => (
  <div className="group cursor-pointer relative z-10">
    <div
      className={`aspect-[9/16] w-full rounded-2xl mb-3 relative overflow-hidden ${imageColor} flex items-center justify-center ${liquidGlassClass} !border-transparent !shadow-none hover:shadow-lg transition-all`}
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

      {/* Icon/Content Placeholder */}
      <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 opacity-80 relative z-20">
        {icon}
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white ml-1" />
        </div>
      </div>
    </div>

    <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <div className="flex items-center gap-2 text-xs">
      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium">
        {type}
      </span>
      <span className="text-slate-500">{duration}</span>
    </div>
  </div>
);

export default ExplorePage;
