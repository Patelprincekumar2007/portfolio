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
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    soundEngine.enabled = val;
    if (val) {
      soundEngine.init();
    }
  };

  const toggleTheme = () => {
    // Physical transition trigger will happen via class manipulation in the components,
    // this just manages the state string.
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, [theme]);

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
      <div className={`theme-transition-wrapper ${theme}`}>
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
