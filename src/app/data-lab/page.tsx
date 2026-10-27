"use client";

import React, { useState } from "react";
import { Database, LineChart, Activity, Sliders, RefreshCw, Cpu, Layers } from "lucide-react";

export default function DataLabPage() {
  // Interactive model tuning simulator
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(50);
  const [featureCount, setFeatureCount] = useState(8);

  // Compute simulated dynamic metrics based on parameters
  const simulatedAccuracy = Math.min(
    96.4, 
    Math.max(65.0, 75 + (epochs * 0.28) - (Math.abs(learningRate - 0.005) * 400) + (featureCount * 0.8))
  ).toFixed(1);

  const simulatedLoss = Math.max(
    0.04, 
    (1.2 - (epochs * 0.015) + (Math.abs(learningRate - 0.01) * 20) - (featureCount * 0.02))
  ).toFixed(3);

  const simulatedF1 = (parseFloat(simulatedAccuracy) / 100 * 0.94).toFixed(3);

  return (
    <div className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="mb-16">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--text-meta)] mb-3">EXPERIMENTAL BENCHMARK</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
          DATA LAB
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl text-lg font-light leading-relaxed">
          An interactive laboratory testing statistical architectures, simulated hyperparameter tuning, and real-time model convergence behavior.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-lg text-center border border-[var(--border-subtle)]">
          <Database className="w-7 h-7 text-blue-500 mx-auto mb-3" />
          <h3 className="text-[var(--text-primary)] font-semibold mb-1 text-base">Raw Data Pipelines</h3>
          <p className="text-xs text-[var(--text-secondary)] font-light">
            Automated outlier handling, missing value imputation, and z-score normalization.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-lg text-center border border-[var(--border-subtle)]">
          <LineChart className="w-7 h-7 text-amber-500 mx-auto mb-3" />
          <h3 className="text-[var(--text-primary)] font-semibold mb-1 text-base">Correlation Matrix</h3>
          <p className="text-xs text-[var(--text-secondary)] font-light">
            Multivariate Pearson correlation coefficients and dimensionality reduction.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-lg text-center border border-[var(--border-subtle)]">
          <Activity className="w-7 h-7 text-green-500 mx-auto mb-3" />
          <h3 className="text-[var(--text-primary)] font-semibold mb-1 text-base">Inference Engines</h3>
          <p className="text-xs text-[var(--text-secondary)] font-light">
            Model evaluation, gradient boosting, cross-validation, and ROC-AUC curve mapping.
          </p>
        </div>
      </div>

      {/* Interactive Hyperparameter Playground */}
      <div className="glass-panel p-8 md:p-10 rounded-lg border border-[var(--border-subtle)] mb-16 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--border-subtle)] pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[var(--text-primary)] mb-1">
              <Sliders className="w-4 h-4 text-green-500" />
              <h2 className="text-lg font-mono font-semibold uppercase tracking-wider">
                INTERACTIVE HYPERPARAMETER SIMULATOR
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Adjust parameters below to simulate gradient descent convergence and metric shifts in real-time.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full">
            LIVE COMPUTE ENGINE
          </span>
        </div>

        {/* Controls & Realtime Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">LEARNING RATE (α)</span>
              <span className="text-[var(--text-primary)] font-bold">{learningRate}</span>
            </div>
            <input 
              type="range" 
              min="0.001" 
              max="0.05" 
              step="0.001"
              value={learningRate} 
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-[var(--text-primary)] cursor-pointer"
            />
            <p className="text-[10px] text-[var(--text-meta)] font-mono">Controls step size during gradient optimization</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">TRAINING EPOCHS</span>
              <span className="text-[var(--text-primary)] font-bold">{epochs}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="150" 
              step="5"
              value={epochs} 
              onChange={(e) => setEpochs(parseInt(e.target.value))}
              className="w-full accent-[var(--text-primary)] cursor-pointer"
            />
            <p className="text-[10px] text-[var(--text-meta)] font-mono">Number of complete passes through training dataset</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">INPUT FEATURES</span>
              <span className="text-[var(--text-primary)] font-bold">{featureCount}</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="20" 
              step="1"
              value={featureCount} 
              onChange={(e) => setFeatureCount(parseInt(e.target.value))}
              className="w-full accent-[var(--text-primary)] cursor-pointer"
            />
            <p className="text-[10px] text-[var(--text-meta)] font-mono">Independent statistical dimensions fed to model</p>
          </div>

        </div>

        {/* Real-time Dynamic Metrics Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
          
          <div className="p-4 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-center">
            <p className="text-[10px] font-mono tracking-widest text-[var(--text-meta)] uppercase mb-1">ACCURACY SCORE</p>
            <p className="text-3xl font-mono font-bold text-green-500">{simulatedAccuracy}%</p>
            <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-300" 
                style={{ width: `${simulatedAccuracy}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-center">
            <p className="text-[10px] font-mono tracking-widest text-[var(--text-meta)] uppercase mb-1">LOG LOSS</p>
            <p className="text-3xl font-mono font-bold text-blue-400">{simulatedLoss}</p>
            <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-blue-400 h-full transition-all duration-300" 
                style={{ width: `${Math.min(100, parseFloat(simulatedLoss) * 80)}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded text-center">
            <p className="text-[10px] font-mono tracking-widest text-[var(--text-meta)] uppercase mb-1">HARMONIC F1-SCORE</p>
            <p className="text-3xl font-mono font-bold text-amber-400">{simulatedF1}</p>
            <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300" 
                style={{ width: `${parseFloat(simulatedF1) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>

      {/* Flagship Research Preview */}
      <div className="glass-panel p-8 md:p-12 rounded-lg border border-dashed border-[var(--border-subtle)] text-center relative overflow-hidden">
        <h2 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
          Flagship End-to-End Pipeline in Architecture
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-light leading-relaxed mb-6 text-sm md:text-base">
          A comprehensive end-to-end Data Science pipeline is currently being developed. Featuring automated web ingestion, Exploratory Data Analysis (EDA), XGBoost classification, and real-time Streamlit dashboard deployment.
        </p>
        <div className="inline-flex items-center text-xs font-mono tracking-widest text-[var(--text-primary)] uppercase px-4 py-2 border border-[var(--border-subtle)] rounded-full">
          Status: Active Architecture Phase
        </div>
      </div>
    </div>
  );
}
