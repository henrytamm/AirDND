
import { useEffect } from 'react'
import { allReviews } from '../../store/reviews'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux'

// const ReviewList = () => {
//     const dispatch = useDispatch();
//     const { spotId } = useParams();
//     const [isLoaded, setIsLoaded] = useState(false)

//     const review = useSelector(state => (state.reviews))
//     const reviewObj = Object.values(review)
//     console.log(reviewObj)

    
//     useEffect(() => {
//         dispatch(allReviews(spotId)).then(() => setIsLoaded(true));
//     }, [dispatch])

//     return (
//         <div>
//             <>Review List</>
//           {
//             reviewObj.map(review => {
//                 return <div>{review.review}</div>
//             })
//           }
//         </div>
//     )
// }


const ReviewList = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews))
    const spotReviews = reviews.filter((review) => {
        if(review.spotId === spot.id){
            return review
        }
    })

    useEffect(() => {
        dispatch(allReviews(spotId))
    }, [dispatch])

        return (
        <div>
            <>Review List</>
          {
            spotReviews.map(review => {
                return <div>{review.review}</div>
            })
          }
        </div>
    )
}


export default ReviewList