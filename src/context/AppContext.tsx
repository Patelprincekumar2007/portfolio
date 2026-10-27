"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";

type AppContextType = {
  introFinished: boolean;
  setIntroFinished: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [introFinished, setIntroFinished] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Read stored theme preference on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
    } catch (e) {}
  }, []);

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    soundEngine.enabled = val;
    if (val) {
      soundEngine.init();
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("portfolio_theme", next);
      } catch (e) {}
      return next;
    });
  };

  // Sync theme to document element
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (theme === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
        root.classList.remove("light");
      }
    }
  }, [theme]);

  // Audio Context unlock on first user gesture
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
    const unlockAudio = () => {
      soundEngine.init();
    };
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [soundEnabled]);

  return (
    <AppContext.Provider
      value={{
        introFinished,
        setIntroFinished,
        soundEnabled,
        setSoundEnabled,
        theme,
        toggleTheme,
      }}
    >
      <div className={`theme-transition-wrapper ${theme} w-full min-h-screen flex flex-col`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
