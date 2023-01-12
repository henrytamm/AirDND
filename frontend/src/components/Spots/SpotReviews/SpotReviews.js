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

  // const allReviews = useSelector((state) => state.reviews);
  // const [thisReview, setThisReview] = useState([]);
  // useEffect(() => {
  //   const newReviews = Object.values(allReviews).filter(
  //     (review) => review.spotId === spot.id
  //   );
  //   console.log('PLEASEEEEEEE', allReviews)
  //   setThisReview(newReviews);
  // }, [spot, allReviews]);

  // useEffect(() => {
  //   if (spot && spot.id) dispatch(getReviewsForSpot(spot?.id));
  // }, [dispatch]);

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

//   return (
//     <div className="reviews_container">
//       {thisReview.map((review) => (
//         <div>
//           <div>User: {review?.User?.firstName}</div>
//           <div>Review: {review.review}</div>
//           <div>Stars: {review.stars}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

export default SpotReviews;
