import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, User } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  character: string;
}

interface Result {
  character: string;
  description: string;
  image: string;
  traits: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your biggest motivation for joining the games?",
    options: [
      "Support my family and pay debts",
      "Prove I'm the smartest",
      "Escape my dangerous situation",
      "Experience something thrilling"
    ],
    character: "motivation"
  },
  {
    id: 2,
    question: "How do you handle pressure situations?",
    options: [
      "Stay calm and think strategically",
      "Rely on instinct and quick decisions",
      "Look for alliances and support",
      "Use whatever means necessary to survive"
    ],
    character: "pressure"
  },
  {
    id: 3,
    question: "What's your approach to teamwork?",
    options: [
      "Trust and cooperation",
      "Lead and direct others",
      "Be cautious but helpful",
      "Use others for personal advantage"
    ],
    character: "teamwork"
  },
  {
    id: 4,
    question: "When faced with a moral dilemma, you:",
    options: [
      "Always choose what's right",
      "Weigh pros and cons carefully",
      "Protect those you care about",
      "Do whatever benefits you most"
    ],
    character: "morality"
  },
  {
    id: 5,
    question: "Your biggest fear is:",
    options: [
      "Failing the people I love",
      "Not being smart enough",
      "Being alone and helpless",
      "Losing control of my situation"
    ],
    character: "fear"
  }
];

const results: { [key: string]: Result } = {
  "gi-hun": {
    character: "Seong Gi-hun (Player 456)",
    description: "You're driven by love for your family and have a strong moral compass. You're willing to sacrifice for others and maintain hope even in the darkest situations.",
    image: "gi-hun.png",
    traits: ["Compassionate", "Determined", "Family-oriented", "Optimistic"]
  },
  "sang-woo": {
    character: "Cho Sang-woo (Player 218)",
    description: "You're intelligent and strategic, but can be ruthless when survival is at stake. You're willing to make difficult decisions others can't.",
    image: "sang-woo.png",
    traits: ["Strategic", "Intelligent", "Ruthless", "Pragmatic"]
  },
  "sae-byeok": {
    character: "Kang Sae-byeok (Player 067)",
    description: "You're independent and cautious, with incredible inner strength. You've faced hardship and learned to rely on yourself while protecting those you love.",
    image: "sae-byeok.png",
    traits: ["Independent", "Cautious", "Strong", "Protective"]
  },
  "il-nam": {
    character: "Oh Il-nam (Player 001)",
    description: "You're complex and mysterious, with hidden depths. You understand human nature deeply and can be both caring and calculating.",
    image: "il-nam.png",
    traits: ["Mysterious", "Wise", "Complex", "Manipulative"]
  }
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    // Simple algorithm to determine character based on answers
    const scores = {
      "gi-hun": 0,
      "sang-woo": 0,
      "sae-byeok": 0,
      "il-nam": 0
    };

    finalAnswers.forEach((answer, index) => {
      switch (index) {
        case 0: // Motivation
          if (answer === 0) scores["gi-hun"]++;
          if (answer === 1) scores["sang-woo"]++;
          if (answer === 2) scores["sae-byeok"]++;
          if (answer === 3) scores["il-nam"]++;
          break;
        case 1: // Pressure
          if (answer === 0) scores["sang-woo"]++;
          if (answer === 1) scores["sae-byeok"]++;
          if (answer === 2) scores["gi-hun"]++;
          if (answer === 3) scores["il-nam"]++;
          break;
        case 2: // Teamwork
          if (answer === 0) scores["gi-hun"]++;
          if (answer === 1) scores["sang-woo"]++;
          if (answer === 2) scores["sae-byeok"]++;
          if (answer === 3) scores["il-nam"]++;
          break;
        case 3: // Morality
          if (answer === 0) scores["gi-hun"]++;
          if (answer === 1) scores["sang-woo"]++;
          if (answer === 2) scores["sae-byeok"]++;
          if (answer === 3) scores["il-nam"]++;
          break;
        case 4: // Fear
          if (answer === 0) scores["gi-hun"]++;
          if (answer === 1) scores["sang-woo"]++;
          if (answer === 2) scores["sae-byeok"]++;
          if (answer === 3) scores["il-nam"]++;
          break;
      }
    });

    const winner = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    setResult(results[winner]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Character <span className="text-red-600">Quiz</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover which Squid Game character you're most like based on your personality, 
            values, and how you'd handle the pressure of the games.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            /* Quiz Questions */
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-md border border-gray-700"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-red-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              {/* Answer Options */}
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 hover:border-red-500/50 rounded-xl text-left transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-lg">{option}</span>
                      <ArrowRight className="text-gray-500 group-hover:text-red-400 transition-colors" size={20} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Quiz Result */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-md border border-gray-700"
            >
              {result && (
                <>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.character}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        You are...
                      </h2>
                      <h3 className="text-xl md:text-2xl text-red-400 font-semibold">
                        {result.character}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {result.description}
                    </p>

                    {/* Character Traits */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4">Your Traits:</h4>
                      <div className="flex flex-wrap gap-3">
                        {result.traits.map((trait, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 font-medium"
                          >
                            {trait}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={resetQuiz}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                      >
                        <RotateCcw size={20} />
                        <span>Take Quiz Again</span>
                      </button>
                      
                      <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                        <User size={20} />
                        <span>View All Characters</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;