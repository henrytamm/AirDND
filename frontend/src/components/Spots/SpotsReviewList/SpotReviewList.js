import { getReviewsForSpot, deleteReview } from "../../../store/reviews";
import { getOneSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SpotReviewList = ({ spot, review }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const allReviews = useSelector((state) => state.reviews);
  const [thisReview, setThisReview] = useState([]);
  useEffect(() => {
    const newReviews = Object.values(allReviews).filter(
      (review) => review.spotId === spot.id
    );
    // console.log('PLEASEEEEEEE', allReviews)
    setThisReview(newReviews);
  }, [spot, allReviews]);

  useEffect(() => {
    if (spot && spot.id) dispatch(getReviewsForSpot(spot?.id));
  }, [dispatch]);

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
    <div className="review-container">
      {thisReview.map(({ review, stars, spotId, userId, id }) => (
        <span className="review-list" key={review}>
          <div className="userid-rev"> User ID: {userId} </div>

          <div className="review-rev"> Review: {review}</div>
          <div className="star-rev">Stars:{stars}</div>
          {/* <div className="spotid-rev"> Spot Number:{spotId}</div>
          <div className="id-rev">ID Number:{id}</div> */}

          {currentUser?.id === userId && (
            <button
              className="delete-review"
              type="button"
              onClick={(e) => deleteReviewHandler(e, id)}
            >
              Delete Review
            </button>
          )}
        </span>
      ))}
    </div>
  );
};


export default SpotReviewList;
