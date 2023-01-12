import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteASpot, getAllSpots } from "../../../store/spots";
import EditSpotForm from "../EditSpotFormPage/EditSpotForm";
import SpotReviews from "../SpotReviews/SpotReviews";
import CreateReviewForm from "../../Reviews/CreateReviewFormPage/CreateReviewForm";
import SpotReviewList from "../SpotsReviewList/SpotReviewList";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawecome/free-solid-svg-icons";

const SpotCard = () => {
  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const [reviews, setReviews] = useState([]);
  const everySpot = useSelector((state) => state.spots);
  const thisSpot = everySpot[spotId];

  const spotReviews = useSelector(state => Object.values(state.reviews))
  console.log(spotReviews)

  const [avgRating, setAvgRating] = useState('0')
//   console.log(thisSpot)

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const editSpotHandler = () => {
    history.push(`/spots/edit/${spotId}`);
  };

  const deleteSpotHandler = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this spot?`
    );
    if (deleteConfirm) {
      dispatch(deleteASpot(spot.id));
      history.push(`/`);
    }
  };

  let stars = 0;
  let totalReviews = 0;
  let averageRating = 0;
  spotReviews.forEach(review => {
    stars += review.stars;
    totalReviews += 1
  })
  if (stars){
    averageRating = (stars / totalReviews).toFixed(2)
  } else {
    averageRating = 0
  }


  return (
    <div className="spots-container" key={spot?.id}>
      <Link to="/">
        <button>Back</button>
      </Link>
      <div className="spot_name">{thisSpot?.name}</div>
      <div className="city_country">
        {thisSpot?.city}, {thisSpot?.country}
      </div>
      <div className="stars">
        {averageRating}
      </div>

      <div className="center_page">
        <div className="spot_image">
          <img src={thisSpot?.previewImage}></img>
        </div>

        <div className="details_container">
          <h1 className="spot-details"> Spot Details</h1>

          <li>Name: {thisSpot?.name}</li>

          <li>ID: {thisSpot?.id}</li>

          <li>Address: {thisSpot?.address}</li>
          <li>
            {thisSpot?.city}, {thisSpot?.country}
          </li>
          <li>Description: {thisSpot?.description}</li>
          <li>Price: ${thisSpot?.price}/night</li>


            <li>Rating: {averageRating}</li>

          <div className="edit-container">
            {currentUser && currentUser.id === spot?.ownerId && (
              <button onClick={editSpotHandler}>Edit Spot</button>
            )}
          </div>
          <div className="delete-container">
            {currentUser && currentUser.id === spot?.ownerId && (
              <button onClick={deleteSpotHandler}>Delete Spot</button>
            )}
          </div>

          <div className="review-container">
            <h1 className="review-header">User Reviews</h1>
            <div className="review-edit-delete">
              <SpotReviewList
                spot={thisSpot}
                reviews={reviews}
                setReviews={setReviews}
              />
              <CreateReviewForm
                spot={thisSpot}
                reviews={reviews}
                setReviews={setReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
