import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";


const ReviewList = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews));

    const spotReview = reviews.filter((review) => {
        if(review.spotId === spot.id){
            return review
        }
    })

  useEffect(() => {
    dispatch(allReviews(spotId));

  }, [dispatch]);

  return (
    <div>
        {spotReview.map((review) => (
            <div>
              <h2>{review.User.firstName}</h2>
                <div>{review.review}</div>
                <div>{review.stars}</div>
               </div>
        ))}
      </div>
  );
}

export default ReviewList
