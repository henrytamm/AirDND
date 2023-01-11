import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteASpot, getAllSpots } from '../../../store/spots'
import EditSpotForm from '../EditSpotFormPage/EditSpotForm'
import SpotReviews from '../SpotReviews/SpotReviews'
import CreateReviewForm from '../../Reviews/CreateReviewFormPage/CreateReviewForm'

const SpotCard = () => {
    const {spotId} = useParams();
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots[spotId])
    const [reviews, setReviews] = useState([])
    const everySpot = useSelector((state) => state.spots)
    const thisSpot = everySpot[spotId]

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const editSpotHandler = () => {
        history.push(`/spots/edit/${spotId}`)
    }

    const deleteSpotHandler = () => {
        dispatch(deleteASpot(spot.id))
        history.push(`/`)
    }

    return (
        <div className="spots_container" key={spot?.id}>
            <div className='spot_card_details'>
                <div className="spot_name">
                    <h2>{spot?.name}</h2>
                </div>
                <div className="spot_details2">
                    {spot?.city}, {spot?.state}
                </div>
                <div className="spot_address">
                    {spot?.address}
                </div>
                <div className="spot_description">
                    {spot?.description}
                </div>
                <div className="edit_container">
                    {currentUser && currentUser.id === spot?.ownerId && <button onClick={editSpotHandler}>Edit Spot</button>}
                </div>
                <div className="delete_container">
                {currentUser && currentUser.id === spot?.ownerId && <button onClick={deleteSpotHandler}>Delete Spot</button>}
                </div>


                <div>
                    <h1>User Reviews</h1>
                    <SpotReviews spot={thisSpot} reviews={reviews} setReviews={setReviews} />
                    <CreateReviewForm spot={thisSpot} reviews={reviews} setReviews={setReviews} />
                </div>
            </div>
        </div>
    )
}

export default SpotCard