import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNewReview, allReviews } from "../../store/reviews";


// const ReviewForm = () => {
//     const { spotId } = useParams();
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);


//     const [review, setReview] = useState('')
//     const [stars, setStars] = useState(0)
//     const [errors, setErrors] = useState([])
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors([])
//         let newReview = {
//             spotId,
//             review,
//             stars
//         }
//         await dispatch(createNewReview(newReview))
//         history.push(`/spots/${spotId}`)
//         .catch(async (res) => {
//             const data = await res.json();
//             if (data && data.errors) setErrors(data.errors)
//             // else if (sessionUser.review) {
//             //     setErrors(["User already has a review of this spot."])
//             // }
//         })
//     }

//     return (
//         <section>
//             <form onSubmit={handleSubmit}>
//                 <ul>

//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//                 </ul>
//                 <textarea
//                 type='text'
//                 placeholder='Review'
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 required={true}/>
//                 <input
//                 type='number'
//                 placeholder='Stars'
//                 value={stars}
//                 min="1"
//                 max="5"
//                 onChange={(e) => setStars(e.target.value)}/>

//                 <button type="submit">Create new Review</button>
//             </form>
//         </section>
//     )
// }

// export default ReviewForm



const ReviewForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);


    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        let newReview = {
            spotId,
            review,
            stars
        }
        await dispatch(createNewReview(newReview))
        dispatch(allReviews(spotId))
        history.push(`/spots/${spotId}`)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        })
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

                <button type="submit">Create new Review</button>
            </form>
        </section>
    )
}

export default ReviewForm