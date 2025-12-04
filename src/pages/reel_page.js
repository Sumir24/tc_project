import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ListMusic, 
  User, 
  Settings, 
  LogOut, 
  Heart, 
  Bookmark, 
  Share2, 
  ListPlus, 
  Play, 
  FileText, 
  HelpCircle,
  ChevronUp,
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import coursesData from '../data/courses.json';

const ReelPage = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playlist, setPlaylist] = useState([]);

  // Flatten lessons from all courses into a single playlist
  useEffect(() => {
    const allLessons = coursesData.courses.flatMap(course => 
      course.lessons.filter(lesson => lesson.ytId).map(lesson => ({
        ...lesson,
        courseTitle: course.title,
        courseId: course.id
      }))
    );
    setPlaylist(allLessons);
  }, []);

  const handleNext = () => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, playlist.length]);

  const currentVideo = playlist[currentVideoIndex];

  if (!currentVideo) return <div className="text-white flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className="w-64 flex flex-col justify-between p-6 border-r border-gray-800/50 bg-[#0d0d12]">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 text-white">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-lg">⚡</span>
            </div>
            <h1 className="text-xl font-bold tracking-wide">LearnAI</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden border-2 border-gray-700">
              <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Alex Johnson</h3>
              <p className="text-xs text-gray-500">Lifelong Learner</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <NavItem icon={<Home size={20} />} label="Home" active />
            <NavItem icon={<ListMusic size={20} />} label="Playlists" />
            <NavItem icon={<User size={20} />} label="Profile" />
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <button className="flex items-center gap-4 px-4 py-3 text-sm font-medium hover:text-white transition-colors w-full text-left">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex justify-center items-center relative">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate('/courses')} 
            className="absolute top-8 left-8 p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white transition-all z-20 flex items-center gap-2"
        >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back</span>
        </button>

        {/* Navigation Controls */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button 
                onClick={handlePrev}
                disabled={currentVideoIndex === 0}
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white disabled:opacity-30 transition-all"
            >
                <ChevronUp size={24} />
            </button>
            <button 
                onClick={handleNext}
                disabled={currentVideoIndex === playlist.length - 1}
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 text-white disabled:opacity-30 transition-all"
            >
                <ChevronDown size={24} />
            </button>
        </div>

        {/* Video Container */}
        <div className="relative w-[400px] h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 group">
          
          {/* YouTube Iframe */}
          <div className="absolute inset-0 bg-black">
             <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${currentVideo.ytId}?autoplay=1&controls=0&rel=0&modestbranding=1&loop=1`} 
                title={currentVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full object-cover"
             ></iframe>
          </div>

          {/* Right Side Interaction Bar (Floating outside or inside edge) */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-10">
            <ActionItem icon={<Heart size={24} fill="white" />} label="12.3k" />
            <ActionItem icon={<Bookmark size={24} />} label="2.1k" />
            <ActionItem icon={<Share2 size={24} />} label="845" />
            <ActionItem icon={<ListPlus size={24} />} label="450" />
          </div>

          {/* Bottom Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pointer-events-none">
            
            {/* AI Floating Buttons */}
            <div className="flex flex-col gap-2 items-end mb-4 mr-12 pointer-events-auto">
               <button className="flex items-center gap-2 bg-gray-600/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white hover:bg-gray-600/60 border border-white/10">
                 <FileText size={14} /> AI Summary
               </button>
               <button className="flex items-center gap-2 bg-gray-600/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white hover:bg-gray-600/60 border border-white/10">
                 <HelpCircle size={14} /> AI Quiz
               </button>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-blue-500">
                 <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                    {currentVideo.creator ? currentVideo.creator.substring(0, 2).toUpperCase() : 'AI'}
                 </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{currentVideo.creator}</h3>
                <p className="text-xs text-gray-300">{currentVideo.title}</p>
              </div>
              <button className="ml-2 border border-white/20 text-[10px] px-2 py-0.5 rounded-full text-white pointer-events-auto hover:bg-white/10">Follow</button>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pointer-events-auto">
              <Tag label={currentVideo.courseTitle} active />
              <Tag label="Programming" />
              <Tag label="LearnAI" />
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden mb-1">
              <div className="w-1/3 h-full bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub Components for cleanliness ---

const NavItem = ({ icon, label, active }) => (
  <button className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full text-left ${
    active 
    ? 'bg-[#1e1e2d] text-blue-400 font-semibold' 
    : 'hover:bg-[#1e1e2d] hover:text-white'
  }`}>
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const ActionItem = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1">
    <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors">
      {icon}
    </button>
    <span className="text-xs font-semibold text-white drop-shadow-md">{label}</span>
  </div>
);

const Tag = ({ label, active }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-medium backdrop-blur-md border border-white/10 whitespace-nowrap ${
    active ? 'bg-blue-600/80 text-white' : 'bg-white/10 text-gray-200'
  }`}>
    {label}
  </span>
);

export default ReelPage;