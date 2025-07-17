import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Brain, 
  Users, 
  Star, 
  TrendingUp, 
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CandidateScore } from '../types';

interface AnalysisResultsProps {
  results: CandidateScore[];
  jobTitle: string;
  company: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  results, 
  jobTitle, 
  company 
}) => {
  const [sortBy, setSortBy] = useState<'overall' | 'technical' | 'experience' | 'cultural'>('overall');
  const [filterTier, setFilterTier] = useState<'all' | 'legendary' | 'elite' | 'solid'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-yellow-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-yellow-400/20';
    if (score >= 80) return 'bg-green-400/20';
    if (score >= 70) return 'bg-blue-400/20';
    if (score >= 60) return 'bg-orange-400/20';
    return 'bg-red-400/20';
  };

  const getTierBadge = (score: number) => {
    if (score >= 90) return { text: 'LEGENDARY', color: 'bg-yellow-500' };
    if (score >= 80) return { text: 'ELITE', color: 'bg-green-500' };
    if (score >= 70) return { text: 'SOLID', color: 'bg-blue-500' };
    if (score >= 60) return { text: 'AVERAGE', color: 'bg-orange-500' };
    return { text: 'REJECTED', color: 'bg-red-500' };
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'technical':
        return b.technicalScore - a.technicalScore;
      case 'experience':
        return b.experienceScore - a.experienceScore;
      case 'cultural':
        return b.culturalScore - a.culturalScore;
      default:
        return b.overallScore - a.overallScore;
    }
  });

  const filteredResults = sortedResults.filter(result => {
    if (filterTier === 'all') return true;
    if (filterTier === 'legendary') return result.overallScore >= 90;
    if (filterTier === 'elite') return result.overallScore >= 80 && result.overallScore < 90;
    if (filterTier === 'solid') return result.overallScore >= 70 && result.overallScore < 80;
    return false;
  });

  const exportResults = () => {
    const csvContent = [
      ['Candidate', 'Overall Score', 'Technical', 'Experience', 'Cultural', 'Match %'],
      ...filteredResults.map(result => [
        result.fileName,
        result.overallScore,
        result.technicalScore,
        result.experienceScore,
        result.culturalScore,
        result.matchPercentage
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobTitle}_analysis_results.csv`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Analysis Results
          </h2>
          <p className="text-gray-400">
            {jobTitle} at {company} • {results.length} candidates analyzed
          </p>
        </div>
        
        <motion.button
          onClick={exportResults}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </motion.button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="overall">Overall Score</option>
            <option value="technical">Technical Score</option>
            <option value="experience">Experience Score</option>
            <option value="cultural">Cultural Score</option>
          </select>
        </div>

        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value as any)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="all">All Tiers</option>
          <option value="legendary">Legendary (90+)</option>
          <option value="elite">Elite (80-89)</option>
          <option value="solid">Solid (70-79)</option>
        </select>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredResults.map((result, index) => {
            const tier = getTierBadge(result.overallScore);
            const isExpanded = selectedCandidate === result.resumeId;
            
            return (
              <motion.div
                key={result.resumeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${getScoreBgColor(result.overallScore)} border-gray-700 hover:border-cyan-400 transition-all cursor-pointer`}
                onClick={() => setSelectedCandidate(isExpanded ? null : result.resumeId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">#{index + 1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${tier.color}`}>
                        {tier.text}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white">{result.fileName}</h3>
                      <p className="text-sm text-gray-400">Match: {result.matchPercentage}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                        </div>
                        <div className="text-xs text-gray-400">Overall</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${getScoreColor(result.technicalScore)}`}>
                            {result.technicalScore}
                          </div>
                          <div className="text-xs text-gray-400">Tech</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${getScoreColor(result.experienceScore)}`}>
                            {result.experienceScore}
                          </div>
                          <div className="text-xs text-gray-400">Exp</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${getScoreColor(result.culturalScore)}`}>
                            {result.culturalScore}
                          </div>
                          <div className="text-xs text-gray-400">Culture</div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-700"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">🧠 AI Analysis</h4>
                          <p className="text-gray-300 leading-relaxed">{result.reasoning}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">💪 Key Strengths</h4>
                            <ul className="space-y-1">
                              {result.keyStrengths.map((strength, idx) => (
                                <li key={idx} className="text-sm text-gray-300">{strength}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-orange-400 mb-2">⚠️ Areas for Improvement</h4>
                            <ul className="space-y-1">
                              {result.keyWeaknesses.map((weakness, idx) => (
                                <li key={idx} className="text-sm text-gray-300">{weakness}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-cyan-400 mb-2">🎯 Recommendations</h4>
                          <ul className="space-y-1">
                            {result.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-300">{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};