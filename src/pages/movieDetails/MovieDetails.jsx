import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";


import Arrow from "../../components/Arrow";
import Error from "../../components/ui/Error";
import Loader from "../../components/ui/Loader";
import CompanyList from "./CompanyList";
import Details from "./Details";
import Reviews from "./Reviews";

import classes from "./MovieDetails.module.scss";



const MovieDetails = () => {
  const imgRef = useRef(null);

  const { id } = useParams();
  const {user} = useAuthContext()
  const path = `movie/${id}`;
  const { data, isLoading, error } = useFetch(path, "", id ? id : null);

  if (isLoading) return <Loader />;

  if (error) return <Error error={error} />;

  const {
    backdrop_path,
    overview,
    title,
    production_companies,
  } = data;


  return (
    <main className={classes.movie}>
      <section className={classes.ban}>
        <img
          className={classes.hero}
          ref={imgRef}
          src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
          alt=""
        />
        <div className={classes.backdrop}>
       
        </div>
        <Arrow href="#details" />
        <div className={classes.banner}>
          <h1 className={classes.heading}>{title}</h1>
          <p className={classes.desc}>{overview}</p>
        </div>
      </section>
      {data && <Details movie={data} user={user} />}
      {user &&  <Reviews movieTitle ={title} />}
     
      {production_companies && production_companies.length > 3 &&  (
        <CompanyList companies={production_companies} />
      )}
    </main>
  );
};

export default MovieDetails;
