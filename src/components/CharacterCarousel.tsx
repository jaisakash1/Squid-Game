import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "../lib/utils";

interface Character {
  id: number;
  name: string;
  actor: string;
  player: string;
  image: string;
  status: 'alive' | 'dead' | 'unknown';
  morality: 'good' | 'evil' | 'neutral';
  bio: string;
  season: number;
}

const characters: Character[] = [
  // Season 1 Characters
     {
    id: 1,
    name: "The Recruiter",
    actor: "Gong Yoo",
    player: "Salesman",
    image: "public/squid game players/salesman.jpg",
    status: "alive",
    morality: "evil",
    bio: "The charismatic recruiter who lures desperate people into the deadly games with promises of easy money.",
    season: 1,
  },
  {
    id: 2,
    name: "Seong Gi-hun",
    actor: "Lee Jung-jae",
    player: "Player 456",
    image: "../public/squid game players/player 456.jpg",
    status: "alive",
    morality: "good",
    bio: "The sole survivor of the first games, now returning with a mission to stop the deadly competition and save others from the same fate.",
    season: 1,
  },
 
  {
    id: 3,
    name: "The Front Man",
    actor: "Lee Byung-hun",
    player: "Game Master",
    image: "public/squid game players/frontman.jpg",
    status: "alive",
    morality: "evil",
    bio: "The mysterious masked leader who oversees the deadly games with ruthless efficiency and unwavering control.",
    season: 1,
  },
  {
    id: 4,
    name: "Hwang Jun-ho",
    actor: "Wi Ha-jun",
    player: "Detective",
    image: "public/squid game players/wiha jun.jpg",
    status: "unknown",
    morality: "good",
    bio: "Police detective who infiltrated the games to find his missing brother, uncovering the dark truth behind the organization.",
    season: 1,
  },
// Season 2 New Characters
  {
    id: 5,
    name: "Myung-gi",
    actor: "Yim Si-wan",
    player: "Player 333",
    image: "public/squid game players/333.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A new player entering the games with his own desperate circumstances and hidden motivations.",
    season: 2,
  },
  {
    id: 6,
    name: "Dae-ho",
    actor: "Kang Ha-neul",
    player: "Player 388",
    image: "public/squid game players/388.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "Another contestant drawn into the deadly competition, fighting for survival and a chance at a better life.",
    season: 2,
  },
  {
    id: 7,
    name: "Gyeong-seok",
    actor: "Lee Jin-uk",
    player: "Player 246",
    image: "public/squid game players/246.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A player whose past and motivations remain shrouded in mystery as he navigates the deadly games.",
    season: 2,
  },
  {
    id: 8,
    name: "Hyun-ju",
    actor: "Park Sung-hoon",
    player: "Player 120",
    image: "public/squid game players/120.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A contestant facing their own life-or-death situation, bringing unique skills to the competition.",
    season: 2,
  },
  {
    id: 9,
    name: "Yong-sik",
    actor: "Yang Dong-geun",
    player: "Player 007",
    image: "public/squid game players/007.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "Player 007 brings his own unique background and survival instincts to the deadly competition.",
    season: 2,
  },
  {
    id: 10,
    name: "Geum-ja",
    actor: "Kang Ae-sim",
    player: "Player 149",
    image: "public/squid game players/149.jpg",
    status: "unknown",
    morality: "good",
    bio: "An older contestant whose wisdom and life experience may prove valuable in the psychological warfare of the games.",
    season: 2,
  },
  {
    id: 11,
    name: "Jung-bae",
    actor: "Lee Seo-hwan",
    player: "Player 390",
    image: "public/squid game players/390.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A player whose loyalty and alliances will be tested as the games progress and trust becomes a luxury.",
    season: 2,
  },
  {
    id: 12,
    name: "Jun-hee",
    actor: "Jo Yuri",
    player: "Player 222",
    image: "public/squid game players/222.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A young contestant facing the ultimate test of survival, courage, and moral choices in the deadly arena.",
    season: 2,
  },
  {
    id: 13,
    name: "No-eul",
    actor: "Park Gyu-young",
    player: "Guard",
    image: "public/squid game players/parkgu yong.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A mysterious figure whose role in the games remains unclear, potentially holding key information.",
    season: 2,
  },
  {
    id: 14,
    name: "Seon-nyeo",
    actor: "Chae Kuk-hee",
    player: "Player 044",
    image: "public/squid game players/044.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A contestant whose survival instincts and adaptability will be put to the ultimate test.",
    season: 2,
  },
  {
    id: 15,
    name: "Min-su",
    actor: "Lee David",
    player: "Player 125",
    image: "public/squid game players/125.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A player entering the games with his own compelling backstory and reasons for risking everything.",
    season: 2,
  },
  {
    id: 16,
    name: "Nam-gyu",
    actor: "Roh Jae-won",
    player: "Player 124",
    image: "public/squid game players/124.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A contestant whose fate hangs in the balance as he faces the psychological and physical challenges ahead.",
    season: 2,
  },
  {
    id: 17,
    name: "Thanos",
    actor: "Choi Seung-hyun",
    player: "Player 230",
    image: "public/squid game players/230.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A player with a distinctive name and personality, entering the high-stakes competition with confidence.",
    season: 2,
  },
  {
    id: 18,
    name: "Se-mi",
    actor: "Won Ji-an",
    player: "Player 380",
    image: "public/squid game players/380.jpg",
    status: "unknown",
    morality: "neutral",
    bio: "A young contestant whose journey in the games has just begun, facing unimaginable challenges ahead.",
    season: 2,
  }
];

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (!context) throw new Error('useMouseEnter must be used within provider');
  return context;
};

