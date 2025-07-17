# 🚀 Resume Dominator - AI-Powered Resume Shortlister

> **The most SAVAGE resume analysis tool powered by Google's Gemini 1.5 Flash AI**

Transform your hiring process with cutting-edge AI that doesn't just rank candidates - it **DOMINATES** the selection process with legendary precision and epic insights!

![Resume Dominator](https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ⚡ Features That Will Blow Your Mind

### 🧠 **AI-Powered Analysis**
- **Gemini 1.5 Flash Integration**: Lightning-fast, incredibly accurate candidate evaluation
- **Multi-Dimensional Scoring**: Technical skills, experience level, and cultural fit analysis
- **Savage AI Personality**: Get brutally honest (but constructive) feedback on every candidate
- **Tier-Based Ranking**: LEGENDARY → ELITE → SOLID → AVERAGE → REJECTED classifications

### 📁 **Advanced File Management**
- **Drag & Drop Upload**: Intuitive file handling with visual feedback
- **Multi-Format Support**: PDF, DOC, DOCX, TXT files
- **Batch Processing**: Analyze multiple resumes simultaneously
- **Local Storage Persistence**: Your data stays with you, always

### 💼 **Smart Job Description Tools**
- **AI Enhancement**: Transform basic job posts into compelling, detailed descriptions
- **Requirement Extraction**: Automatically identify key skills and qualifications
- **Company Culture Integration**: Match candidates based on cultural fit

### 📊 **Epic Results Dashboard**
- **Interactive Scoring Cards**: Expandable candidate profiles with detailed insights
- **Real-time Filtering**: Sort by score, tier, or specific criteria
- **Export Functionality**: Download results as CSV for further analysis
- **Visual Score Indicators**: Color-coded performance metrics

### 🎨 **Futuristic Design**
- **Cyberpunk Aesthetic**: Dark theme with neon cyan accents
- **Glassmorphism Effects**: Modern translucent UI elements
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Layout**: Perfect experience on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: Google Gemini 1.5 Flash API
- **Animations**: Framer Motion
- **File Handling**: React Dropzone
- **Notifications**: React Toastify
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: Browser LocalStorage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google AI Studio API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd resume-dominator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start dominating resumes! 🔥

## 📖 How to Use

### Step 1: Upload Resumes 📁
- Click the "Upload Resumes" tab
- Drag and drop resume files or click to browse
- Supports PDF, DOC, DOCX, and TXT formats
- Upload multiple files at once for batch processing

### Step 2: Create Job Description 💼
- Switch to the "Job Description" tab
- Fill in job title, company name, and basic description
- Click "✨ Enhance with AI" for automatic improvement
- Or save manually for basic analysis

### Step 3: Analyze Candidates 🧠
- Click the epic "ANALYZE NOW" button
- Watch the AI work its magic with the loading animation
- Get detailed scoring and reasoning for each candidate

### Step 4: Review Results 📊
- Browse candidates sorted by overall score
- Expand cards to see detailed AI analysis
- Filter by tier (LEGENDARY, ELITE, SOLID, etc.)
- Export results as CSV for further processing

## 🎯 Scoring System

The AI evaluates candidates across three key dimensions:

### 🔧 **Technical Mastery (0-100)**
- Skills alignment with job requirements
- Technical depth and breadth
- Certifications and achievements
- Problem-solving indicators

### 💪 **Experience Dominance (0-100)**
- Relevant work experience
- Career progression trajectory
- Leadership and impact metrics
- Industry experience relevance

### 🌟 **Cultural Synergy (0-100)**
- Communication style assessment
- Team collaboration indicators
- Adaptability signals
- Company culture alignment

### 🏆 **Tier Classifications**
- **90-100**: LEGENDARY TIER (Immediate hire, unicorn candidate)
- **80-89**: ELITE TIER (Top 10%, strong hire)
- **70-79**: SOLID TIER (Good candidate, consider)
- **60-69**: AVERAGE TIER (Potential with development)
- **0-59**: REJECTED TIER (Not suitable)

## 🔧 Configuration

### Environment Variables
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Supported File Types
- **PDF**: `.pdf`
- **Microsoft Word**: `.doc`, `.docx`
- **Plain Text**: `.txt`

## 🎨 Customization

### Themes
The application uses a dark cyberpunk theme by default. You can customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#06b6d4', // Cyan
      secondary: '#8b5cf6', // Purple
      accent: '#f59e0b', // Amber
    }
  }
}
```

### AI Prompt Customization
Modify the analysis prompt in `src/services/geminiService.ts` to adjust the AI's personality and evaluation criteria.

## 📱 Mobile Support

The application is fully responsive and works perfectly on:
- 📱 Mobile phones (iOS/Android)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🔒 Privacy & Security

- **Local Storage**: All data stays in your browser
- **No Server**: No resume data sent to external servers
- **API Security**: Only job descriptions and anonymized content sent to Gemini
- **HTTPS Ready**: Secure deployment compatible

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI**: For the incredible Gemini 1.5 Flash API
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Lucide**: For beautiful icons


---


