import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Filter, Shuffle } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  player: string;
  status: 'survived' | 'eliminated' | 'vip';
  score: number;
  gamesWon: number;
  lastGame: string;
  survivalTime: string;
}

const players: Player[] = [
  { id: 1, name: "Seong Gi-hun", player: "Player 456", status: "survived", score: 100, gamesWon: 6, lastGame: "Squid Game", survivalTime: "6 days" },
  { id: 2, name: "Cho Sang-woo", player: "Player 218", status: "eliminated", score: 83, gamesWon: 5, lastGame: "Squid Game", survivalTime: "6 days" },
  { id: 3, name: "Kang Sae-byeok", player: "Player 067", status: "eliminated", score: 81, gamesWon: 5, lastGame: "Glass Bridge", survivalTime: "5 days" },
  { id: 4, name: "Oh Il-nam", player: "Player 001", status: "vip", score: 95, gamesWon: 5, lastGame: "Marbles", survivalTime: "4 days" },
  { id: 5, name: "Ali Abdul", player: "Player 199", status: "eliminated", score: 67, gamesWon: 4, lastGame: "Marbles", survivalTime: "4 days" },
  { id: 6, name: "Jang Deok-su", player: "Player 101", status: "eliminated", score: 71, gamesWon: 4, lastGame: "Glass Bridge", survivalTime: "5 days" },
  { id: 7, name: "Han Mi-nyeo", player: "Player 212", status: "eliminated", score: 58, gamesWon: 4, lastGame: "Glass Bridge", survivalTime: "5 days" },
  { id: 8, name: "Ji-yeong", player: "Player 240", status: "eliminated", score: 64, gamesWon: 4, lastGame: "Marbles", survivalTime: "4 days" },
];

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [userScore, setUserScore] = useState<number | null>(null);

  const filteredPlayers = players.filter(player => {
    if (filter === 'all') return true;
    return player.status === filter;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-400" size={24} />;
      case 2: return <Medal className="text-gray-300" size={24} />;
      case 3: return <Award className="text-orange-400" size={24} />;
      default: return <Star className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'survived': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'eliminated': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'vip': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const simulateScore = () => {
    const randomScore = Math.floor(Math.random() * 100) + 1;
    setUserScore(randomScore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Player <span className="text-red-600">Rankings</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Final standings from the deadliest competition. Each player's journey through the six games, 
            ranked by survival score and overall performance.
          </p>
        </motion.div>

        {/* Filters and Score Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-md border border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400" size={20} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="all">All Players</option>
                <option value="survived">Survivors</option>
                <option value="eliminated">Eliminated</option>
                <option value="vip">VIPs</option>
              </select>
            </div>

            {/* Score Simulator */}
            <div className="flex items-center space-x-4">
              <button
                onClick={simulateScore}
                className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                <Shuffle size={20} />
                <span>Simulate Your Score</span>
              </button>
              {userScore && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 font-bold"
                >
                  Your Score: {userScore}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-md border border-gray-700"
        >
          {/* Header */}
          <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Score</div>
              <div className="col-span-2">Games Won</div>
              <div className="col-span-2">Last Game</div>
            </div>
          </div>

          {/* Player Rows */}
          <div className="divide-y divide-gray-700">
            {filteredPlayers.map((player, index) => {
              const rank = index + 1;
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.3)' }}
                  className="px-6 py-4 transition-colors duration-200"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 flex items-center space-x-2">
                      {getRankIcon(rank)}
                      <span className="text-white font-bold text-lg">#{rank}</span>
                    </div>

                    {/* Player Info */}
                    <div className="col-span-4">
                      <h3 className="text-white font-semibold text-lg">{player.name}</h3>
                      <p className="text-red-400 text-sm">{player.player}</p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(player.status)}`}>
                        {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="col-span-1">
                      <span className="text-2xl font-bold text-white">{player.score}</span>
                    </div>

                    {/* Games Won */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{player.gamesWon}/6</span>
                        <div className="flex-1 bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(player.gamesWon / 6) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Last Game */}
                    <div className="col-span-2">
                      <p className="text-gray-300 text-sm">{player.lastGame}</p>
                      <p className="text-gray-500 text-xs">{player.survivalTime}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">1</div>
            <div className="text-gray-400 text-sm">Survivors</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-red-400 mb-2">455</div>
            <div className="text-gray-400 text-sm">Eliminated</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-yellow-400 mb-2">6</div>
            <div className="text-gray-400 text-sm">Total Games</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">99.8%</div>
            <div className="text-gray-400 text-sm">Elimination Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;