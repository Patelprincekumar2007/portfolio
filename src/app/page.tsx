"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundEngine } from "@/lib/audio";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import CodePilotVisual from "@/components/ui/CodePilotVisual";
import { useApp } from "@/context/AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const { introFinished, theme } = useApp();
  
  useGSAP(() => {
    if (!introFinished) return;

    // 1. HERO TYPOGRAPHY
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    heroTl.to(".hero-firstName", { xPercent: -50, opacity: 0, rotateY: -10, scale: 1.1 }, 0)
          .to(".hero-lastName", { xPercent: 50, opacity: 0, rotateY: 10, scale: 1.1 }, 0)
          .to(".hero-subtitle", { yPercent: 50, opacity: 0 }, 0);

    // 2. PROJECT REVEALS
    const projects = gsap.utils.toArray(".project-chapter");
    projects.forEach((project: any) => {
      gsap.fromTo(
        project,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });

    // 3. JOURNEY HORIZONTAL SCROLL
    const journeyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".journey-section",
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
      }
    });
    
    journeyTl.to(".journey-container", {
      xPercent: -100,
      ease: "none"
    });

  }, { scope: container, dependencies: [introFinished] });

  // If intro is not finished, render nothing (IntroSequence handles the overlay)
  if (!introFinished) return null;

  return (
    <div ref={container} className="w-full min-h-screen overflow-x-hidden">
      
      {/* 
        ==================================================
        HERO SEQUENCE
        ==================================================
      */}
      <section className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 perspective-[1000px]">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="hero-firstName text-[14vw] leading-[0.8] font-bold tracking-tighter uppercase transform-style-3d">PATEL</h1>
            <h1 className="hero-lastName text-[14vw] leading-[0.8] font-bold tracking-tighter uppercase ml-[10vw] transform-style-3d">PRINCE</h1>
          </div>
        </div>

        <div className="hero-subtitle absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-10">
          <h2 className="text-[12vw] font-bold tracking-tighter uppercase leading-[0.8] text-center text-balance">
            DATA SCIENCE<br/>& ANALYTICS
          </h2>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 flex flex-col z-20 max-w-sm">
          <p className="text-sm md:text-lg font-light tracking-tight leading-snug">
            I turn messy data into models, insights, and intelligent systems.
          </p>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 flex flex-col z-20 text-right space-y-1">
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">BASED IN GUJARAT, INDIA</p>
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">OPEN TO INTERNSHIPS</p>
          <p className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">2026</p>
        </div>
      </section>

      {/* 
        ==================================================
        PROFILE / ABOUT
        ==================================================
      */}
      <section id="about" className="w-full px-6 md:px-12 py-48 border-t border-[var(--border-subtle)] flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/2">
          <h2 className="text-[10vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.9] hover-expand transition-transform origin-left">
            WHO<br/>IS<br/>PATEL<br/>PRINCE?
          </h2>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-end space-y-16">
          
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">EDUCATION</p>
            <p className="text-2xl md:text-4xl font-light tracking-tight text-balance">
              B.Tech Computer Science & Engineering<br/>
              <span className="text-[var(--text-secondary)]">CSPIT, CHARUSAT (2024-2028)</span>
            </p>
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--text-secondary)]">Semester 5 — CGPA 7.95/10</p>
            <p className="text-sm font-mono tracking-widest uppercase text-[var(--text-secondary)]">10th: 90% | 12th: 85%</p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">FOCUS</p>
            <p className="text-2xl md:text-4xl font-light tracking-tight text-balance">
              Data Science / Analytics<br/>
              Machine Learning / Generative AI
            </p>
          </div>

        </div>
      </section>

      {/* 
        ==================================================
        WORK
        ==================================================
      */}
      <section id="work" className="w-full py-24 border-t border-[var(--border-subtle)]">
        
        {/* Project 01 */}
        <div className="project-chapter px-6 md:px-12 mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">01</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">WeatherSense<br/>AI</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#111] relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#222] opacity-50 mix-blend-overlay"></div>
            {/* Visual Environment Representation */}
            <div className="w-full h-full absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, var(--text-meta) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
            <h4 className="text-[10vw] font-bold text-white opacity-20 rotate-12 scale-150 transform transition-transform duration-[2s] group-hover:scale-100 group-hover:rotate-0">ATMOSPHERE</h4>
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">Machine Learning / Python / Data</p>
            <a href="https://github.com/Patelprincekumar2007/WeatherSense-AI" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>

        {/* Project 02 */}
        <div className="project-chapter px-6 md:px-12 mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">02</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">Student<br/>Placement</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#0f0f11] relative overflow-hidden flex items-end justify-between p-12 md:p-24 group border border-[var(--border-subtle)]">
            <h4 className="text-[8vw] font-bold text-[#fff] opacity-10 absolute top-12 left-12">PROBABILITY</h4>
            {/* Analytical Visualization Representation */}
            <div className="w-1/4 h-[40%] bg-[#222] transition-all duration-[1s] group-hover:h-[60%]"></div>
            <div className="w-1/4 h-[60%] bg-[#333] transition-all duration-[1s] group-hover:h-[30%]"></div>
            <div className="w-1/4 h-[80%] bg-[#555] transition-all duration-[1s] group-hover:h-[90%]"></div>
            <div className="w-1/4 h-[100%] bg-[#888] transition-all duration-[1s] group-hover:h-[70%]"></div>
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">Data Visualization / Model Prediction</p>
            <a href="https://github.com/Patelprincekumar2007/Student-Placement-Prediction" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>

        {/* Project 03 */}
        <div className="project-chapter px-6 md:px-12 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-start space-x-6 md:space-x-12">
              <span className="text-2xl md:text-4xl font-mono tracking-tighter text-[var(--text-secondary)]">03</span>
              <h3 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none hover-expand">IBM Bob<br/>CodePilot</h3>
            </div>
          </div>
          <div className="w-full aspect-video bg-[#050505] relative overflow-hidden flex items-center justify-center group border border-[var(--border-subtle)]">
             <CodePilotVisual />
          </div>
          <div className="flex justify-between items-center mt-8 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
            <p className="text-[var(--text-secondary)]">AI / Logistics / Hackathon</p>
            <a href="https://github.com/Patelprincekumar2007/bob-ai-hackathon-PI-NANT" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors flex items-center hover-expand">
              GITHUB <ArrowUpRight className="w-3 h-3 ml-2" />
            </a>
          </div>
        </div>

      </section>

      {/* 
        ==================================================
        EXPERIENCE
        ==================================================
      */}
      <section className="w-full px-6 md:px-12 py-48 border-t border-[var(--border-subtle)] flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/3">
           <h3 className="text-3xl font-bold tracking-tighter uppercase">EXPERIENCE</h3>
        </div>
        <div className="lg:w-2/3 space-y-24">
           <div className="space-y-4">
             <h4 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none hover-expand">DATA SCIENCE<br/>INTERN</h4>
             <p className="text-2xl font-light text-[var(--text-secondary)]">SPARKS TO IDEAS</p>
             <p className="text-sm font-mono tracking-widest text-[var(--text-meta)] uppercase pt-4">11 May 2026 — 12 June 2026</p>
           </div>
           <div className="space-y-4 pt-12 border-t border-[var(--border-subtle)]">
             <h4 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none hover-expand">IBM BOB<br/>AI HACKATHON</h4>
             <p className="text-2xl font-light text-[var(--text-secondary)]">2026</p>
             <ul className="text-sm font-mono tracking-widest text-[var(--text-meta)] uppercase space-y-2 pt-4">
               <li>— ML / AI implementation</li>
               <li>— PPT / presentation development</li>
             </ul>
           </div>
        </div>
      </section>

      {/* 
        ==================================================
        JOURNEY
        ==================================================
      */}
      <section className="journey-section h-screen w-full overflow-hidden border-y border-[var(--border-subtle)] flex items-center">
        <div className="journey-container flex items-center h-full w-[300vw]">
          
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-primary)]">C / C++</h3>
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-secondary)]">PYTHON</h3>
          </div>

          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-meta)]">DATA</h3>
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-secondary)]">ANALYTICS</h3>
          </div>

          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-secondary)]">MACHINE LEARNING</h3>
             <h3 className="text-[12vw] font-bold tracking-tighter uppercase hover-expand text-[var(--text-primary)]">AGENTIC AI</h3>
          </div>

        </div>
      </section>

      {/* 
        ==================================================
        SKILLS
        ==================================================
      */}
      <section className="w-full px-6 md:px-12 py-48 border-t border-[var(--border-subtle)]">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            
            <div className="space-y-8">
               <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">CODE</p>
               <ul className="text-4xl md:text-5xl font-bold tracking-tighter uppercase space-y-2">
                 <li className="hover-expand">C</li>
                 <li className="hover-expand">C++</li>
                 <li className="hover-expand">PYTHON</li>
               </ul>
            </div>

            <div className="space-y-8">
               <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">DATA</p>
               <ul className="text-4xl md:text-5xl font-bold tracking-tighter uppercase space-y-2">
                 <li className="hover-expand">NUMPY</li>
                 <li className="hover-expand">PANDAS</li>
                 <li className="hover-expand">SQL</li>
               </ul>
            </div>

            <div className="space-y-8">
               <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">AI</p>
               <ul className="text-4xl md:text-5xl font-bold tracking-tighter uppercase space-y-2">
                 <li className="hover-expand text-2xl md:text-4xl leading-tight">MACHINE LEARNING</li>
                 <li className="hover-expand">RAG</li>
                 <li className="hover-expand">LANGCHAIN</li>
               </ul>
            </div>

            <div className="space-y-8">
               <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-meta)]">TOOLS</p>
               <ul className="text-4xl md:text-5xl font-bold tracking-tighter uppercase space-y-2">
                 <li className="hover-expand">GIT</li>
                 <li className="hover-expand">GITHUB</li>
               </ul>
            </div>

         </div>
      </section>

      {/* 
        ==================================================
        CONTACT & FOOTER
        ==================================================
      */}
      <section className="w-full px-6 md:px-12 py-32 flex flex-col justify-between min-h-[90vh] text-center border-t border-[var(--border-subtle)]">
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase mb-24 hover-expand transition-transform duration-500">
            LET'S<br/>TALK.
          </h2>
          <p className="text-2xl font-light mb-12">Data Science & Analytics</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
            <a href="mailto:jnpatel3366@gmail.com" className="hover:text-[var(--text-secondary)] transition-colors hover-expand">EMAIL</a>
            <a href="https://www.linkedin.com/in/patel-princekumar-j-323b9a324/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors hover-expand">LINKEDIN</a>
            <a href="https://github.com/patelprincekumar2007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors hover-expand">GITHUB</a>
            <a href="https://leetcode.com/u/patelprince_2007/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors hover-expand">LEETCODE</a>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-[var(--border-subtle)] w-full flex flex-col items-center">
           {/* Footer Signature Motif */}
           <svg viewBox="0 0 500 150" className="w-full max-w-lg opacity-20 mb-8 overflow-visible" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M 100,100 C 105,60 110,20 110,20 C 160,10 160,70 110,70 C 90,75 80,110 130,110 C 140,90 150,110 160,100 C 170,90 180,110 190,100" />
             <path d="M 220,100 C 225,60 230,20 230,20 C 280,10 280,70 230,70 C 210,75 200,110 250,110 C 260,90 270,110 280,100 C 290,90 300,110 310,100" />
             <path d="M 80,130 C 150,140 250,120 350,110" strokeWidth="1.5" opacity="0.6" />
           </svg>
           <h2 className="text-4xl font-bold tracking-tighter uppercase mb-2">PATEL PRINCE</h2>
           <p className="text-sm font-light tracking-widest uppercase mb-12">DATA SCIENCE & ANALYTICS</p>

           <div className="w-full flex flex-col md:flex-row justify-between text-[10px] font-mono tracking-widest text-[var(--text-meta)] uppercase">
             <p>CSPIT · CHARUSAT</p>
             <p className="my-2 md:my-0">GUJARAT, INDIA</p>
             <p>© 2026 PATEL PRINCE</p>
           </div>
        </div>

      </section>

    </div>
  );
}
