import {
  FaMoon,
  FaSun
} from "react-icons/fa";

import {
  useTheme
} from "../context/ThemeContext";

export default function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (

    <button
      onClick={toggleTheme}
      className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      border
      transition
      "
    >

      {theme === "light" ? (
        <>
          <FaMoon />
          Dark
        </>
      ) : (
        <>
          <FaSun />
          Light
        </>
      )}

    </button>

  );
}