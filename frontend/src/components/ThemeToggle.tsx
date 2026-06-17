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
    w-14
    h-14
    rounded-2xl
    border
    border-[#97E7F5]
    bg-white
    dark:bg-slate-800
    flex
    items-center
    justify-center
    shadow-sm
    hover:shadow-md
    hover:scale-105
    transition-all
    duration-300
    "
  >

    {theme === "light" ? (
      <FaMoon
        size={22}
        className="text-[#009DD1]"
      />
    ) : (
      <FaSun
        size={22}
        className="text-[#7ED348]"
      />
    )}

  </button>

);
}