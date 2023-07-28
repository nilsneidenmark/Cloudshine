import React, { useContext } from "react";
import DarkModeContext from "../DarkModeContext";
import darkModeImg from "../../public/icons/darkMode.png";
import lightModeImg from "../../public/icons/lightMode.png";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const img = darkMode ? lightModeImg : darkModeImg;

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    console.log(darkMode);
  };

  if (darkMode) {
    document.body.style = "background: rgb(45, 45, 45);";
  } else {
    document.body.style = "background: white;";
  }

  return (
    <img
      onClick={toggleDarkMode}
      src={img}
      alt="dark mode toggle"
      width="20px"
      height="20px"
    />
  );
};

export default DarkModeToggle;
