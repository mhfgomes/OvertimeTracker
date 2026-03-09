"use client";

import * as React from "react";
import { DEFAULT_THEME, type Theme } from "./theme.config";

const COOKIE_NAME = "active_theme";

function setThemeCookie(theme: Theme) {
  if (typeof window !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }
}

interface ActiveThemeContextValue {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
}

const ActiveThemeContext = React.createContext<ActiveThemeContextValue>({
  activeTheme: DEFAULT_THEME,
  setActiveTheme: () => undefined,
});

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [activeTheme, setActiveThemeState] = React.useState<Theme>(
    initialTheme ?? DEFAULT_THEME
  );

  const setActiveTheme = React.useCallback((theme: Theme) => {
    setActiveThemeState(theme);
    setThemeCookie(theme);
  }, []);

  React.useEffect(() => {
    // Apply data-theme attribute to html element
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  // Apply on initial render
  React.useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      initialTheme ?? DEFAULT_THEME
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ActiveThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ActiveThemeContext.Provider>
  );
}

export function useThemeConfig() {
  return React.useContext(ActiveThemeContext);
}
