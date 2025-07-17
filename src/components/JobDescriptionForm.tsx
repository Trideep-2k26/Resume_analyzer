import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, Sparkles, Save } from 'lucide-react';
import { JobDescription } from '../types';
import { geminiService } from '../services/geminiService';

interface JobDescriptionFormProps {
  onJobDescriptionCreated: (jobDescription: JobDescription) => void;
  existingJobDescription?: JobDescription;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({ 
  onJobDescriptionCreated, 
  existingJobDescription 
}) => {
  const [title, setTitle] = useState(existingJobDescription?.title || '');
  const [company, setCompany] = useState(existingJobDescription?.company || '');
  const [basicDescription, setBasicDescription] = useState(existingJobDescription?.content || '');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceWithAI = async () => {
    if (!title || !company || !basicDescription) {
      alert('Please fill in all fields before enhancing with AI');
      return;
    }

    setIsEnhancing(true);
    try {
      const enhancedJobDescription = await geminiService.enhanceJobDescription(
        title,
        company,
        basicDescription
      );
      onJobDescriptionCreated(enhancedJobDescription);
    } catch (error) {
      console.error('Error enhancing job description:', error);
      alert('Failed to enhance job description. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSave = () => {
    if (!title || !company || !basicDescription) {
      alert('Please fill in all fields');
      return;
    }

    const jobDescription: JobDescription = {
      id: existingJobDescription?.id || Date.now().toString(),
      title,
      company,
      content: basicDescription,
      requirements: [],
      createdDate: new Date()
    };

    onJobDescriptionCreated(jobDescription);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Job Description</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              placeholder="e.g., TechCorp Inc."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Job Description
        </label>
        <textarea
          value={basicDescription}
          onChange={(e) => setBasicDescription(e.target.value)}
          rows={8}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
          placeholder="Describe the role, responsibilities, and requirements..."
        />
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={handleEnhanceWithAI}
          disabled={isEnhancing}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4" />
          {isEnhancing ? '🧠 AI Enhancing...' : '✨ Enhance with AI'}
        </motion.button>

        <motion.button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save className="w-4 h-4" />
          Save Job Description
        </motion.button>
      </div>
    </motion.div>
  );
};