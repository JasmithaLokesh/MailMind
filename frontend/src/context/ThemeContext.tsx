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

    if (theme === "light") {

  document.body.style.backgroundColor =
    "#FFFFFF";

  document.body.style.color =
    "#0F172A";

} else {

  document.body.style.backgroundColor =
    "#0F172A";

  document.body.style.color =
    "#FFFFFF";

}

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

    console.log("Theme changed");

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