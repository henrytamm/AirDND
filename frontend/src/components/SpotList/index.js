import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SpotList.css";

const SpotList = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);




    return (
        <div>
            {
                spots.length > 0 && spots.map(spot => {
                    return <SpotCard key={spot.id} spot={spot}/>
                })
            }
        </div>
    )
}

export default SpotList