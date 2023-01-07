import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allSpots } from "../../store/spots";
import { useHistory, useParams, Link, NavLink } from "react-router-dom";

const SpotInfo = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state => state.spots[spotId]))
    
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true))
    }, [dispatch])
  

    return (
        <div>
            {spot && (
        <div>
             <div>{spot.name}</div>
            <div>{spot.city}</div>
        </div>
            )}
        </div>
            
    )
}

export default SpotInfo