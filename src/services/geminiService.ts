import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resume, JobDescription, CandidateScore } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeResumes(jobDescription: JobDescription, resumes: Resume[]): Promise<CandidateScore[]> {
    const insanePrompt = `
🔥 ULTIMATE RESUME DOMINATION MODE ACTIVATED 🔥

You are THE LEGENDARY AI RECRUITER, the most SAVAGE talent evaluator in the multiverse! Your mission: DEMOLISH mediocrity and IDENTIFY THE CHOSEN ONES!

CONTEXT BRIEFING:
📋 Job Title: "${jobDescription.title}"
🏢 Company: "${jobDescription.company}"
📝 Job Description: "${jobDescription.content}"
🎯 Requirements: ${jobDescription.requirements.join(', ')}

EVALUATION PROTOCOL - EXECUTE WITH EXTREME PRECISION:

For each resume, you will UNLEASH a comprehensive analysis using this INSANE scoring matrix:

🎯 TECHNICAL MASTERY (0-100):
- Skills alignment with job requirements
- Technical depth and breadth
- Certifications and technical achievements
- Problem-solving indicators

💪 EXPERIENCE DOMINANCE (0-100):
- Relevant work experience
- Career progression trajectory
- Leadership and impact metrics
- Industry experience relevance

🌟 CULTURAL SYNERGY (0-100):
- Communication style from resume
- Team collaboration indicators
- Adaptability signals
- Company culture alignment

RESPONSE FORMAT (JSON ONLY):
{
  "candidates": [
    {
      "resumeId": "resume_id_here",
      "fileName": "filename_here",
      "overallScore": 85,
      "technicalScore": 90,
      "experienceScore": 80,
      "culturalScore": 85,
      "matchPercentage": 85,
      "reasoning": "🔥 SAVAGE ANALYSIS: This candidate is an ABSOLUTE UNIT! Their technical skills are LEGENDARY, showing mastery in [specific skills]. Experience trajectory is INSANE with [specific examples]. Culture fit is PHENOMENAL because [specific reasons]. This person will DOMINATE in your organization!",
      "keyStrengths": ["🚀 Technical wizard with expertise in X", "💼 Leadership experience in Y", "🎯 Perfect culture match"],
      "keyWeaknesses": ["⚠️ Limited experience in Z", "📈 Could improve in area W"],
      "recommendations": ["🎯 Fast-track to technical interview", "💡 Perfect for senior role", "🚀 Immediate hire potential"]
    }
  ]
}

SCORING RULES:
- 90-100: LEGENDARY TIER (Immediate hire, unicorn candidate)
- 80-89: ELITE TIER (Top 10%, strong hire)
- 70-79: SOLID TIER (Good candidate, consider)
- 60-69: AVERAGE TIER (Potential with development)
- 0-59: REJECTED TIER (Not suitable)

BE ABSOLUTELY RUTHLESS yet FAIR! Use emojis, be ENERGETIC, and provide SAVAGE but constructive feedback!

RESUMES TO ANALYZE:
${resumes.map((resume, index) => `
RESUME ${index + 1}:
ID: ${resume.id}
FILENAME: ${resume.fileName}
CONTENT: ${resume.content}
`).join('\n')}

ANALYZE NOW! SHOW NO MERCY! FIND THE CHAMPIONS! 🏆
`;

    try {
      const result = await this.model.generateContent(insanePrompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsedResult = JSON.parse(jsonMatch[0]);
      return parsedResult.candidates;
    } catch (error) {
      console.error('Error analyzing resumes:', error);
      throw new Error('Failed to analyze resumes. Please try again.');
    }
  }

  async enhanceJobDescription(title: string, company: string, basicDescription: string): Promise<JobDescription> {
    const enhancementPrompt = `
🚀 JOB DESCRIPTION ENHANCEMENT PROTOCOL 🚀

Transform this basic job description into a LEGENDARY job posting that will attract TOP TALENT!

Title: ${title}
Company: ${company}
Basic Description: ${basicDescription}

Please enhance this and return a JSON with:
{
  "enhancedContent": "Enhanced job description with compelling language",
  "requirements": ["requirement1", "requirement2", "requirement3"],
  "benefits": ["benefit1", "benefit2", "benefit3"],
  "culture": "Company culture description"
}

Make it AMAZING! 🔥
`;

    try {
      const result = await this.model.generateContent(enhancementPrompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        id: Date.now().toString(),
        title,
        company,
        content: parsed.enhancedContent,
        requirements: parsed.requirements,
        createdDate: new Date()
      };
    } catch (error) {
      console.error('Error enhancing job description:', error);
      throw new Error('Failed to enhance job description');
    }
  }
}

export const geminiService = new GeminiService();