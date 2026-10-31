export const profile = {
  name: "Patel Princekumar",
  shortName: "Patel Prince",
  role: "Data Science / Analytics / AI Engineering",
  eyebrow: "CSE · CSPIT, CHARUSAT · Gujarat, India",
  tagline:
    "I turn messy, high-dimensional data into clean models and clear answers people can act on.",
  location: "Gujarat, India",
  education: "B.Tech CSE 2024–2028 · Semester 5 · CGPA 7.90",
  emailCollege: "24cs073@charusat.edu.in",
  emailPersonal: "jnpatel3366@gmail.com",
  github: "https://github.com/Patelprincekumar2007",
  linkedin: "https://www.linkedin.com/in/patel-princekumar-j-323b9a324/",
  cvPdf: "/cv/Patel_Princekumar_Resume.pdf",
};

export type Project = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
  badge?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "AI-IGMS",
    tagline: "Integrated Government School Management System",
    description:
      "A role-based school management platform for Principal, Teacher, Student and Parent users - attendance, marks, leave, student and teacher management, notices and timetable modules, with role-based authentication and a dedicated Parent Portal.",
    tags: ["React", "Vite", "JavaScript", "MongoDB", "SGP Project"],
  },
  {
    index: "02",
    title: "Student Placement Prediction",
    tagline: "ML classification with a Streamlit front",
    description:
      "Supervised machine-learning application that predicts a student's placement outcome - full preprocessing, model development and evaluation, presented through an interactive Streamlit app. Built during my Data Science internship at Sparks To Ideas.",
    tags: ["Python", "scikit-learn", "Pandas", "NumPy", "Streamlit"],
    link: {
      label: "GitHub",
      href: "https://github.com/Patelprincekumar2007/Student-Placement-Prediction",
    },
  },
  {
    index: "03",
    title: "WeatherSense AI",
    tagline: "Intelligent forecast engine",
    description:
      "A machine-learning weather forecasting engine - predictive meteorology in Python, from raw atmospheric data to a usable forecast.",
    tags: ["Python", "Machine Learning", "Forecasting"],
    link: {
      label: "GitHub",
      href: "https://github.com/Patelprincekumar2007/WeatherSense-AI",
    },
  },
  {
    index: "04",
    title: "CodePilot",
    tagline: "AI-assisted development & logistics optimization",
    badge: "IBM Bob AI Hackathon Finalist",
    description:
      "An AI-assisted development and logistics optimization tool built on Retrieval-Augmented Generation and LLMs. I engineered the prompt pipelines and context retrieval, and pitched the system architecture at the finals.",
    tags: ["RAG", "LLMs", "Python", "Hackathon 2026"],
    link: {
      label: "GitHub",
      href: "https://github.com/Patelprincekumar2007/CodePilot-IBM-Bob-New",
    },
  },
  {
    index: "05",
    title: "Samaj Matrimony Platform",
    tagline: "Community platform, end to end",
    description:
      "A full matrimony website for the 125 Gor Kadva Patel Samaj community - registration and login, match search filters, interest requests, private chat and an admin panel. Designed, built and deployed end to end.",
    tags: ["PHP", "MySQL", "HTML/CSS/JS", "Deployed"],
    link: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/patel-princekumar-j-323b9a324/",
    },
  },
];

export const journey = [
  {
    kind: "INTERNSHIP",
    date: "11 May 2026 — 12 June 2026",
    title: "Data Science Intern",
    org: "Sparks To Ideas, Ahmedabad",
    points: [
      "Built exploratory data analysis pipelines for statistical anomaly detection",
      "Standardized data preprocessing and missing-value imputation across diverse tables",
      "Evaluated model performance using precision, recall and ROC-AUC metrics",
    ],
  },
  {
    kind: "COMPETITION",
    date: "2026",
    title: "IBM Bob AI Hackathon Finalist",
    org: "CodePilot",
    points: [
      "Architected an AI-assisted development and logistics optimization tool on RAG and LLMs",
      "Engineered prompt pipelines and context retrieval, pitched the architecture at the finals",
    ],
  },
  {
    kind: "TEAM LEAD",
    date: "2026",
    title: "Seva First Innovation Challenge",
    org: "Team TM000730 · AI Scholarship & Opportunity Setu",
    points: [
      "Leading the team building Setu, a prototype that matches students to scholarships in plain language",
    ],
  },
  {
    kind: "CERTIFICATION",
    date: "Oct 2026",
    title: "Databricks Fundamentals Accreditation",
    org: "Databricks",
    points: [
      "Industry accreditation on the Databricks Lakehouse platform; working toward the next proctored certification",
    ],
  },
  {
    kind: "EDUCATION",
    date: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    org: "CSPIT, CHARUSAT University",
    points: [
      "Coursework across data structures, algorithms, OOP in C++, DBMS and machine learning foundations",
      "Currently in Semester 5 · CGPA 7.90 / 10",
    ],
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["Python", "C++", "C", "SQL", "JavaScript"],
  },
  {
    label: "Data & ML",
    items: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"],
  },
  {
    label: "AI & Architecture",
    items: ["Generative AI", "RAG Systems", "Prompt Engineering", "Predictive Modeling"],
  },
  {
    label: "Tools & Workflow",
    items: ["Git", "GitHub", "Jupyter", "Streamlit", "MongoDB", "REST APIs"],
  },
];

export const marqueeItems = [
  "Machine Learning",
  "Python",
  "Data Pipelines",
  "RAG Systems",
  "Predictive Modeling",
  "Scikit-Learn",
  "SQL",
  "Generative AI",
  "React",
  "Next.js",
];
