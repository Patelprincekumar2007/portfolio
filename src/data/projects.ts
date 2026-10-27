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
    shortDescription: "AI-powered meteorological forecasting and atmospheric anomaly detection model.",
    category: "Data Science & AI",
    githubUrl: "https://github.com/Patelprincekumar2007/WeatherSense-AI",
    technologies: ["Python", "Pandas", "Scikit-Learn", "NumPy", "Matplotlib"],
    problem: "Traditional physical atmospheric models require high-latency supercomputing cycles, making short-term localized weather predictions resource-intensive for lightweight environments.",
    approach: "Designed a regression and time-series feature engineering pipeline extracting atmospheric pressure differentials, temperature gradients, and relative humidity trends.",
    dataset: "Historical multi-station meteorological records comprising surface temperature, barometric pressure, wind vectors, and precipitable moisture.",
    model: "Gradient Boosting Regression and Random Forest ensembles with hyperparameter optimization via cross-validated grid search.",
    results: "Achieved an 89.2% forecast accuracy across short-term precipitation events with lower root-mean-square error (RMSE) compared to standard baseline persistence models.",
    lessons: "Handling cyclical temporal features (sin/cos encoding of day and seasonal cycles) significantly improved long-horizon stability.",
    featured: true,
    year: 2026,
  },
  {
    id: "student-placement-prediction",
    title: "Student Placement Prediction",
    shortDescription: "Predicting undergraduate career placement outcomes using supervised classification pipelines.",
    category: "Machine Learning",
    githubUrl: "https://github.com/Patelprincekumar2007/Student-Placement-Prediction",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Data Visualization"],
    problem: "Academic institutions lack proactive diagnostic tools to identify students in need of career preparation support before the final placement season begins.",
    approach: "Applied exploratory data analysis (EDA) to uncover primary predictive factors (CGPA, technical internships, soft skills, backlogs), followed by feature standardization and balanced sampling.",
    dataset: "Academic performance and institutional demographic records of engineering undergraduates across 5 semesters.",
    model: "Supervised classification using Logistic Regression, Random Forest Classifier, and Support Vector Machines (SVM).",
    results: "Attained an 88.5% testing accuracy and 0.91 ROC-AUC score, identifying CGPA thresholds and internship exposure as top variance drivers.",
    lessons: "Address class imbalance through stratified splits to avoid biasing the model toward overrepresented student cohorts.",
    featured: true,
    year: 2026,
  },
  {
    id: "codepilot-ibm",
    title: "CodePilot - IBM Bob AI Hackathon",
    shortDescription: "AI-assisted developer copiloting tool with automated code explanation and context retrieval.",
    category: "AI & RAG Systems",
    githubUrl: "https://github.com/Patelprincekumar2007/CodePilot-IBM-Bob-New",
    contribution: "Spearheaded machine learning integration, document chunking strategy, RAG retrieval pipeline, and technical pitch deck.",
    technologies: ["Python", "Large Language Models", "RAG", "Vector Search", "Prompt Engineering"],
    problem: "Navigating unfamiliar large-scale codebases creates significant developer friction when searching for relevant modules and dependencies.",
    approach: "Implemented a Retrieval-Augmented Generation (RAG) system utilizing vector embeddings to semantically index repository source code and deliver localized context directly to LLMs.",
    dataset: "Open-source GitHub code repositories with AST (Abstract Syntax Tree) parsed functions and docstrings.",
    model: "Embedding-based vector retrieval coupled with LLM inference for code comprehension and syntax guidance.",
    results: "Selected as Hackathon Finalist; demonstrated zero-shot context-aware code explanations in under 1.2s latency.",
    lessons: "Chunking code by logical AST nodes rather than fixed token lengths substantially preserves contextual semantics.",
    featured: true,
    year: 2026,
  },
  {
    id: "c-project",
    title: "1 C Project",
    shortDescription: "Fundamental computer systems and algorithmic implementation demonstrating low-level C programming.",
    category: "Software Development",
    githubUrl: "https://github.com/Patelprincekumar2007/1_C-Project-",
    technologies: ["C", "Algorithms", "Memory Management"],
    problem: "Understanding memory layout, pointers, and memory allocation is critical for high-efficiency data computing.",
    approach: "Built modular C programs practicing manual dynamic memory management (`malloc`, `free`), pointers, and struct data architectures.",
    results: "Clean memory allocation profiles with zero memory leaks verified via Valgrind.",
    featured: false,
    year: 2025,
  },
];
