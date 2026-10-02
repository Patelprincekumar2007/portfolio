import React from "react";
import { Database, LineChart, Activity } from "lucide-react";

export const metadata = {
  title: "Data Lab | Patel Prince",
  description: "Experimental data space.",
};

export default function DataLabPage() {
  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Data Lab</h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light">
          An experimental space for small, verifiable data demonstrations, model evaluations, and ongoing research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="glass-panel p-6 rounded-lg text-center">
          <Database className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Raw Datasets</h3>
          <p className="text-sm text-gray-400 font-light">Processing real-world messy data into structured formats.</p>
        </div>
        <div className="glass-panel p-6 rounded-lg text-center">
          <LineChart className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Analysis</h3>
          <p className="text-sm text-gray-400 font-light">Extracting statistical significance and correlations.</p>
        </div>
        <div className="glass-panel p-6 rounded-lg text-center">
          <Activity className="w-8 h-8 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Models</h3>
          <p className="text-sm text-gray-400 font-light">Evaluating predictive systems and tuning parameters.</p>
        </div>
      </div>

      <div className="glass-panel p-12 rounded-lg border border-dashed border-[rgba(255,255,255,0.2)] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_50%)] pointer-events-none"></div>
        <h2 className="text-2xl font-semibold mb-4">Flagship Project in Development</h2>
        <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed mb-8">
          A comprehensive end-to-end Data Science project is currently being architected. It will feature real-world data cleaning, exploratory data analysis, feature engineering, model evaluation, and business insights.
        </p>
        <div className="inline-flex items-center text-xs font-mono tracking-widest text-gray-500 uppercase px-4 py-2 border border-gray-700 rounded-full">
          Status: Architecture Phase
        </div>
      </div>
    </div>
  );
}
