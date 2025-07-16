import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock, TrendingUp } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <Users size={32} />,
    number: "456",
    label: "Total Players",
    color: "from-red-500 to-red-700"
  },
  {
    icon: <Target size={32} />,
    number: "1",
    label: "Survivor",
    color: "from-green-500 to-green-700"
  },
  {
    icon: <Clock size={32} />,
    number: "6",
    label: "Games Played",
    color: "from-yellow-500 to-yellow-700"
  },
  {
    icon: <TrendingUp size={32} />,
    number: "45.6B",
    label: "Prize Money (₩)",
    color: "from-purple-500 to-purple-700"
  }
];

const GameStats: React.FC = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Game <span className="text-red-600">Statistics</span>
        </h2>
        <p className="text-xl text-gray-400">
          The brutal reality of survival
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="relative group"
          >
            <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-2xl border border-white/10 relative overflow-hidden`}>
              <motion.div
                className="absolute inset-0 bg-white/5"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                className="text-white mb-4 relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              
              <div className="text-white/80 font-medium uppercase tracking-wide text-sm relative z-10">
                {stat.label}
              </div>

              <motion.div
                className="absolute inset-0 border-2 border-white/0 rounded-2xl group-hover:border-white/30 transition-all duration-300"
                animate={{
                  boxShadow: [
                    '0 0 0 rgba(255, 255, 255, 0)',
                    '0 0 20px rgba(255, 255, 255, 0.1)',
                    '0 0 0 rgba(255, 255, 255, 0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameStats;