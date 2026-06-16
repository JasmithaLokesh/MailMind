import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type Theme =
  | "light"
  | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
  });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [theme, setTheme] =
    useState<Theme>("light");

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      setTheme(savedTheme);
    }

  }, []);

  useEffect(() => {

    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );

  };

  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>

  );
}

export const useTheme = () =>
  useContext(ThemeContext);