import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";

import classes from "./Search.module.scss";

const Search = ({ mobile, setIsNavActive }) => {
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const searchTerm = inputRef.current.value;
    if (searchTerm.trim() == "") return;
    inputRef.current.value = "";
    if (mobile) {
      setIsNavActive(false);
    }
    return navigate(`/movies/search/${searchTerm.replace(/ /g, "-")}`);
  };

  return (
    <form
      className={`${classes.form} ${mobile && classes.mobile}`}
      onSubmit={handleFormSubmit}
    >
      <input
        className={classes.input}
        ref={inputRef}
        type="text"
        placeholder="Search..."
      />
      <button className={classes.btn}>
        <BsSearch />
      </button>
    </form>
  );
};

export default Search;
