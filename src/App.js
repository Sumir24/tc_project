import React from "react";
import LandingPage from "./pages/landing_page";
import LearnAIPlatform from "./pages/trail";
import CoursePage from "./pages/course_page";
import ProfilePage from "./pages/profile";
import ExplorePage from "./pages/explore";
import ReelPage from "./pages/reel_page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trail" element={<LearnAIPlatform />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reel" element={<ReelPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
