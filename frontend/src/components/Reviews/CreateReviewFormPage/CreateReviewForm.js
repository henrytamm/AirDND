import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllSpots, getOneSpot } from '../../../store/spots';
import { createReview, getReviewsForSpot } from '../../../store/reviews';
import './CreateReviewForm.css'

const CreateReviewForm = ({ spot }) => {
    const {spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReviews] = useState("")
    const [stars, setStars] = useState("0")
    const [errors, setErrors] = useState([])

    const everySpot = useSelector((state) => state.spots)
    const thisSpot = everySpot[spot?.id]
    const sessionUser = useSelector((state) => state.session.user)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([])
        let newReview;
        const payload = {
            spotId,
            review,
            stars
        }

        try {
            newReview = await dispatch(createReview(payload, spot.id))
            dispatch(getReviewsForSpot(spotId))
            history.push(`/spots/${spot.id}`)
        } catch (res) {
            const data = await res.json();
            const errorz = [data.message];
            if ( data && data.message) setErrors(errorz)
        }
    }

    return(
        <div>
            {
                sessionUser?.id !== thisSpot?.userId && (sessionUser?.id) &&(
                    <form onSubmit={handleSubmit}>
                        <h1 className="review">Leave a Review</h1>
                        <ul>
                            {errors.map((error, idx) => (
                                <li className='errors' key={idx}>{error}</li>
                            ))}
                        </ul>

                        <label>
                            Review
                            <textarea
                            type='text'
                            value={review}
                            onChange={e => setReviews(e.target.value)}
                            required={true} />
                        </label>
                        <label>
                            Rating
                            <input
                            type='number'
                            value={stars}
                            required={true}
                            min="1"
                            max="5"
                            onChange={e => setStars(e.target.value)} />
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    )
}

export default CreateReviewForm