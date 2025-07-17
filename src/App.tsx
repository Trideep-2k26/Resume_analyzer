import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rocket, Database, Zap, Settings } from 'lucide-react';

import { FileUpload } from './components/FileUpload';
import { JobDescriptionForm } from './components/JobDescriptionForm';
import { AnalysisResults } from './components/AnalysisResults';
import { LoadingAnimation } from './components/LoadingAnimation';

import { Resume, JobDescription, CandidateScore, AnalysisResult } from './types';
import { geminiService } from './services/geminiService';
import { StorageService } from './services/storageService';

function App() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [analysisResults, setAnalysisResults] = useState<CandidateScore[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'job' | 'results'>('upload');

  useEffect(() => {
    // Load existing data from localStorage
    const savedResumes = StorageService.getResumes();
    const savedJobDescriptions = StorageService.getJobDescriptions();
    const savedAnalysisResults = StorageService.getAnalysisResults();

    if (savedResumes.length > 0) {
      setResumes(savedResumes);
    }

    if (savedJobDescriptions.length > 0) {
      setJobDescription(savedJobDescriptions[0]);
    }

    if (savedAnalysisResults.length > 0) {
      setAnalysisResults(savedAnalysisResults[0].candidates);
    }
  }, []);

  const handleFilesUploaded = (uploadedResumes: Resume[]) => {
    setResumes(uploadedResumes);
    StorageService.saveResumes(uploadedResumes);
    toast.success(`🚀 ${uploadedResumes.length} resumes uploaded successfully!`);
  };

  const handleJobDescriptionCreated = (jd: JobDescription) => {
    setJobDescription(jd);
    StorageService.saveJobDescription(jd);
    toast.success('💼 Job description saved successfully!');
  };

  const handleAnalyze = async () => {
    if (!jobDescription) {
      toast.error('Please create a job description first!');
      return;
    }

    if (resumes.length === 0) {
      toast.error('Please upload at least one resume!');
      return;
    }

    setIsAnalyzing(true);
    setActiveTab('results');

    try {
      const results = await geminiService.analyzeResumes(jobDescription, resumes);
      setAnalysisResults(results);

      const analysisResult: AnalysisResult = {
        jobId: jobDescription.id,
        candidates: results,
        analysisDate: new Date(),
        totalCandidates: resumes.length,
        averageScore: results.reduce((sum, r) => sum + r.overallScore, 0) / results.length
      };

      StorageService.saveAnalysisResult(analysisResult);
      toast.success('🎯 Analysis completed successfully!');
    } catch (error) {
      toast.error('❌ Analysis failed. Please check your API key and try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      StorageService.clearAll();
      setResumes([]);
      setJobDescription(null);
      setAnalysisResults([]);
      toast.info('🗑️ All data cleared');
    }
  };

  const canAnalyze = resumes.length > 0 && jobDescription && !isAnalyzing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {isAnalyzing && <LoadingAnimation />}

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white">
                  Resume <span className="text-cyan-400">Dominator</span>
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={clearAllData}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Database className="w-4 h-4" />
                  Clear Data
                </motion.button>

                <motion.button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: canAnalyze ? 1.05 : 1 }}
                  whileTap={{ scale: canAnalyze ? 0.95 : 1 }}
                >
                  <Zap className="w-4 h-4" />
                  {isAnalyzing ? 'Analyzing...' : 'ANALYZE NOW'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Navigation */}
        <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'upload', label: 'Upload Resumes', count: resumes.length },
                { id: 'job', label: 'Job Description', count: jobDescription ? 1 : 0 },
                { id: 'results', label: 'Analysis Results', count: analysisResults.length }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="bg-cyan-400 text-gray-900 text-xs rounded-full px-2 py-1 font-bold">
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'upload' && (
            <FileUpload
              onFilesUploaded={handleFilesUploaded}
              existingResumes={resumes}
            />
          )}

          {activeTab === 'job' && (
            <JobDescriptionForm
              onJobDescriptionCreated={handleJobDescriptionCreated}
              existingJobDescription={jobDescription || undefined}
            />
          )}

          {activeTab === 'results' && (
            <>
              {analysisResults.length > 0 && jobDescription ? (
                <AnalysisResults
                  results={analysisResults}
                  jobTitle={jobDescription.title}
                  company={jobDescription.company}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Settings className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Analysis Results Yet
                  </h3>
                  <p className="text-gray-400">
                    Upload resumes and create a job description to get started
                  </p>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;