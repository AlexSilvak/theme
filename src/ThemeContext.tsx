import React, { createContext, useContext, useState, useEffect } from "react";

// Defina os tipos de tema possíveis (ex: light e dark)
type Theme = "light" | "dark";

// Crie o contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Defina o contexto
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Verifique o localStorage para pegar o tema salvo
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? (savedTheme as Theme) : "light"; // padrão "light"
  });

  useEffect(() => {
    // Salve o tema no localStorage quando o tema mudar
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
