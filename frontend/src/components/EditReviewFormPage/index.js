import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { allReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { editReview } from '../../store/reviews';


const EditReviewForm = () => {
 const { reviewId } = useParams();
//  const { spotId } = useParams();
 const history = useHistory();
 const dispatch = useDispatch();

useEffect(() => {
    dispatch(allReviews())
}, [dispatch])

const editedReview = useSelector((state) => state.reviews[reviewId])

const [review, setReview] = useState(editedReview?.review)
const [stars, setStars] = useState(editedReview?.stars)
const [errors, setErrors] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault();
    let editReviewPayload = {
        id: reviewId,
        review,
        stars,
    }
    let newReview;
    newReview = await dispatch(editReview(editReviewPayload));
    history.push(`/spots/${newReview.spotId}`)
}
    
return (
    <section>
        <form onSubmit={handleSubmit}>
            <ul>

            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <textarea
            type='text'
            placeholder='Review'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required={true}/>
            <input
            type='number'
            placeholder='Stars'
            value={stars}
            min="1"
            max="5"
            onChange={(e) => setStars(e.target.value)}/>

            <button type="submit">Confirm Edit</button>
        </form>
    </section>
)
}

export default EditReviewForm