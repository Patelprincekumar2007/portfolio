export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  problem?: string;
  approach?: string;
  dataset?: string;
  analysis?: string;
  model?: string;
  results?: string;
  contribution?: string;
  lessons?: string;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "weather-sense-ai",
    title: "WeatherSense AI",
    shortDescription: "AI-powered weather forecasting and analysis tool.",
    category: "Data Science & AI",
    githubUrl: "https://github.com/Patelprincekumar2007/WeatherSense-AI",
    technologies: ["Python", "Machine Learning"],
    featured: true,
    year: 2026,
  },
  {
    id: "student-placement-prediction",
    title: "Student Placement Prediction",
    shortDescription: "Predicting student placement outcomes using machine learning.",
    category: "Machine Learning",
    githubUrl: "https://github.com/Patelprincekumar2007/Student-Placement-Prediction",
    technologies: ["Python", "Pandas", "Scikit-Learn"],
    featured: true,
    year: 2026,
  },
  {
    id: "c-project",
    title: "1 C Project",
    shortDescription: "Fundamental programming project demonstrating core C concepts.",
    category: "Software Development",
    githubUrl: "https://github.com/Patelprincekumar2007/1_C-Project-",
    technologies: ["C"],
    featured: false,
    year: 2025,
  },
  {
    id: "codepilot-ibm",
    title: "CodePilot - IBM Bob AI Hackathon",
    shortDescription: "AI-assisted development tool built during the IBM Bob AI Hackathon.",
    category: "AI / RAG",
    githubUrl: "https://github.com/Patelprincekumar2007/CodePilot-IBM-Bob-New",
    contribution: "ML / AI implementation and presentation development.",
    technologies: ["Python", "LLMs", "RAG"],
    featured: true,
    year: 2026,
  },
];
