export interface Resume {
  id: string;
  fileName: string;
  content: string;
  uploadDate: Date;
  size: number;
  type: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  content: string;
  requirements: string[];
  createdDate: Date;
}

export interface CandidateScore {
  resumeId: string;
  fileName: string;
  overallScore: number;
  technicalScore: number;
  experienceScore: number;
  culturalScore: number;
  reasoning: string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  recommendations: string[];
  matchPercentage: number;
}

export interface AnalysisResult {
  jobId: string;
  candidates: CandidateScore[];
  analysisDate: Date;
  totalCandidates: number;
  averageScore: number;
}