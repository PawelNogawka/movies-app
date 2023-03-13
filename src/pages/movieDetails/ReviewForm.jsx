import React, { useState } from "react";

import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";

import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";

import classes from "./ReviewForm.module.scss";

const ReviewForm = ({movieTitle}) => {
  const [review, setReview] = useState("");
  const [error,setError] = useState(null)

  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("reviews");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError(null)

    if(review.trim().length === 0){
      setError('Please, enter a review')
    }

    const createdBy = {
      email:user.email,
      userId:user.uid,
      name:user.displayName,
      photoURL:user.photoURL,
    }

    const newReview = {
      id:Math.random(),
      createdBy,
      review,
      createdAt: timestamp.fromDate(new Date()),
      movieTitle,
    }

    await addDocument(newReview)
  };
  return (
    <section>
      <h2 className={classes.heading}>leave a review</h2>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <TextArea value={review} onChange={(e) => setReview(e.target.value)} />
        {error && <p className={classes.error}>{error}</p>}
        <Button submit text={response.isPending ? "loading..." : "add review"} />
      </form>
    </section>
  );
};

export default ReviewForm;
