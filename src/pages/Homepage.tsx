import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Users, Target, Volume2, VolumeX } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import CharacterCarousel from '../components/CharacterCarousel';
import GameStats from '../components/GameStats';
import ParticleSystem from '../components/ParticleSystem';

function RedGreenLight() {
  const [isRed, setIsRed] = useState(true);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRed((prev) => !prev);
      setIntensity(Math.random() * 0.5 + 0.5);
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-80 flex items-center justify-center">
      {/* Doll */}
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ 
          rotate: isRed ? [10, -5, 10] : [-10, 5, -10],
          scale: isRed ? [1, 1.1, 1] : [1, 0.95, 1]
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-2xl border-4 border-red-500 flex items-center justify-center text-4xl font-bold text-black"
      >
        <motion.div
          animate={{ scale: isRed ? [1, 1.2, 1] : [1, 0.9, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          👧
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${isRed ? 'bg-red-500' : 'bg-green-500'}`}
          animate={{ 
            opacity: [0, intensity * 0.3, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Light status with dramatic effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isRed ? "red" : "green"}
          initial={{ opacity: 0, scale: 0.5, y: -50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            textShadow: isRed 
              ? ['0 0 10px rgb(239 68 68)', '0 0 30px rgb(239 68 68)', '0 0 10px rgb(239 68 68)']
              : ['0 0 10px rgb(34 197 94)', '0 0 30px rgb(34 197 94)', '0 0 10px rgb(34 197 94)']
          }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl font-extrabold ${
            isRed ? "text-red-500" : "text-green-400"
          }`}
        >
          {isRed ? "🔴 RED LIGHT" : "🟢 GREEN LIGHT"}
        </motion.div>
      </AnimatePresence>

      {/* Sound waves effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={isRed ? {} : { scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border-2 rounded-full ${isRed ? 'border-red-500/30' : 'border-green-400/30'}`}
            style={{ width: `${(i + 1) * 100}px`, height: `${(i + 1) * 100}px` }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

const Homepage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <ParticleSystem />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center relative z-10"
        >
          <motion.div
            className="relative mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full mx-auto relative">
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-r-red-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl font-bold text-white mb-4"
              animate={{ 
                textShadow: [
                  '0 0 10px rgb(239 68 68)',
                  '0 0 30px rgb(239 68 68)',
                  '0 0 10px rgb(239 68 68)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ENTERING THE GAME
            </motion.h1>
            
            <motion.div
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-red-600 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleSystem />
      
      {/* Cursor follower effect */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-10 h-10 bg-red-600/20 rounded-full border border-red-500/50" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900/30"
            animate={{ 
              background: [
                'linear-gradient(45deg, black, #111827, rgba(127, 29, 29, 0.3))',
                'linear-gradient(45deg, black, #1f2937, rgba(127, 29, 29, 0.4))',
                'linear-gradient(45deg, black, #111827, rgba(127, 29, 29, 0.3))'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold text-white mb-8 tracking-wider relative"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              SQUID
              <motion.span 
                className="block text-red-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                GAME
              </motion.span>
              
              {/* Glitch effect */}
              <motion.div
                className="absolute inset-0 text-red-500 opacity-20"
                animate={{ 
                  x: [0, -2, 2, 0],
                  y: [0, 1, -1, 0]
                }}
                transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
              >
                SQUID<span className="block">GAME</span>
              </motion.div>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Enter the ultimate survival game where childhood memories become deadly reality
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button 
                className="flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Play size={28} className="group-hover:scale-110 transition-transform relative z-10" />
                <span className="text-xl font-semibold relative z-10">Watch Trailer</span>
              </motion.button>
              
              <motion.button 
                className="flex items-center space-x-4 px-10 py-5 border-2 border-red-600 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-xl font-semibold">View Characters</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>

        {/* Enhanced Floating Symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-red-600/30 font-bold"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 30}%`,
                fontSize: `${40 + Math.random() * 40}px`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-15, 15, -15],
                rotate: [0, 360, 0],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {['●', '▲', '■'][i % 3]}
            </motion.div>
          ))}
        </div>

        {/* Sound toggle */}
        <motion.button
          className="absolute top-8 right-8 p-4 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 hover:bg-red-600/40 transition-all duration-300 z-20"
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      </section>

      {/* Enhanced Red Light Green Light Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 40px rgba(239, 68, 68, 0.6)',
                  '0 0 20px rgba(239, 68, 68, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Red Light <span className="text-red-600">&</span> Green Light
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Move when the light is green. Freeze when it's red. Or be eliminated.
            </motion.p>
          </motion.div>

          <RedGreenLight />
        </div>
      </section>

      {/* Enhanced Character Carousel */}
      <section className="py-32 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 40px rgba(239, 68, 68, 0.6)',
                  '0 0 20px rgba(239, 68, 68, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Meet the <span className="text-red-600">Players</span>
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Each with their own story, their own desperation
            </motion.p>
          </motion.div>
          
          <CharacterCarousel />
        </div>
      </section>

      {/* Enhanced Game Stats */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <GameStats />
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 bg-gradient-to-t from-red-900/30 to-gray-900 relative">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.5)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Are You Ready to <span className="text-red-600">Play?</span>
            </motion.h2>
            
            <motion.p 
              className="text-2xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              456 players entered. Only one survived. Will you be different?
            </motion.p>
            
            <motion.button 
              className="px-16 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold text-2xl shadow-2xl relative overflow-hidden group"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 60px rgba(239, 68, 68, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Join the Game</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;