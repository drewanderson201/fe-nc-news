import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currentTheme)=>{
        return currentTheme === "light"?"dark":"light";
    })
    console.log("click")
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
