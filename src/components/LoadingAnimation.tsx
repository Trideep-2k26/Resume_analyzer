import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative mb-8"
        >
          <Brain className="w-16 h-16 text-cyan-400 mx-auto" />
          <motion.div
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute inset-0 border-2 border-cyan-400 rounded-full"
          />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-4">
          🧠 AI ANALYSIS IN PROGRESS
        </h2>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          >
            <Zap className="w-6 h-6 text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          >
            <Target className="w-6 h-6 text-green-400" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          >
            <Brain className="w-6 h-6 text-purple-400" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="text-gray-300"
          >
            🔍 Analyzing technical skills...
          </motion.p>
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            className="text-gray-300"
          >
            💼 Evaluating experience levels...
          </motion.p>
          <motion.p
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
            className="text-gray-300"
          >
            🎯 Calculating culture fit...
          </motion.p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-cyan-400 font-semibold"
        >
          Preparing epic results... 🚀
        </motion.div>
      </div>
    </motion.div>
  );
};