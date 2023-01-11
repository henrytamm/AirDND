import { getReviewsForSpot, deleteReview } from "../../../store/reviews";
import { getOneSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SpotReviews = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => Object.values(state.reviews));
  const currentUser = useSelector((state) => state.session.user);

  const thisReview = allReviews.filter((review) => review.spotId === spot.id);
  console.log(thisReview, "reviews");

  useEffect(() => {
    if (spot && spot.id) dispatch(getReviewsForSpot(spot?.id));
  }, [dispatch]);

  const deleteReviewHandler = async (e, id)=>{
    e.preventDefault()
    dispatch(deleteReview(id))
    dispatch(getOneSpot(spot.id))

    history.push(`/spots/${spot.id}`)
  
}

  return (
    <div className="review-container">
      {thisReview.map(({ review, stars, spotId, userId, id }) => (
        <span className="review-list" key={review}>
          <div className="userid-rev"> User ID: {userId} </div>

          <div className="review-rev"> Review: {review}</div>
          <div className="star-rev">Stars:{stars}</div>
          <div className="spotid-rev"> Spot Number:{spotId}</div>
          <div className="id-rev">ID Number:{id}</div>

          {currentUser?.id === userId &&(
    <button className='delete-review' type="button" onClick={ (e)=> deleteReviewHandler(e, id)}>Delete Review</button>)}
        </span>
      ))}
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
