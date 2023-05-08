import { getReviewsForSpot, deleteReview } from "../../../store/reviews";
import { getOneSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./SpotReviewList.css";

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
    setThisReview(newReviews);
  }, [spot, allReviews]);

  useEffect(() => {
    if (spot && spot.id) dispatch(getReviewsForSpot(spot?.id));
  }, [dispatch]);

  const deleteReviewHandler = async (e, id) => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete your review?`
    );
    if (deleteConfirm) {
      e.preventDefault();
      dispatch(deleteReview(id));
      dispatch(getOneSpot(spot.id));

      history.push(`/spots/${spot.id}`);
    }
  };

  console.log('new cons',thisReview)

  return (
    <div className="review-container">
      {thisReview.map(({ review, stars, spotId, userId, id, User }) => (
        <span className="review-list" key={review}>
          <div className="userid-review">
            {User.firstName} {User.lastName[0].toUpperCase()}.
          </div>

          <div className="review-review">{review}</div>
          {/* <div className="star-review">{stars}</div> */}
          <div className="star-review">
            {new Array(stars).fill(1).map((star, i) => (
              <i key={i} className="fa-solid fa-star"></i>
            ))}
          </div>

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
