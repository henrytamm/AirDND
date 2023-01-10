import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allSpots } from "../../store/spots";
import { useHistory, useParams, Link, NavLink } from "react-router-dom";
import ReviewList from '../ReviewList'

const SpotInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const { reviewId } = useParams();
    const spot = useSelector((state => state.spots[spotId]))
    
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true))
    }, [dispatch])
  
    const leaveReview = () => {
      history.push(`/reviews/${spotId}`)
    }

    const editReviewHandler = () => {
      history.push(`/reviews/${spotId}/edit`)
    }

    const sessionUser = useSelector(state => state.session.user);
    // const isOwner = sessionUser.id === review.userId
    // console.log(sessionUser)

    return (
      <div>
        {spot && (<>
        <h1>{spot.address}</h1>
            <h2>{spot.name}</h2>
            <div>{spot.city}</div>
            <div>{spot.state}</div>
            <div>{spot.previewImage}</div>
            <h2>
                <ReviewList />
            </h2>
            <button onClick={leaveReview}>Create a new Review</button>
            {<button onClick={editReviewHandler}>Edit your Review</button>}
        </>)}
      </div>
            
    )
}

export default SpotInfo