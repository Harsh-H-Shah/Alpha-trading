import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import PlayGroundPage from './pages/PlayGroundPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import TermPage from './pages/TermPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App select-none bg-gray-100 h-screen">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/playground" element={<PlayGroundPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/terms" element={<TermPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
