import React from "react";
import { Link } from "react-router-dom";

import { projectFirestore } from "../firebase/config";

import Button from "./ui/Button";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import classes from "./Card.module.scss";

const Card = ({ movie, user, response, updateDocument }) => {
  const { id, poster_path, overview, title } = movie;

  const handleHeartBtnClick = async () => {
    const newMovie = {
      id,
      poster_path,
      overview,
      title,
    };

    updateDocument(user.id, {
      favorites: [...user.favorites, newMovie],
    });
  };

  const handleRemoveBtnClick = async () => {
    const docRef = projectFirestore.collection("users").doc(user.id);

    try {
      const doc = await docRef.get();
      const favorites = doc.data().favorites;
      const updatedFavorites = favorites.filter((fav) => fav.title !== title);
      await docRef.update({ favorites: updatedFavorites });
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const imageUrl = `https://image.tmdb.org/t/p/w400/${poster_path}`;
  return (
    <div className={classes.card}>
      <img className={classes.poster} src={imageUrl} alt={title} />
      <div className={classes.bottom}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.desc}>{overview}</p>
        <div className={classes.btns}>
          <Link className={classes.link} to={`/movie/${id}`}>
            <Button text="read more" />
          </Link>
          {user &&
            (user.favorites.every((fav) => fav.title !== title) ? (
              <button className={classes.heart} onClick={handleHeartBtnClick}>
                <AiOutlineHeart />
              </button>
            ) : (
              <button className={classes.heart} onClick={handleRemoveBtnClick}>
                <AiFillHeart />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
