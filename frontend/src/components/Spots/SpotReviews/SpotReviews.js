import { deleteReview, getReviewsForSpot } from "../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SpotReviews = ({ spot }) => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state)=> Object.values(state.reviews))


  const thisReview = allReviews.filter((review)=> review.spotId === spot.id)
  console.log(thisReview, 'reviews')
  useEffect(() => {
    if (spot && spot.id) dispatch(getReviewsForSpot(spot?.id));
  }, [dispatch]);

  return (
    <div className="reviews_container">
      {thisReview.map((review) => (
        <div>
          <div>User: {review?.User?.firstName}</div>
          <div>Review: {review.review}</div>
          <div>Stars: {review.stars}</div>
        </div>
      ))}
    </div>
  );
};
export default SpotReviews;
