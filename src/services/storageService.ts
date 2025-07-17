import { Resume, JobDescription, AnalysisResult } from '../types';

export class StorageService {
  private static readonly RESUMES_KEY = 'resumes';
  private static readonly JOB_DESCRIPTIONS_KEY = 'jobDescriptions';
  private static readonly ANALYSIS_RESULTS_KEY = 'analysisResults';

  static saveResumes(resumes: Resume[]): void {
    localStorage.setItem(this.RESUMES_KEY, JSON.stringify(resumes));
  }

  static getResumes(): Resume[] {
    const data = localStorage.getItem(this.RESUMES_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveJobDescription(jobDescription: JobDescription): void {
    const existing = this.getJobDescriptions();
    const updated = [...existing.filter(jd => jd.id !== jobDescription.id), jobDescription];
    localStorage.setItem(this.JOB_DESCRIPTIONS_KEY, JSON.stringify(updated));
  }

  static getJobDescriptions(): JobDescription[] {
    const data = localStorage.getItem(this.JOB_DESCRIPTIONS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveAnalysisResult(result: AnalysisResult): void {
    const existing = this.getAnalysisResults();
    const updated = [...existing.filter(ar => ar.jobId !== result.jobId), result];
    localStorage.setItem(this.ANALYSIS_RESULTS_KEY, JSON.stringify(updated));
  }

  static getAnalysisResults(): AnalysisResult[] {
    const data = localStorage.getItem(this.ANALYSIS_RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static clearAll(): void {
    localStorage.removeItem(this.RESUMES_KEY);
    localStorage.removeItem(this.JOB_DESCRIPTIONS_KEY);
    localStorage.removeItem(this.ANALYSIS_RESULTS_KEY);
  }
}