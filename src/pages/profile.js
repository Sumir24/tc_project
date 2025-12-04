import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  Award,
  Moon,
  Heart,
  GraduationCap,
  Trophy,
} from "lucide-react";

// --- Liquid Glass Helper Classes ---
// Adds the "wet" look, high saturation, and inner reflections
const liquidGlassClass =
  "bg-gradient-to-br from-white/10 via-white/5 to-transparent " +
  "backdrop-blur-[20px] backdrop-saturate-[180%] " +
  "border border-white/20 " +
  "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_8px_32px_rgba(0,0,0,0.3)] " +
  "relative overflow-hidden group";

// Reusable Circular Progress Component for Skills
const SkillCircle = ({ percentage, color = "text-blue-500" }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-slate-800/50"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <span className="absolute text-xs font-bold text-white">
        {percentage}%
      </span>
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {/* --- CSS for Liquid Animation --- */}
      <style>{`
        @keyframes float-liquid {
          0%, 100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          33% { transform: translate(30px, -50px) scale(1.1); border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          66% { transform: translate(-20px, 20px) scale(0.9); border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; }
        }
        .liquid-blob {
          animation: float-liquid 20s infinite ease-in-out;
        }
      `}</style>

      {/* --- Background: The Fluid Engine --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="liquid-blob absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/30 mix-blend-screen blur-[80px]"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="liquid-blob absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/20 mix-blend-screen blur-[80px]"
          style={{ animationDelay: "-5s" }}
        ></div>
        <div
          className="liquid-blob absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/30 mix-blend-screen blur-[100px]"
          style={{ animationDelay: "-10s" }}
        ></div>
        <div
          className="liquid-blob absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-pink-500/15 mix-blend-screen blur-[60px]"
          style={{ animationDelay: "-15s" }}
        ></div>
      </div>

      {/* --- Sidebar (Full Height Liquid Glass Pane) --- */}
      <aside className="w-64 flex flex-col fixed h-full z-20 transition-all border-r border-white/20 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-[30px] backdrop-saturate-[180%] shadow-[5px_0_30px_0_rgba(0,0,0,0.3)]">
        <div className="p-6 flex items-center gap-2 text-white font-bold text-xl relative z-10">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center justify-center">
            <div className="w-3 h-3 bg-white/80 rounded-full blur-[1px]"></div>
          </div>
          <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
            SyncUp
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 relative z-10">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<BookOpen size={20} />} label="Courses" />
          <NavItem icon={<User size={20} />} label="Profile" active />
          <NavItem icon={<Users size={20} />} label="Community" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-white/10 relative z-10 bg-white/5">
          <button className="flex items-center gap-3 text-slate-300 hover:text-white w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 ml-64 p-8 lg:p-12 relative z-10">
        {/* Header Profile Section */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back
        </button>
        <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
              <div className="w-24 h-24 relative rounded-full border-2 border-white/20 bg-gradient-to-b from-slate-800 to-black flex items-center justify-center overflow-hidden shadow-2xl">
                <User size={48} className="text-slate-300" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 mb-2 drop-shadow-lg">
                Alexandria Doe
              </h1>
              <p className="text-cyan-400/80 text-sm font-medium tracking-wide mb-1">
                @alex_doe • PRO Member
              </p>
              <p className="text-slate-500 text-xs">Joined January 2023</p>
            </div>
          </div>
          <div className="flex gap-3 mt-2 md:mt-0">
            <button
              className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${liquidGlassClass}`}
            >
              Edit Profile
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95">
              Share Profile
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Courses Completed"
            value="28"
            icon={<BookOpen size={16} className="text-cyan-400" />}
          />
          <StatCard
            title="Total Points"
            value="14,500"
            icon={<Award size={16} className="text-purple-400" />}
          />
          <StatCard
            title="Hours Learned"
            value="120"
            icon={<Moon size={16} className="text-amber-400" />}
          />

          {/* Special Liquid Gem Card for Streak */}
          <div className="rounded-3xl p-6 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-purple-600/20 backdrop-blur-xl border border-white/20"></div>
            {/* Noise texture for the "Gem" look */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            <div className="relative z-10 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-200 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-md">
                    Current Streak
                  </p>
                  <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-amber-200 drop-shadow-sm">
                    42
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                  <Flame className="text-amber-400 fill-amber-400" size={20} />
                </div>
              </div>
              <div className="mt-4 w-full h-1 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-300 to-orange-500 w-[70%] shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Activity & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Calendar Activity - Liquid Glass */}
          <div className={`lg:col-span-2 rounded-3xl p-8 ${liquidGlassClass}`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Activity Log
              </h2>
              <div className="flex items-center gap-4 bg-black/20 rounded-full px-4 py-1.5 border border-white/5">
                <ChevronLeft
                  size={16}
                  className="text-slate-400 hover:text-white cursor-pointer"
                />
                <span className="font-medium text-sm text-cyan-50">
                  August 2024
                </span>
                <ChevronRight
                  size={16}
                  className="text-slate-400 hover:text-white cursor-pointer"
                />
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center text-sm max-w-lg mx-auto">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div
                  key={d}
                  className="text-cyan-200/50 text-xs font-bold uppercase"
                >
                  {d}
                </div>
              ))}
              <div className="col-span-4"></div> {/* Spacer */}
              <Day active>1</Day> <Day>2</Day> <Day>3</Day>
              <Day>4</Day> <Day active>5</Day> <Day active>6</Day>{" "}
              <Day active>7</Day> <Day active>8</Day> <Day>9</Day>{" "}
              <Day active>10</Day>
              <Day>11</Day> <Day active>12</Day> <Day>13</Day>{" "}
              <Day active>14</Day> <Day active>15</Day> <Day active>16</Day>{" "}
              <Day>17</Day>
              <Day>18</Day> <Day active>19</Day> <Day>20</Day>{" "}
              <Day active>21</Day> <Day>22</Day> <Day active>23</Day>{" "}
              <Day active>24</Day>
              <Day active>25</Day> <Day>26</Day> <Day>27</Day>{" "}
              <Day active>28</Day> <Day active>29</Day> <Day active>30</Day>{" "}
              <Day active>31</Day>
            </div>
          </div>

          {/* Badges Section - Liquid Glass */}
          <div className={`rounded-3xl p-6 ${liquidGlassClass}`}>
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
              Badges
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <Badge
                icon={
                  <Award className="text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
                }
                label="Perfect"
                achieved
              />
              <Badge
                icon={
                  <Flame className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                }
                label="Streak"
                achieved
              />
              <Badge
                icon={
                  <Zap className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                }
                label="Fast"
                achieved
              />
              <Badge
                icon={
                  <GraduationCap className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                }
                label="Done"
                achieved
              />

              <Badge icon={<Moon />} label="Night" />
              <Badge icon={<Heart />} label="Helper" />
              <Badge icon={<Trophy />} label="Top 1%" />
              <Badge icon={<GraduationCap />} label="Scholar" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Skills & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Mastery */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">
              Skills Mastery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkillCard
                title="UI/UX Design"
                level="Advanced"
                percent={90}
                color="text-cyan-400"
              />
              <SkillCard
                title="Python"
                level="Intermediate"
                percent={75}
                color="text-blue-400"
              />
              <SkillCard
                title="Data Science"
                level="Intermediate"
                percent={60}
                color="text-purple-400"
              />
              <SkillCard
                title="Machine Learning"
                level="Beginner"
                percent={45}
                color="text-slate-400"
              />
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Leaderboard</h2>
            </div>

            {/* Leaderboard Glass Card */}
            <div className={`rounded-3xl p-6 ${liquidGlassClass}`}>
              <div className="flex gap-4 mb-6 text-sm border-b border-white/10 pb-4">
                <span className="text-white font-bold cursor-pointer">
                  Global
                </span>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Friends
                </span>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Weekly
                </span>
              </div>

              <div className="space-y-4">
                <LeaderboardItem rank="9" name="John Smith" points="15,200" />

                {/* Current User Highlight - Glassy pop with gradient */}
                <div className="flex items-center p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] transform scale-[1.02]">
                  <span className="w-8 text-center font-black text-cyan-300 text-sm">
                    10
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/20 ml-2 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-bold text-white">You</p>
                    <p className="text-xs text-cyan-200/70">14,500 pts</p>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                    +12%
                  </div>
                </div>

                <LeaderboardItem
                  rank="11"
                  name="Michael Chen"
                  points="14,350"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components (Updated with Liquid Styles) ---

const NavItem = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
      active ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/5 border-l-4 border-cyan-400"></div>
    )}
    <div
      className={`relative z-10 ${
        active
          ? "text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
          : "group-hover:text-cyan-200"
      }`}
    >
      {icon}
    </div>
    <span className="font-medium text-sm relative z-10">{label}</span>
  </a>
);

const StatCard = ({ title, value, icon }) => (
  // Switched to liquid glass style
  <div
    className={`rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] ${liquidGlassClass}`}
  >
    <div className="flex justify-between items-start mb-4">
      <p className="text-cyan-100/60 text-xs font-bold uppercase tracking-wider">
        {title}
      </p>
      <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-inner">
        {icon}
      </div>
    </div>
    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
  </div>
);

const Day = ({ children, active }) => (
  <div
    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 ${
      active
        ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110 border border-white/20"
        : "text-slate-400 hover:bg-white/10 hover:text-white hover:scale-105"
    }`}
  >
    {children}
  </div>
);

