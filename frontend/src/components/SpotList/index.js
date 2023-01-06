import { useSelector } from "react-redux"
import "./SpotList.css";

const SpotList = () => {
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj)

    return (
        <div>
            {
                spots.map(spot => {
                    return <div key={spot.id}>{spot.address}</div>
                })
            }
        </div>
    )
}

export default SpotList