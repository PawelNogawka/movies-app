import React from "react";

import millify from "millify";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";

import Wrapper from "../../components/ui/Wrapper";
import Tag from "../../components/Tag";
import Button from "../../components/ui/Button";
import ReviewForm from "./ReviewForm";

import classes from "./Details.module.scss";

const Details = ({ movie, user }) => {
  const {
    title,
    poster_path,
    genres,
    vote_average,
    revenue,
    homepage,
    runtime,
    budget,
    release_date,
  } = movie;

  const starsArray = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.round(vote_average / 2)) {
      starsArray.push(<MdOutlineStarPurple500 />);
    } else if (i === Math.round(vote_average / 2) && vote_average % 2 >= 0.5) {
      starsArray.push(<MdOutlineStarHalf />);
    } else {
      starsArray.push(<MdOutlineStarOutline />);
    }
  }
  

  const releaseDate = new Date(release_date);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - releaseDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <section id='details' className={classes.info}>
      <Wrapper>
        <div className={classes.row}>
          <div className={classes["img-box"]}>
            <img
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
              alt={title}
            />
          </div>
          <div className={classes.content}>
            <div className={classes["content-feature"]}>
              <h3 className={classes["feature-heading"]}>genre:</h3>
              <ul className={classes["genre-list"]}>
                {genres &&
                  genres.map((genre) => (
                    <li key={genre.id}>
                      <Tag href="/" text={genre.name} />
                    </li>
                  ))}
              </ul>
            </div>
            <div className={classes["content-feature"]}>
              <h3 className={classes["feature-heading"]}>revenue:</h3>
              <div className={classes.revenue}>{starsArray}</div>
              <span> / {millify(revenue)} rev.</span>
            </div>
            {homepage && (
              <div className={classes["content-feature"]}>
                <h3 className={classes["feature-heading"]}>homepage:</h3>
                <a href={homepage} target="_blank" rel="noreferrer nofollow" className={classes["home-link"]}>
                  <Button outlined text="visit" />
                </a>
              </div>
            )}
            <div className={classes["content-feature"]}>
              <h3 className={classes["feature-heading"]}>runtime:</h3>
              <span>{runtime} minutes</span>
            </div>
            <div className={classes["content-feature"]}>
              <h3 className={classes["feature-heading"]}>budget:</h3>
              <span>{millify(budget)} $</span>
            </div>
            {releaseDate && (
              <div className={classes["content-feature"]}>
                <h3 className={classes["feature-heading"]}>release date:</h3>
                <span>
                  {release_date}  /  {diffDays} days ago
                </span>
              </div>
            )}
            {user && <ReviewForm movieTitle={title} />}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Details;
