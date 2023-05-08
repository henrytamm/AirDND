import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteASpot, getAllSpots } from "../../../store/spots";
import EditSpotForm from "../EditSpotFormPage/EditSpotForm";
import SpotReviews from "../SpotReviews/SpotReviews";
import CreateReviewForm from "../../Reviews/CreateReviewFormPage/CreateReviewForm";
import SpotReviewList from "../SpotsReviewList/SpotReviewList";
import "./SpotCard.css";

const SpotCard = () => {
  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const [reviews, setReviews] = useState([]);
  const everySpot = useSelector((state) => state.spots);
  const thisSpot = everySpot[spotId];

  const spotReviews = useSelector((state) => Object.values(state.reviews));
  console.log(spotReviews);

  const [avgRating, setAvgRating] = useState("0");
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
  spotReviews.forEach((review) => {
    stars += review.stars;
    totalReviews += 1;
  });
  if (stars) {
    averageRating = (stars / totalReviews).toFixed(2);
  } else {
    averageRating = 0;
  }

  return (
    <div className="spots-container" key={spot?.id}>
      <div className="spot-name">{thisSpot?.name}</div>
      <div className="city-country">
        {thisSpot?.city}, {thisSpot?.country}
      </div>
      <div className="stars">
        <i className="fa-solid fa-star"></i>
        {averageRating}
      </div>
      <div className="middle">
        <div className="spot-image">
          <img src={thisSpot?.previewImage}></img>
        </div>

        <div className="details-container">
          <h1 className="spot-details-header"> Spot Details</h1>

          <li>Name: {thisSpot?.name}</li>

          {/* <li>ID: {thisSpot?.id}</li> */}

          <li>Address: {thisSpot?.address}</li>
          <li>
            {thisSpot?.city}, {thisSpot?.country}
          </li>
          <li>Description: {thisSpot?.description}</li>
          <li>Price: ${thisSpot?.price}/night</li>

          {/* <li>Rating: {averageRating}</li> */}

          {currentUser && currentUser.id === spot?.ownerId && (
            <button
              className="edit-and-delete-button"
              onClick={editSpotHandler}
            >
              Edit Spot 
            </button>
          )}
          {currentUser && currentUser.id === spot?.ownerId && (
            <button
              className="edit-and-delete-button"
              onClick={deleteSpotHandler}
            >
              Delete Spot
            </button>
          )}
        </div>
      </div>

      <div className="review-page-container">
        <div className="spot-review-list-container">
          <h1 className="spot-reviews">Reviews</h1>
          <SpotReviewList
            spot={thisSpot}
            reviews={reviews}
            setReviews={setReviews}
          />
        </div>
        <div className="create-review-form-container">
          <CreateReviewForm
            spot={thisSpot}
            reviews={reviews}
            setReviews={setReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
