import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw } from 'lucide-react';

interface Mask {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'legendary';
}

interface MaskGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const masks: Mask[] = [
  {
    id: 1,
    name: "Circle Guard",
    type: "Worker",
    description: "Basic guard mask worn by the lowest ranking workers in the games.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "common"
  },
  {
    id: 2,
    name: "Triangle Guard",
    type: "Soldier",
    description: "Mid-level guards with weapons and enforcement duties.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "rare"
  },
  {
    id: 3,
    name: "Square Guard", 
    type: "Manager",
    description: "High-ranking supervisors who oversee game operations.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "rare"
  },
  {
    id: 4,
    name: "Front Man",
    type: "Leader",
    description: "The ultimate authority figure who controls all aspects of the games.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "legendary"
  },
  {
    id: 5,
    name: "VIP Golden",
    type: "Spectator",
    description: "Exclusive masks worn by wealthy spectators who bet on the games.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "legendary"
  },
  {
    id: 6,
    name: "VIP Silver",
    type: "Spectator", 
    description: "Another variant of the VIP masks with silver finish.",
    image: "https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=400",
    rarity: "legendary"
  }
];

const MaskGallery: React.FC<MaskGalleryProps> = ({ isOpen, onClose }) => {
  const [selectedMask, setSelectedMask] = useState<Mask | null>(null);
  const [rotation, setRotation] = useState(0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const rotateMask = () => {
    setRotation(rotation + 90);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Mask Gallery</h2>
                <p className="text-gray-400">3D Interactive Collection</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex">
              {/* Mask Grid */}
              <div className="flex-1 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {masks.map((mask) => (
                    <motion.div
                      key={mask.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMask(mask)}
                      className={`cursor-pointer bg-gray-700/50 rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-xl ${
                        selectedMask?.id === mask.id ? getRarityColor(mask.rarity) : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-4">
                        <img
                          src={mask.image}
                          alt={mask.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      
                      <h3 className="text-white font-semibold mb-1">{mask.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{mask.type}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mask.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' :
                          mask.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {mask.rarity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 3D Viewer */}
              <div className="w-80 border-l border-gray-700 p-6">
                {selectedMask ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">3D Viewer</h3>
                      <button
                        onClick={rotateMask}
                        className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <RotateCw size={16} />
                      </button>
                    </div>
                    
                    {/* 3D Mask Display */}
                    <div className="aspect-square bg-gray-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      <motion.div
                        animate={{ rotateY: rotation }}
                        transition={{ duration: 0.5 }}
                        className="w-32 h-32"
                      >
                        <img
                          src={selectedMask.image}
                          alt={selectedMask.name}
                          className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Mask Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold text-lg">{selectedMask.name}</h4>
                        <p className="text-red-400 font-medium">{selectedMask.type}</p>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedMask.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Rarity:</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedMask.rarity === 'common' ? 'bg-gray-500/20 text-gray-400' :
                            selectedMask.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {selectedMask.rarity.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Hierarchy Level:</span>
                          <span className="text-white font-medium">
                            {selectedMask.type === 'Worker' ? '1' :
                             selectedMask.type === 'Soldier' ? '2' :
                             selectedMask.type === 'Manager' ? '3' :
                             selectedMask.type === 'Leader' ? '4' : '5'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">●</span>
                    </div>
                    <p className="text-gray-400">Select a mask to view in 3D</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaskGallery;