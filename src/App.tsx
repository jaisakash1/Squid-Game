import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import Characters from './pages/Characters';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import Quiz from './pages/Quiz';
import MaskGallery from './components/MaskGallery';
import JoinGameModal from './components/JoinGameModal';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showMaskGallery, setShowMaskGallery] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (soundEnabled) {
      // Simulate eerie sound transition
      console.log('🔊 Eerie transition sound...');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <Navigation 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          setShowJoinModal={setShowJoinModal}
          setShowMaskGallery={setShowMaskGallery}
        />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </motion.main>

        <AnimatePresence>
          {showJoinModal && (
            <JoinGameModal 
              isOpen={showJoinModal}
              onClose={() => setShowJoinModal(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMaskGallery && (
            <MaskGallery 
              isOpen={showMaskGallery}
              onClose={() => setShowMaskGallery(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;