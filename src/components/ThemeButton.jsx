import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currentTheme)=>{
        const newTheme = currentTheme === "light" ? "dark" : "light";
        console.log("new theme after button click >>> ", newTheme)
        localStorage.setItem("theme", newTheme);
        return newTheme;
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className={`button-theme button-theme-${theme}`}
    >
      {theme}
    </button>
  );
}
