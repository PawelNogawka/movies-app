import React from "react";


import { useCollection } from "../../hooks/useCollection";

import ReviewCard from "./ReviewCard";
import Wrapper from "../../components/ui/Wrapper";

import { Oval } from  'react-loader-spinner'

import classes from "./Reviews.module.scss";

const Reviews = ({ movieTitle }) => {
  const { documents, error } = useCollection("reviews");

  if (error) return <p>{error}</p>;

  if (!documents) { 
    return( <>
      <Wrapper>
        <section className={classes.reviews}>
          <h2 className={classes.heading}>All reviews</h2>
          <Oval
            height={60}
            width={60}
            color="#586B89"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#384967"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </section>
      </Wrapper>
    </>)
   
  }

  const reviewsToDisplay = documents.filter(
    (document) => document.movieTitle === movieTitle
  );

  if (reviewsToDisplay.length === 0) {
    return (
      <>
        <Wrapper>
          <section className={classes.reviews}>
            <h2 className={classes.heading}>All reviews</h2>
            <p className={classes.empty}>No reviews</p>
          </section>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Wrapper>
        <section className={classes.reviews}>
          <h2 className={classes.heading}>All reviews</h2>
          {reviewsToDisplay.length > 0 && (
            <ul className={classes.list}>
              {reviewsToDisplay.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>
          )}
        </section>
      </Wrapper>
    </>
  );
};

export default Reviews;
