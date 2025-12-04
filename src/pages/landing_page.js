import React from "react";
import {
  Play,
  BookOpen,
  Brain,
  Check,
  User,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Star,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Premium Animation & Styles ---
const animationStyle = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  .float-element {
    animation: float-slow 8s ease-in-out infinite;
  }
  .noise-bg {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
  .luxury-gradient-text {
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* --- Apple-style Spring Physics --- */
  
  /* Smooth settling for layout changes and hovers */
  .spring-smooth {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Bouncy pop for small UI elements like icons */
  .spring-bouncy {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  /* Micro-interaction: button press feel */
  .active-spring:active {
    transform: scale(0.96);
  }
`;

// --- Components ---

const GlassCard = ({ icon, title, description, delay = 0 }) => (
  <div
    className="group relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-white/[0.01] p-10 spring-smooth hover:bg-white/[0.03] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] hover:border-white/[0.1]"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 spring-smooth group-hover:opacity-100"></div>
    <div className="relative z-10 flex flex-col items-start">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] text-indigo-300 spring-smooth group-hover:bg-indigo-500 group-hover:text-white spring-bouncy group-hover:scale-110 shadow-2xl">
        {icon}
      </div>
      <h3 className="mb-4 text-2xl font-semibold text-white tracking-tight">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-base font-light">
        {description}
      </p>
    </div>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex flex-col items-start p-10 rounded-[2.5rem] border border-white/[0.03] bg-white/[0.01] spring-smooth hover:bg-white/[0.02] hover:border-white/[0.08] relative overflow-hidden group">
    <div className="absolute -right-10 -top-10 text-[12rem] font-bold text-white/[0.01] spring-smooth group-hover:text-white/[0.03] pointer-events-none select-none font-serif group-hover:scale-110 group-hover:rotate-12">
      {number}
    </div>
    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-white font-mono text-sm mb-8 relative z-10 spring-smooth group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 group-hover:scale-110">
      0{number}
    </div>
    <h3 className="text-xl font-semibold text-white mb-4 relative z-10 tracking-tight">
      {title}
    </h3>
    <p className="text-base text-slate-400 leading-relaxed relative z-10 font-light">
      {description}
    </p>
  </div>
);

const TestimonialCard = ({ name, role, quote, img }) => (
  <div className="rounded-[2rem] border border-white/[0.05] bg-[#0A0F1E]/40 p-10 backdrop-blur-md relative spring-smooth hover:border-white/[0.1] hover:bg-[#0A0F1E]/60 hover:-translate-y-1">
    <div className="flex items-center gap-5 mb-8">
      <div className="h-14 w-14 rounded-full bg-slate-800 p-[2px] bg-gradient-to-br from-indigo-500/50 to-transparent spring-smooth group-hover:scale-105">
        <div
          className="h-full w-full rounded-full bg-slate-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
      <div>
        <h4 className="font-semibold text-white text-base tracking-wide">
          {name}
        </h4>
        <p className="text-xs text-indigo-300/80 uppercase tracking-widest font-medium mt-1">
          {role}
        </p>
      </div>
    </div>
    <p className="text-slate-300 text-lg leading-8 font-light italic opacity-90">
      "{quote}"
    </p>
    <div className="flex gap-1.5 mt-8 opacity-60">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className="fill-white text-white" />
      ))}
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#03050c] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <style>{animationStyle}</style>

      {/* Background Ambient Effects - Slower, Moodier */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-950/30 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[800px] h-[800px] bg-blue-950/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[900px] h-[900px] bg-purple-950/20 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 noise-bg opacity-[0.03]"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.03] bg-[#03050c]/70 backdrop-blur-2xl spring-smooth">
        <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <button onClick={() => navigate(-1)} className="mr-2 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
            </button>
            <div className="h-10 w-10 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center spring-smooth group-hover:bg-white/[0.1] group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>
            <span className="font-semibold text-white text-xl tracking-tight">
              LearnAI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-sm font-medium text-slate-400">
            {["Features", "Pricing", "About", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white spring-smooth tracking-wide relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white spring-smooth group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white spring-smooth tracking-wide">
              Log In
            </button>
            <button className="bg-white text-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-slate-200 spring-smooth shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active-spring">
              Get Started
            </button>
            <button className="md:hidden text-white p-2">
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-40 px-6">
        {/* --- Hero Section --- */}
        <div className="max-w-5xl mx-auto text-center mb-40 pt-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-300 text-xs font-medium mb-12 animate-fade-in-up backdrop-blur-sm shadow-xl spring-smooth hover:bg-white/[0.05] hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="tracking-wider uppercase">
              Reimagining Education
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-medium text-white mb-10 tracking-tight leading-[1.1] float-element">
            Smarter Learning, <br />
            <span className="luxury-gradient-text italic font-serif">
              in Minutes.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            Our AI-powered platform delivers bite-sized micro-courses tailored
            specifically to your unique pace and interests.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate("/trail")}
              className="group w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-base hover:bg-slate-100 spring-smooth shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] active-spring flex items-center justify-center gap-3"
            >
              Start Free Trial{" "}
              <ChevronRight
                size={18}
                className="spring-bouncy group-hover:translate-x-1"
              />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full font-medium text-base text-white border border-white/[0.1] hover:bg-white/[0.05] spring-smooth flex items-center justify-center gap-3 backdrop-blur-sm hover:scale-105 active-spring group">
              <Play
                size={18}
                className="fill-white spring-bouncy group-hover:scale-110"
              />{" "}
              View Showreel
            </button>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <div className="max-w-[1400px] mx-auto mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
                The Future of Learning
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Discover a revolutionary way to gain knowledge designed
                specifically for the modern world.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white spring-smooth mt-8 md:mt-0 group">
              View all features{" "}
              <ArrowRight
                size={16}
                className="spring-bouncy group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard
              icon={<Brain size={28} />}
              title="AI-Powered Learning"
              description="Our intelligent system personalizes your learning path, adapting to your style and pace for maximum retention."
              delay={0}
            />
            <GlassCard
              icon={<Play size={28} className="ml-1" />}
              title="Cinematic Reels"
              description="Engage with dynamic, high-fidelity video content that makes learning complex topics compelling and cinematic."
              delay={150}
            />
            <GlassCard
              icon={<BookOpen size={28} />}
              title="Micro-courses"
              description="Master new skills quickly with focused, outcome-driven courses you can complete in minutes, not weeks."
              delay={300}
            />
          </div>
        </div>

        {/* --- How It Works --- */}
        <div className="max-w-[1400px] mx-auto mb-48 relative">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
              Effortless Progression
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Create Account"
              description="Sign up in seconds. No credit card required. Tell us about your goals."
            />
            <StepCard
              number="2"
              title="AI Curation"
              description="Our proprietary algorithm builds a bespoke curriculum just for you."
            />
            <StepCard
              number="3"
              title="Master Skills"
              description="Consume bite-sized content daily and track your rapid progress."
            />
          </div>
        </div>

        {/* --- Testimonials --- */}
        <div className="max-w-[1400px] mx-auto mb-48">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-20 text-center tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Sarah L."
              role="Product Manager @ TechFlow"
              img="https://i.pravatar.cc/150?img=5"
              quote="LearnAI has redefined my professional development. The micro-courses fit perfectly into my schedule, and the AI recommendations are eerily accurate."
            />
            <TestimonialCard
              name="David Chen"
              role="Senior Engineer @ Stack"
              img="https://i.pravatar.cc/150?img=11"
              quote="The production quality of the reels makes learning complex topics feel like watching a documentary. I've learned more in a week than I did in months prior."
            />
          </div>
        </div>

        {/* --- CTA Footer --- */}
        <div className="max-w-[1200px] mx-auto pb-20">
          <div className="relative rounded-[3rem] overflow-hidden px-8 py-24 md:p-32 text-center group border border-white/[0.05] spring-smooth hover:border-white/[0.1] hover:shadow-[0_0_80px_-20px_rgba(79,70,229,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 spring-smooth duration-1000 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tight leading-tight">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Join an elite community of learners. Start your personalized
                journey today. Fast, fun, and free to start.
              </p>
              <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:bg-slate-100 spring-smooth hover:scale-105 active-spring">
                Begin Your Journey
              </button>
            </div>
          </div>

          <div className="mt-20 border-t border-white/[0.05] pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-light">
            <p>© 2024 LearnAI. Crafted for excellence.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white spring-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white spring-smooth">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white spring-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
