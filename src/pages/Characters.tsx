import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Skull, User } from 'lucide-react';

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
  role: string;
}

const characters: Character[] = [
  // Season 1 Characters
  {
    id: 1,
    name: "Seong Gi-hun",
    actor: "Lee Jung-jae",
    player: "Player 456",
    image: "public/squid game players/player 456.jpg",
    status: "alive",
    morality: "good",
    bio: "The sole survivor of the first games, now returning with a mission to stop the deadly competition and save others from the same fate.",
    season: 1,
    role: "Protagonist"
  },
  {
    id: 2,
    name: "The Front Man",
    actor: "Lee Byung-hun",
    player: "Game Master",
    image: "public/squid game players/frontman.jpg",
    status: "alive",
    morality: "evil",
    bio: "The mysterious masked leader who oversees the deadly games with ruthless efficiency and unwavering control.",
    season: 1,
    role: "Antagonist"
  },
  {
    id: 3,
    name: "Hwang Jun-ho",
    actor: "Wi Ha-jun",
    player: "Detective",
    image: "public/squid game players/wiha jun.jpg",
    status: "unknown",
    morality: "good",
    bio: "Police detective who infiltrated the games to find his missing brother, uncovering the dark truth behind the organization.",
    season: 1,
    role: "Detective"
  },
  {
    id: 4,
    name: "The Recruiter",
    actor: "Gong Yoo",
    player: "Salesman",
    image: "public/squid game players/salesman.jpg",
    status: "alive",
    morality: "evil",
    bio: "The charismatic recruiter who lures desperate people into the deadly games with promises of easy money.",
    season: 1,
    role: "Recruiter"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Staff"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
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
    role: "Contestant"
  }
];

const Characters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [moralityFilter, setMoralityFilter] = useState<string>('all');

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.player.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || character.status === statusFilter;
    const matchesSeason = seasonFilter === 'all' || character.season.toString() === seasonFilter;
    const matchesMorality = moralityFilter === 'all' || character.morality === moralityFilter;
    
    return matchesSearch && matchesStatus && matchesSeason && matchesMorality;
  });

  const getMoralityColor = (morality: string) => {
    switch (morality) {
      case 'good': return 'border-green-500 bg-green-500/10';
      case 'evil': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'alive': return <Heart className="text-green-400" size={20} />;
      case 'dead': return <Skull className="text-red-400" size={20} />;
      default: return <User className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The <span className="text-red-600">Players</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the cast of both seasons - from returning survivors to new contestants. 
            Each character brings their own story of desperation, hope, and survival.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-md border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search characters, actors, or players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Season Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={seasonFilter}
                onChange={(e) => setSeasonFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
              >
                <option value="all">All Seasons</option>
                <option value="1">Season 1</option>
                <option value="2">Season 2</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
              >
                <option value="all">All Status</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            {/* Morality Filter */}
            <div className="relative">
              <select
                value={moralityFilter}
                onChange={(e) => setMoralityFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
              >
                <option value="all">All Morality</option>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="evil">Evil</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gray-800 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl ${getMoralityColor(character.morality)}`}
            >
              {/* Character Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                
                {/* Season Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  S{character.season}
                </div>

              

                {/* Morality Badge */}
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  character.morality === 'good' ? 'bg-green-500/80 text-green-100' :
                  character.morality === 'evil' ? 'bg-red-500/80 text-red-100' :
                  'bg-gray-500/80 text-gray-100'
                }`}>
                  {character.morality}
                </div>
              </div>

              {/* Character Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1">
                  {character.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">
                  {character.actor}
                </p>
                <p className="text-red-400 font-medium text-sm mb-2">
                  {character.player}
                </p>
                
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-gray-500">Role:</span>
                  <span className="text-gray-300">{character.role}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {character.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCharacters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Characters Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-white mb-2">
              {characters.filter(c => c.season === 1).length}
            </div>
            <div className="text-gray-400 text-sm">Season 1 Cast</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {characters.filter(c => c.season === 2).length}
            </div>
            <div className="text-gray-400 text-sm">Season 2 Cast</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {characters.filter(c => c.status === 'alive').length}
            </div>
            <div className="text-gray-400 text-sm">Confirmed Alive</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-md border border-gray-700">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {characters.filter(c => c.status === 'unknown').length}
            </div>
            <div className="text-gray-400 text-sm">Status Unknown</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Characters;