import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../../store/spots";
import { useHistory } from "react-router-dom";
import "./SpotList.css"

const SpotList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const allSpots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

//   const createSpotHandler = () => {
//     history.push(`/new`);
//   };

  return (
    <>
      <div className="spot-container">
        
        {allSpots?.map(({ id, city, price, previewImage, state, name, spot }) => (
          <li key={id} className="spot-card">
            <Link to={`/spots/${id}`}>
              <img className="preview-image" src={previewImage} alt={name}></img>
              <div className="name">{name}</div>
              <div className="spot">
                Spot #{id}: {city}, {state}
              </div>
              <div className="price">${price}/night</div>
            </Link>
          </li>
        ))}
      </div>
      </>
  );
};

export default SpotList;
