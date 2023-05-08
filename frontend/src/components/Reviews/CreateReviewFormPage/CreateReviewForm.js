import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSpots, getOneSpot } from "../../../store/spots";
import { createReview, getReviewsForSpot } from "../../../store/reviews";
import "./CreateReviewForm.css";

const CreateReviewForm = ({ spot }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReviews] = useState("");
  const [stars, setStars] = useState("0");
  const [errors, setErrors] = useState([]);

  const everySpot = useSelector((state) => state.spots);
  const thisSpot = everySpot[spot?.id];
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let newReview;
    const payload = {
      spotId,
      review,
      stars,
    };

    try {
      newReview = await dispatch(createReview(payload, spot.id));
      dispatch(getReviewsForSpot(spotId));
      history.push(`/spots/${spot.id}`);
      setReviews("");
    } catch (res) {
      const data = await res.json();
      const errorz = [data.message];
      if (data && data.message) setErrors(errorz);
    }
  };

  const [starOne, setStarOne] = useState("fa-regular fa-star");
  const [starTwo, setStarTwo] = useState("fa-regular fa-star");
  const [starThree, setStarThree] = useState("fa-regular fa-star");
  const [starFour, setStarFour] = useState("fa-regular fa-star");
  const [starFive, setStarFive] = useState("fa-regular fa-star");

  const handleStarOne = () => {
    setStarOne("fa-solid fa-star");
    setStarTwo("fa-regular fa-star");
    setStarThree("fa-regular fa-star");
    setStarFour("fa-regular fa-star");
    setStarFive("fa-regular fa-star");
    setStars(1);
  };

  const handleStarTwo = () => {
    setStarOne("fa-solid fa-star");
    setStarTwo("fa-solid fa-star");
    setStarThree("fa-regular fa-star");
    setStarFour("fa-regular fa-star");
    setStarFive("fa-regular fa-star");
    setStars(2);
  };

  const handleStarThree = () => {
    setStarOne("fa-solid fa-star");
    setStarTwo("fa-solid fa-star");
    setStarThree("fa-solid fa-star");
    setStarFour("fa-regular fa-star");
    setStarFive("fa-regular fa-star");
    setStars(3);
  };

  const handleStarFour = () => {
    setStarOne("fa-solid fa-star");
    setStarTwo("fa-solid fa-star");
    setStarThree("fa-solid fa-star");
    setStarFour("fa-solid fa-star");
    setStarFive("fa-regular fa-star");
    setStars(4);
  };

  const handleStarFive = () => {
    setStarOne("fa-solid fa-star");
    setStarTwo("fa-solid fa-star");
    setStarThree("fa-solid fa-star");
    setStarFour("fa-solid fa-star");
    setStarFive("fa-solid fa-star");
    setStars(5);
  };

  return (
    <div>
      {sessionUser?.id !== thisSpot?.userId && sessionUser?.id && (
        <form onSubmit={handleSubmit}>
          <h1 className="review-header">Leave a Review</h1>
          <ul>
            {errors.map((error, idx) => (
              <li className="errors" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <p></p>
          <div className="review-stars">
            <i title="Terrible" onClick={handleStarOne} className={starOne}></i>
            <i
              title="Not That Good"
              onClick={handleStarTwo}
              className={starTwo}
            ></i>
            <i
              title="Alright"
              onClick={handleStarThree}
              className={starThree}
            ></i>
            <i title="Great" onClick={handleStarFour} className={starFour}></i>
            <i
              title="Perfect"
              onClick={handleStarFive}
              className={starFive}
            ></i>
          </div>

          <label className="review-review-box">
            Review
            <textarea
              type="text"
              value={review}
              onChange={(e) => setReviews(e.target.value)}
              required={true}
            />
          </label>

          <button type="submit" className="review-submit-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateReviewForm;
