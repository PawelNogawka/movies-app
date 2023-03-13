import React, { useState } from "react";

import { NavLink, Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import Wrapper from "./ui/Wrapper";
import Button from "./ui/Button";
import classes from "./Navbar.module.scss";
import Search from "./Search";
import Avatar from "./Avatar";

import { AiFillHeart } from "react-icons/ai";

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const { user } = useAuthContext();
  const { logout, isLoading } = useLogout();

  const handleBurgerMenuClick = () => {
    setIsNavActive(true);
  };

  const handleCloseBtnClick = () => {
    setIsNavActive(false);
  };

  return (
    <header>
      <Wrapper>
        <nav className={classes.nav}>
          <Link className={classes.logo} to="/">
            logo
          </Link>
          <ul
            className={`${classes["nav-list"]} ${
              isNavActive && classes.active
            }`}
          >
            <button className={classes.close} onClick={handleCloseBtnClick}>
              <AiOutlineClose />
            </button>
            <li>
              <Search mobile setIsNavActive={setIsNavActive} />
            </li>
            <li>
              <NavLink
                exact="true"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/"
                onClick={() => setIsNavActive(false)}
              >
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/movies/popular"
                onClick={() => setIsNavActive(false)}
              >
                popular
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/movies/top_rated"
                onClick={() => setIsNavActive(false)}
              >
                top rated
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/movies/upcoming"
                onClick={() => setIsNavActive(false)}
              >
                upcoming
              </NavLink>
            </li>
          </ul>
          <Search />
          {!user && (
            <div className={classes["auth-nav"]}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : classes.signin
                }
                to="/signin"
              >
                sign in
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <Button text="sign up" />
              </NavLink>
            </div>
          )}
          {user && (
            <div className={classes["auth-success"]}>
              <div className={classes.user}>
                <Avatar src={user.photoURL} />
                <p>Hello, {user.displayName}</p>
                <Link to="/movies/favourites">
                  <AiFillHeart className={classes.heart} />
                </Link>
              </div>

              <Button
                text={isLoading ? "loading..." : "logout"}
                onClick={logout}
              />
            </div>
          )}
          <button className={classes.menu} onClick={handleBurgerMenuClick}>
            <BiMenuAltRight />
          </button>
        </nav>
      </Wrapper>
    </header>
  );
};

export default Navbar;
