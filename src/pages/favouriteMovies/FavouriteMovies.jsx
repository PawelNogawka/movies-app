import React, { useState, useEffect, useRef } from "react";

import { useFirestore } from "../../hooks/useFirestore";
import {useDocument} from '../../hooks/useDocument'
import { useAuthContext } from "../../hooks/useAuthContext";


import { useTitle } from "../../hooks/useTitle";

import Wrapper from "../../components/ui/Wrapper";
import Card from "../../components/Card";
import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import Pagination from "../Pagination";

import classes from "./FavouriteMovies.module.scss";

const FavouriteMovies = ({ search, title, path }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(6);

  const {user} = useAuthContext()
  const { updateDocument, response } = useFirestore("users");
  const {document, error} = useDocument('users', user.uid)



  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
   setCurrentPage(1)
   window.scrollTo(0,0)
  }, [path]);

  useTitle(title);


if(error) return <Error error={error}/>

if(!document) return <Loader />


  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = document.favorites.slice(firstMovieIndex, lastMovieIndex);

 

  return (
    <main ref={mainRef} className={classes.movies}>
      <Wrapper>
        {
          <h1 className={classes.heading}>
            {title}
          </h1>
        }
        <div className={classes["movies-list"]}>
          {currentMovies.length > 0 && currentMovies.map((movie) => (
         <Card
         key={movie.id}
         movie={movie}
         user = {document}
         updateDocument={updateDocument}
         response={response}
       />
          ))}
        </div>
        {currentMovies.length == 0 && <p className={classes.empty}>No favourite movies</p>}

          <Pagination
            totalMovies={document.favorites.length}
            moviesPerPage={moviesPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

      </Wrapper>
    </main>
  );
};

export default FavouriteMovies;
