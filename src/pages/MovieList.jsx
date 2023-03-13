import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import {useAuthContext} from '../hooks/useAuthContext'
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";

import Wrapper from "../components/ui/Wrapper";
import Card from "../components/Card";
import Error from "../components/ui/Error";
import Loader from "../components/ui/Loader";
import Pagination from "./Pagination";



import classes from "./MovieList.module.scss";

const MovieList = ({ search, title, path }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(6);

  const { searchTerm } = useParams();

  const {user} = useAuthContext();
  const { updateDocument, response } = useFirestore("users");
  const {document} = useDocument('users', user?.uid)

  const { data, isLoading, error } = useFetch(
    path,
    searchTerm ? searchTerm.replace(/-/g, " ") : ""
  );

  

  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [path]);

  useTitle(search ? searchTerm : title);

  if (isLoading) return <Loader />;

  if (error) return <Error error={error} />;

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = data.slice(firstMovieIndex, lastMovieIndex);


  return (
    <main ref={mainRef} className={classes.movies}>
      <Wrapper>
        {
          <h1 className={classes.heading}>
            {!search ? title : `search results for '${searchTerm}'`}
          </h1>
        }
        <div className={classes["movies-list"]}>
          {currentMovies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              user = {document}
              updateDocument={updateDocument}
              response={response}
            />
          ))}
        </div>

        <Pagination
          totalMovies={data.length}
          moviesPerPage={moviesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Wrapper>
    </main>
  );
};

export default MovieList;
