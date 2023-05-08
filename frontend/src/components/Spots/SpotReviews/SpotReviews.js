import { getReviewsForSpot, deleteReview } from "../../../store/reviews";
import { getOneSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SpotReviews = ({ spot, review }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const isOwner = currentUser.id === review?.userId

  const deleteReviewHandler = async (e, id) => {
    e.preventDefault();
    dispatch(deleteReview(id));
    dispatch(getOneSpot(spot.id));

    history.push(`/spots/${spot.id}`);
  };

  const editReviewHandler = () => {
    history.push(`/spots/${review.spotId}/reviews/edit/${review.id}`)

  }

  return (
     <div>
  
      {isOwner && <button onClick={deleteReviewHandler}> Delete Review</button>}
    </div>
  );
};

export default SpotReviews;
