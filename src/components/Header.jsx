import React, { useState, useContext } from "react";
import ThemeContext from "../contenxt/ThemeContext";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);
  const handleClick = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="header">
      <h1 style={{ color }}>React hooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? "Dark mode" : "light mode"}
      </button>
    </div>
  );
};

export default Header;