const Badge = ({ icon, label, achieved }) => (
  <div className="flex flex-col items-center gap-2 text-center group cursor-pointer">
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
        achieved
          ? "bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          : "bg-transparent opacity-20 grayscale border border-transparent"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] font-bold uppercase tracking-widest ${
        achieved ? "text-cyan-100/80" : "text-slate-600"
      }`}
    >
      {label}
    </span>
  </div>
);

const SkillCard = ({ title, level, percent, color }) => (
  <div
    className={`rounded-2xl p-5 flex items-center justify-between transition-transform hover:-translate-y-1 ${liquidGlassClass}`}
  >
    <div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-slate-400 text-xs font-medium">{level}</p>
    </div>
    <SkillCircle percentage={percent} color={color} />
  </div>
);

const LeaderboardItem = ({ rank, name, points }) => (
  <div className="flex items-center px-4 py-3 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
    <span className="w-8 text-center font-bold text-slate-500 text-sm">
      {rank}
    </span>
    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 ml-2 flex items-center justify-center text-white text-xs">
      IMG
    </div>
    <div className="ml-3">
      <p className="text-sm font-semibold text-slate-200">{name}</p>
      <p className="text-xs text-slate-500">{points} pts</p>
    </div>
  </div>
);

export default ProfilePage;
