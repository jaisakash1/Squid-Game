import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Moon, Sun, Users, Target, Trophy, HelpCircle } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setShowJoinModal: (show: boolean) => void;
  setShowMaskGallery: (show: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  toggleDarkMode,
  soundEnabled,
  setSoundEnabled,
  setShowJoinModal,
  setShowMaskGallery
}) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', symbol: '●', icon: Target },
    { path: '/characters', label: 'Characters', symbol: '▲', icon: Users },
    { path: '/games', label: 'Games', symbol: '■', icon: Target },
    // { path: '/leaderboard', label: 'Leaderboard', symbol: '●', icon: Trophy },
    { path: '/quiz', label: 'Quiz', symbol: '▲', icon: HelpCircle },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-600/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-25 h-20  flex items-center justify-center">
           <img src="public/squid-game-high-quality-official-logo-hd-png-701751694778116qpwrsfyl0o-removebg-preview.png"/>
            </div>
          
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-red-600/20 text-red-400' 
                      : 'text-gray-300 hover:text-red-400 hover:bg-red-600/10'
                  }`}
                >
                  <span className={`text-lg font-bold transition-all duration-300 ${
                    isActive ? 'text-red-400 scale-110' : 'text-gray-500 group-hover:text-red-400'
                  }`}>
                    {item.symbol}
                  </span>
                  <Icon size={16} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                soundEnabled 
                  ? 'bg-green-600/20 text-green-400' 
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:text-white transition-all duration-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mask Gallery Button */}
            <button
              onClick={() => setShowMaskGallery(true)}
              className="hidden lg:block px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Masks
            </button>

            {/* Join Game CTA */}
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-600/25"
            >
              Join Game
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;