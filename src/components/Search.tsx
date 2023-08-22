import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import searchImgDark from "../../src/icons/search-dark.png";
import searchImgLight from "../../src/icons/search-light.png";
import DarkModeContext from "../DarkModeContext";
import { useDarkMode } from "../utils";
import { SearchProps } from "../interface/interface";

export default function Search(props: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const searchImg = darkMode ? searchImgLight : searchImgDark;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.length > 0) {
      const urlSearchParams = new URLSearchParams(location.search);

      if (urlSearchParams.has("query")) {
        urlSearchParams.delete("query");
      }
      urlSearchParams.set("query", inputValue);
      const newSearchString = urlSearchParams.toString();
      const newUrl = `/search/?${newSearchString}`;

      navigate(newUrl);
      console.log(newUrl);
    }
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={searchImg} alt="search" width="15px" height="15px" />
      <input
        className={useDarkMode("search")}
        type="text"
        placeholder={props.placeholder}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        onChange={handleInputChange}
        value={inputValue}
      />
    </form>
  );
}