export const CardContainer = ({ children, className, containerClassName }: { children?: React.ReactNode; className?: string; containerClassName?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15; // More sensitive
    const y = (e.clientY - top - height / 2) / 15;
    
    setMousePosition({ x, y });
    
    // Enhanced 3D transform with multiple effects
    const rotateX = -y * 0.8;
    const rotateY = x * 0.8;
    const translateZ = isMouseEntered ? 50 : 0;
    
    containerRef.current.style.transform = `
      perspective(1200px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(${translateZ}px)
      scale(${isMouseEntered ? 1.05 : 1})
    `;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{ perspective: '1200px' }}
      >
        <motion.div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsMouseEntered(false);
            setMousePosition({ x: 0, y: 0 });
            if (containerRef.current) {
              containerRef.current.style.transform = `
                perspective(1200px) 
                rotateX(0deg) 
                rotateY(0deg) 
                translateZ(0px)
                scale(1)
              `;
            }
          }}
          className={cn('transition-all duration-300 ease-out', className)}
          style={{ 
            transformStyle: 'preserve-3d',
            filter: isMouseEntered ? 'drop-shadow(0 25px 50px rgba(239, 68, 68, 0.4))' : 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
          }}
          whileHover={{ 
            scale: 1.02,
            rotateX: mousePosition.y * -0.1,
            rotateY: mousePosition.x * 0.1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]', className)}>{children}</div>
);

export const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  }, [isMouseEntered]);

  return (
    <Tag ref={ref} className={cn('transition duration-200 ease-linear', className)} {...rest}>
      {children}
    </Tag>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(status)}`}
    >
      {status.toUpperCase()}
    </motion.div>
  );
};

const MoralityBadge = ({ morality }: { morality: string }) => {
  const getMoralityColor = (morality: string) => {
    switch (morality) {
      case 'good': return 'bg-blue-500';
      case 'evil': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getMoralityColor(morality)}`}
    >
      {morality.toUpperCase()}
    </motion.div>
  );
};

const CharacterCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const character = characters[index];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % characters.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + characters.length) % characters.length);
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-[500px] px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: '1200px' }}
    >
      <div className="relative w-full max-w-5xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={character.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 },
            }}
            className="flex w-full bg-black/90 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md border border-red-500/20 relative"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{
              scale: 1.03,
              rotateX: 5,
              rotateY: 5,
              translateZ: 50,
              filter: 'drop-shadow(0 30px 60px rgba(239, 68, 68, 0.5))'
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const rotateX = (e.clientY - centerY) / 20;
              const rotateY = (e.clientX - centerX) / 20;
              
              e.currentTarget.style.transform = `
                perspective(1200px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(30px)
                scale(1.02)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `
                perspective(1200px) 
                rotateX(0deg) 
                rotateY(0deg) 
                translateZ(0px)
                scale(1)
              `;
            }}
          >
            {/* Parallax Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/10 rounded-3xl"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-20px)' }}
            />

            {/* Image Section */}
            <motion.div 
              className="w-1/2 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-8 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                transform: 'translateZ(30px)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/15 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}
              />
              
              {/* Floating particles effect */}
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-red-400/30 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      transform: `translateZ(${10 + i * 5}px)`
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              <motion.img
                src={character.image}
                alt={character.name}
                className="h-72 w-72 object-cover rounded-2xl shadow-lg relative z-10"
                onError={(e) => ((e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg')}
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 3,
                  transform: 'translateZ(40px)',
                  boxShadow: '0 25px 50px rgba(239, 68, 68, 0.4)',
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="w-1/2 p-10 text-white bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-between relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                transform: 'translateZ(20px)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/8 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-5px)' }}
              />
              
              <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {/* <StatusBadge status={character.status} />
                  <MoralityBadge morality={character.morality} /> */}
                </motion.div>

                <motion.h2 
                  className="text-4xl font-bold text-red-400 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ 
                    transform: 'translateZ(15px)',
                    textShadow: '0 10px 20px rgba(239, 68, 68, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: '0 15px 30px rgba(239, 68, 68, 0.5)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {character.name}
                </motion.h2>

                <motion.p 
                  className="text-sm text-gray-400 mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ transform: 'translateZ(8px)' }}
                >
                  Played by <span className="text-white font-semibold">{character.actor}</span>
                </motion.p>

                <motion.p 
                  className="text-red-500 font-bold text-lg mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ transform: 'translateZ(12px)' }}
                  whileHover={{
                    scale: 1.02,
                    color: '#ff6b6b',
                    transition: { duration: 0.2 }
                  }}
                >
                  {character.player}
                </motion.p>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{ transform: 'translateZ(6px)' }}
                >
                  <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-300 font-semibold hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-300">
                    Season {character.season}
                  </span>
                </motion.div>

                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{ transform: 'translateZ(4px)' }}
                >
                  {character.bio}
                </motion.p>
              </div>

              <motion.div 
                className="flex gap-4 mt-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ transform: 'translateZ(20px)' }}
              >
                <motion.button
                  onClick={prev}
                  className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: -8,
                    boxShadow: '0 15px 30px rgba(255, 255, 255, 0.3)',
                    transform: 'translateZ(10px)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <ChevronLeft className="text-black w-5 h-5 relative z-10" />
                </motion.button>
                
                <motion.button
                  onClick={next}
                  className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 8,
                    boxShadow: '0 15px 30px rgba(255, 255, 255, 0.3)',
                    transform: 'translateZ(10px)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <ChevronRight className="text-black w-5 h-5 relative z-10" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Character dots indicator */}
        <motion.div 
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {characters.slice(0, 5).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === index % 5 ? 'bg-red-500' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                setDirection(i > index % 5 ? 1 : -1);
                setIndex(i);
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CharacterCarousel;