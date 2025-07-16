import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Users, Trophy, Skull, Target, Zap } from 'lucide-react';

interface Game {
  id: number;
  name: string;
  description: string;
  rules: string[];
  survivors: number | string;
  eliminated: number | string;
  prize: string;
  image: string;
  icon: React.ReactNode;
  season: number;
  duration?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
}

const games: Game[] = [
  // Season 1 Games
  {
    id: 1,
    name: "Ddakji",
    description: "The recruitment game where players flip folded paper squares in a battle of skill and luck.",
    rules: [
      "Players take turns flipping paper squares",
      "Goal is to flip opponent's ddakji",
      "Loser gets slapped or owes money",
      "Win earns 100,000 won per round"
    ],
    survivors: "Recruited",
    eliminated: "Multiple losses",
    prize: "Game Invitation",
    image: "public/squid games names/s1-01.png",
    icon: <Target size={24} />,
    season: 1,
    duration: "Variable",
    difficulty: "easy"
  },
  {
    id: 2,
    name: "Red Light, Green Light",
    description: "A deadly version of the childhood game where movement during 'red light' means elimination.",
    rules: [
      "Move only during 'Green Light'",
      "Freeze completely during 'Red Light'",
      "Reach the finish line within time limit",
      "Any movement during red light = elimination"
    ],
    survivors: 201,
    eliminated: 255,
    prize: "Advancement",
    image: "public/squid games names/s1-02.png",
    icon: <Clock size={24} />,
    season: 1,
    duration: "10 minutes",
    difficulty: "medium"
  },
  {
    id: 3,
    name: "Dalgona (Honeycomb)",
    description: "Extract perfect shapes from honeycomb candy without breaking them.",
    rules: [
      "Choose one of four shapes (triangle, circle, star, umbrella)",
      "Extract shape from honeycomb perfectly",
      "Use only provided needle",
      "Complete within 10 minutes"
    ],
    survivors: 108,
    eliminated: 79,
    prize: "Advancement",
    image: "public/squid games names/s1-03.png",
    icon: <Trophy size={24} />,
    season: 1,
    duration: "10 minutes",
    difficulty: "hard"
  },
  {
    id: 4,
    name: "Tug of War",
    description: "Team-based elimination where losing team faces death together.",
    rules: [
      "Form teams of 10 players",
      "Pull opposing team over the line",
      "Losing team is eliminated",
      "Strategy and teamwork essential"
    ],
    survivors: 40,
    eliminated: 68,
    prize: "Team Survival",
    image: "public/squid games names/s1-04.png",
    icon: <Users size={24} />,
    season: 1,
    duration: "30 minutes",
    difficulty: "hard"
  },
  {
    id: 5,
    name: "Marbles",
    description: "Partner game where you must win all of your opponent's marbles.",
    rules: [
      "Choose a partner",
      "Each gets 10 marbles",
      "Play any marble game you agree on",
      "Winner takes all marbles in 30 minutes"
    ],
    survivors: 17,
    eliminated: 23,
    prize: "20 Marbles",
    image: "public/squid games names/s1-05.png",
    icon: <Skull size={24} />,
    season: 1,
    duration: "30 minutes",
    difficulty: "extreme"
  },
  {
    id: 6,
    name: "Glass Bridge",
    description: "Cross a bridge of glass panels where only one path leads to safety.",
    rules: [
      "Choose order to cross bridge",
      "16 pairs of glass panels",
      "One tempered, one regular glass per pair",
      "Wrong choice means falling to death"
    ],
    survivors: 3,
    eliminated: 14,
    prize: "Final Access",
    image: "public/squid games names/s1-06.png",
    icon: <Clock size={24} />,
    season: 1,
    duration: "16 minutes",
    difficulty: "extreme"
  },
  {
    id: 7,
    name: "Squid Game (Finale)",
    description: "The final game - a brutal version of the traditional Korean children's game.",
    rules: [
      "Attacker vs Defender",
      "Attacker moves on one foot",
      "Push opponent out or reach squid's head",
      "Physical contact allowed"
    ],
    survivors: 1,
    eliminated: 1,
    prize: "₩45.6 Billion",
    image: "public/squid games names/s1-07.png",
    icon: <Trophy size={24} />,
    season: 1,
    duration: "Until death",
    difficulty: "extreme"
  },

  // Season 2 Games
  {
    id: 8,
    name: "Bread and Lottery",
    description: "A psychological game of choice between sustenance and gambling.",
    rules: [
      "Choose between bread (food) or lottery ticket",
      "Recruiter crushes leftover bread",
      "Lottery determines next phase",
      "Choice reveals character priorities"
    ],
    survivors: "Tracked",
    eliminated: "Chaos",
    prize: "Information",
    image: "public/squid games names/s2-01.png",
    icon: <Target size={24} />,
    season: 2,
    duration: "5 minutes",
    difficulty: "easy"
  },
  {
    id: 9,
    name: "Rock, Paper, Scissors, Minus One",
    description: "Deadly variation of the classic game with Russian Roulette consequences.",
    rules: [
      "Play Rock, Paper, Scissors",
      "One hand removed from play",
      "Loser faces Russian Roulette",
      "Psychological pressure intensifies"
    ],
    survivors: "Gi-hun",
    eliminated: "Mr. Kim",
    prize: "Survival",
    image: "public/squid games names/s2-02.png",
    icon: <Skull size={24} />,
    season: 2,
    duration: "10 minutes",
    difficulty: "extreme"
  },
  {
    id: 10,
    name: "Russian Roulette",
    description: "The ultimate game of chance with a loaded gun.",
    rules: [
      "Spin barrel once before starting",
      "Take turns shooting",
      "Bullet inevitability increases each round",
      "Last person standing wins"
    ],
    survivors: "Gi-hun",
    eliminated: "Recruiter",
    prize: "Revenge",
    image: "public/squid games names/s2-03.png",
    icon: <Skull size={24} />,
    season: 2,
    duration: "Until death",
    difficulty: "extreme"
  },
  {
    id: 11,
    name: "Red Light, Green Light (Return)",
    description: "The deadly childhood game returns with improved survival rates.",
    rules: [
      "Same rules as Season 1",
      "Move on Green Light, freeze on Red",
      "Any movement during red = death",
      "Players more prepared this time"
    ],
    survivors: 365,
    eliminated: 91,
    prize: "Advancement",
    image: "public/squid games names/s2-04.png",
    icon: <Clock size={24} />,
    season: 2,
    duration: "10 minutes",
    difficulty: "medium"
  },
  {
    id: 12,
    name: "Pentathlon",
    description: "A relay of five traditional Korean mini-games testing various skills.",
    rules: [
      "Complete 5 mini-games in sequence",
      "Includes Ddakji, Flying Stone, Gong-gi",
      "Team-based relay format",
      "All members must complete their tasks"
    ],
    survivors: 255,
    eliminated: 111,
    prize: "Team Advancement",
    image: "public/squid games names/s2-05.png",
    icon: <Users size={24} />,
    season: 2,
    duration: "45 minutes",
    difficulty: "hard"
  },
  {
    id: 13,
    name: "Mingle",
    description: "Form groups matching called numbers or face elimination.",
    rules: [
      "Listen for number announcement",
      "Form groups of exact size called",
      "Groups with wrong numbers eliminated",
      "Alliances tested and broken"
    ],
    survivors: 100,
    eliminated: 155,
    prize: "Survival",
    image: "public/squid games names/s2-06.png",
    icon: <Users size={24} />,
    season: 2,
    duration: "20 minutes",
    difficulty: "hard"
  },

  // Season 3 Games
  {
    id: 14,
    name: "Hide and Seek",
    description: "A deadly game of hunters and prey with team-based survival.",
    rules: [
      "Blue team hides and tries to escape",
      "Red team seeks and eliminates",
      "30-minute time limit",
      "Kill or be killed mentality"
    ],
    survivors: "TBD",
    eliminated: "TBD",
    prize: "Advancement",
    image: "public/squid games names/s3-01.png",
    icon: <Zap size={24} />,
    season: 3,
    duration: "30 minutes",
    difficulty: "extreme"
  },
  {
    id: 15,
    name: "Jump Rope",
    description: "Navigate a giant rotating jump rope while crossing platforms.",
    rules: [
      "Cross platform while rope rotates",
      "Dodge the giant jump rope",
      "20-minute time limit",
      "Timing and agility crucial"
    ],
    survivors: "TBD",
    eliminated: "TBD",
    prize: "Final Access",
    image: "public/squid games names/s3-02.png",
    icon: <Clock size={24} />,
    season: 3,
    duration: "20 minutes",
    difficulty: "extreme"
  },
  {
    id: 16,
    name: "Sky Squid Game (Finale)",
    description: "The ultimate finale fought on elevated towers with deadly consequences.",
    rules: [
      "Fight on towers (square, triangle, circle)",
      "Push rivals off platforms",
      "Survive countdown timers",
      "Final battle for victory and morality"
    ],
    survivors: "TBD",
    eliminated: "TBD",
    prize: "Ultimate Victory",
    image: "public/squid games names/s3-03.png",
    icon: <Trophy size={24} />,
    season: 3,
    duration: "Until victory",
    difficulty: "extreme"
  }
];

