import React from "react";

export const metadata = {
  title: "Journey | Patel Prince",
  description: "My learning and academic timeline.",
};

const timelineNodes = [
  {
    phase: "Phase 01",
    title: "Programming Fundamentals",
    description: "Started with foundational concepts using C and C++.",
  },
  {
    phase: "Phase 02",
    title: "Python Ecosystem",
    description: "Expanded into Python for its flexibility and power in modern software development.",
  },
  {
    phase: "Phase 03",
    title: "Data Systems",
    description: "Explored Pandas, NumPy, and SQL to manipulate, clean, and understand datasets.",
  },
  {
    phase: "Phase 04",
    title: "Analytics & Insights",
    description: "Began interpreting data patterns to extract meaningful business and real-world insights.",
  },
  {
    phase: "Phase 05",
    title: "Machine Learning",
    description: "Started building predictive models and exploring classic ML algorithms.",
  },
  {
    phase: "Phase 06",
    title: "AI & RAG Systems",
    description: "Currently exploring advanced architectures like LangChain and RAG for intelligent data interaction.",
  },
];

export default function JourneyPage() {
  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Journey</h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light">
          A progression of curiosity, from basic programming constructs to complex AI architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Timeline */}
        <div className="lg:col-span-8 relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.1)]"></div>
          
          <div className="space-y-12 relative">
            {timelineNodes.map((node, i) => (
              <div key={i} className="flex gap-6 md:gap-8 relative group">
                <div className="flex-none mt-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs text-gray-500 font-mono tracking-wider group-hover:border-white transition-colors z-10 relative backdrop-blur-md">
                    {node.phase.replace('Phase ', '')}
                  </div>
                </div>
                <div className="pt-2 md:pt-4 flex-1">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-accent transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-8 rounded-lg sticky top-32">
            <h2 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-8">Education</h2>
            
            <div className="space-y-8">
              <div className="relative pl-4 border-l border-white/20">
                <div className="absolute w-2 h-2 rounded-full bg-white -left-[5px] top-1.5"></div>
                <h3 className="text-lg font-medium text-white mb-1">B.Tech CSE</h3>
                <p className="text-gray-400 text-sm mb-2">CSPIT, CHARUSAT, Changa</p>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-mono">2024 - 2028</span>
                  <span className="text-sm font-medium text-gray-300">CGPA: 7.95/10</span>
                </div>
                <p className="text-xs text-accent-muted mt-2">Current: 3rd year, Semester 5</p>
              </div>

              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute w-2 h-2 rounded-full bg-white/40 -left-[5px] top-1.5"></div>
                <h3 className="text-base font-medium text-gray-300 mb-1">12th Grade</h3>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-mono">Academic</span>
                  <span className="text-sm font-medium text-gray-400">85%</span>
                </div>
              </div>

              <div className="relative pl-4 border-l border-white/10">
                <div className="absolute w-2 h-2 rounded-full bg-white/40 -left-[5px] top-1.5"></div>
                <h3 className="text-base font-medium text-gray-300 mb-1">10th Grade</h3>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-mono">Academic</span>
                  <span className="text-sm font-medium text-gray-400">90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
