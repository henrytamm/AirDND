import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllSpots } from '../../../store/spots'
import { useHistory } from 'react-router-dom'

const SpotList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const allSpots = useSelector((state) => Object.values(state.spots))
    
    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true))
    }, [dispatch])

    const createSpotHandler = () => {
        history.push(`/new`)
    }

    return(
        <div className='create_button'>
            <button onClick={createSpotHandler}>Start hosting!</button>
    <div className='spot_container'>
    {allSpots?.map(({id, city, price, previewImage, name})=>
    <li key={id} 
    className='spot_card' >
    
    <Link to={`/spots/${id}`}>
    
    <img className='preview_image' src={previewImage}></img>
    <div className='name'>{name}</div> 
    <div className='spot_info'>Spot #{id}: {city} </div>
    <div className='price_info'>${price}/night</div>
    </Link> </li> )}
    </div>
    </div>

    )}
    
    export default SpotList