import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { LoginContext } from './context/LoginContext';
import LandingPage from './pages/LandingPage';
import PlayGroundPage from './pages/PlayGroundPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <LoginContext.Provider value={{ user, setUser }}>
        <div className="App select-none">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/playground" element={<PlayGroundPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