const Games: React.FC = () => {
  const [seasonFilter, setSeasonFilter] = React.useState<number | 'all'>('all');

  const filteredGames = seasonFilter === 'all' 
    ? games 
    : games.filter(game => game.season === seasonFilter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'extreme': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSeasonColor = (season: number) => {
    switch (season) {
      case 1: return 'bg-red-600';
      case 2: return 'bg-blue-600';
      case 3: return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The <span className="text-red-600">Games</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From childhood games turned deadly to new psychological horrors. Each season brings 
            more sophisticated challenges that test not just survival instincts, but the very essence of humanity.
          </p>
        </motion.div>

        {/* Season Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-800/50 rounded-lg p-1 backdrop-blur-md border border-gray-700">
            <button
              onClick={() => setSeasonFilter('all')}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                seasonFilter === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Games
            </button>
            <button
              onClick={() => setSeasonFilter(1)}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                seasonFilter === 1 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Season 1
            </button>
            <button
              onClick={() => setSeasonFilter(2)}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                seasonFilter === 2 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Season 2
            </button>
            <button
              onClick={() => setSeasonFilter(3)}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                seasonFilter === 3 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Season 3
            </button>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-600 via-blue-500 to-purple-500 h-full rounded-full"></div>

          {/* Game Cards */}
          <div className="space-y-24">
            {filteredGames.map((game, index) => {
              const [ref, inView] = useInView({
                threshold: 0.3,
                triggerOnce: true
              });

              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={game.id}
                  ref={ref}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Game Card */}
                  <div className={`w-5/12 ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all duration-300 backdrop-blur-md"
                    >
                      {/* Game Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=600';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Game Info Overlay */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                          {game.icon}
                          <span className="font-bold">Game {game.id}</span>
                        </div>

                        {/* Season Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-bold ${getSeasonColor(game.season)}`}>
                          Season {game.season}
                        </div>

                        {/* Difficulty Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(game.difficulty)}`}>
                          {game.difficulty.toUpperCase()}
                        </div>
                      </div>

                      {/* Game Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-white">
                            {game.name}
                          </h3>
                          {game.duration && (
                            <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                              {game.duration}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {game.description}
                        </p>

                        {/* Game Rules */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-red-400 mb-3">Rules:</h4>
                          <ul className="space-y-2">
                            {game.rules.map((rule, ruleIndex) => (
                              <li key={ruleIndex} className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="text-red-400 mt-1">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Game Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                          <div className="text-center">
                            <p className="text-green-400 font-bold text-lg">{game.survivors}</p>
                            <p className="text-gray-400 text-xs">Survived</p>
                          </div>
                          <div className="text-center">
                            <p className="text-red-400 font-bold text-lg">{game.eliminated}</p>
                            <p className="text-gray-400 text-xs">Eliminated</p>
                          </div>
                          <div className="text-center">
                            <p className="text-yellow-400 font-bold text-sm">{game.prize}</p>
                            <p className="text-gray-400 text-xs">Prize</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black shadow-lg ${getSeasonColor(game.season)}`}
                  >
                    <div className={`w-full h-full rounded-full animate-pulse ${getSeasonColor(game.season)}`}></div>
                  </motion.div>

                  {/* Game Number */}
                  <div className={`w-5/12 flex ${isEven ? 'justify-start pl-16' : 'justify-end pr-16'}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-red-600/30 mb-2">
                        {game.id.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        GAME {game.id}
                      </div>
                      <div className={`text-xs font-bold mt-1 ${
                        game.season === 1 ? 'text-red-400' :
                        game.season === 2 ? 'text-blue-400' :
                        'text-purple-400'
                      }`}>
                        S{game.season}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Season Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl font-bold text-red-400 mb-2">7</div>
            <div className="text-gray-400 text-sm">Season 1 Games</div>
            <div className="text-xs text-red-300 mt-1">Classic Deadly Games</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
            <div className="text-gray-400 text-sm">Season 2 Games</div>
            <div className="text-xs text-blue-300 mt-1">Psychological Warfare</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
            <div className="text-gray-400 text-sm">Season 3 Games</div>
            <div className="text-xs text-purple-300 mt-1">Ultimate Challenges</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 pt-12 border-t border-gray-800"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Think You Can <span className="text-red-600">Survive All Seasons?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Each season escalates the psychological and physical challenges. From simple childhood games 
            to complex team dynamics and ultimate moral tests.
          </p>
          <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-600/25">
            Test Your Survival Skills
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Games;