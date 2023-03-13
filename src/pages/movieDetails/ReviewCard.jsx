import React from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import Button from "../../components/ui/Button";

import classes from "./ReviewCard.module.scss";

const ReviewCard = ({ review }) => {
  const { user } = useAuthContext();
  const { deleteDocument, response } = useFirestore("reviews");
  const handleDeleteBtnClick = () => {
         deleteDocument(review.id)
  };

  return (
    <li className={classes.review}>
      <div className={classes.top}>
        <div className={classes.author}>
          <img
            src={review.createdBy.photoURL}
            alt={review.createdBy.displayName}
            width={60}
          />
          <h3 className={classes.name}>{review.createdBy.name}</h3>
        </div>
        <div className={classes.time}>
          <span>Created at:</span>
          <time>{review.createdAt.toDate().toDateString()}</time>
        </div>
      </div>
      <p className={classes.content}>{review.review}</p>
      {user.uid === review.createdBy.userId && (
        <div className={classes.btns}>
          <Button text="delete" onClick={handleDeleteBtnClick} />
          <Button outlined text="edit" />
        </div>
      )}
    </li>
  );
};

export default ReviewCard;
