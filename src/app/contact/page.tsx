"use client";

import React, { useState } from "react";
import { Code, Briefcase, Mail, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate network request since we don't have a backend configured yet
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Cinematic Ending & Links */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Let's Connect</h1>
          <p className="text-gray-400 max-w-md text-lg font-light leading-relaxed mb-12">
            I'm currently seeking internships in Data Science, Machine Learning, and Analytics. I am always open to discussing data-driven projects, opportunities, or new ideas.
          </p>

          <div className="space-y-6">
            <a href="mailto:jnpatel3366@gmail.com" className="group flex items-center p-4 glass-panel rounded-lg hover:border-gray-500 transition-all">
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-1">Email</p>
                <p className="text-white">jnpatel3366@gmail.com</p>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/patel-princekumar-j-323b9a324/" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 glass-panel rounded-lg hover:border-gray-500 transition-all">
              <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-1">LinkedIn</p>
                <p className="text-white">patel-princekumar-j-323b9a324</p>
              </div>
            </a>

            <a href="https://github.com/patelprincekumar2007/" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 glass-panel rounded-lg hover:border-gray-500 transition-all">
              <Code className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors mr-4" />
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-1">GitHub</p>
                <p className="text-white">patelprincekumar2007</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="glass-panel p-8 md:p-10 rounded-lg">
          {status === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-2">Message Received</h3>
              <p className="text-gray-400 font-light max-w-xs mb-8">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="px-6 py-3 bg-[rgba(255,255,255,0.05)] text-white text-sm font-medium rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-start text-red-400">
                  <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">There was an error sending your message. Please try emailing me directly.</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  disabled={status === "submitting"}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  disabled={status === "submitting"}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  disabled={status === "submitting"}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 tracking-wide">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  disabled={status === "submitting"}
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus:outline-none focus:border-gray-400 transition-colors resize-none disabled:opacity-50"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full group flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium tracking-wider rounded-sm hover:bg-gray-200 transition-colors disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
