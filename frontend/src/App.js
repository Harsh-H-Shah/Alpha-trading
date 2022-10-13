import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { BalanceContext } from './context/BalanceContext';
import { ShareContext } from './context/ShareContext';
import { PricesContext } from './context/PricesContext';
import LandingPage from './pages/LandingPage';
import PortfolioPage from './pages/PortfolioPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import TermPage from './pages/TermPage';
import SignupPage from './pages/SignupPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(500000);
  const [shares, setShares] = useState([]);
  const [prices, setPrices] = useState([]);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <BalanceContext.Provider value={{ balance, setBalance }}>
          <ShareContext.Provider value={{ shares, setShares }}>
            <PricesContext.Provider value={{ prices, setPrices }}>
              <div className="App bg-gray-100 min-h-screen">
                <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/terms" element={<TermPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                </Routes>
              </div>
            </PricesContext.Provider>
          </ShareContext.Provider>
        </BalanceContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
