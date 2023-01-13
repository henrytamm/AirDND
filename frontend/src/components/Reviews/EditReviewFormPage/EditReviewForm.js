import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../../../store/reviews";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const EditReviewForm = () => {
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const editedReview = useSelector((state) => state);
  console.log(editedReview);
  const sessionUser = useSelector(state => state.session.user)

  const [review, setReview] = useState(editedReview?.review);
  const [stars, setStars] = useState(editedReview?.stars);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let editReviewPayload = {
      id: reviewId,
      review,
      stars,
      sessionUser
    };
    let newReview;
    newReview = await dispatch(editReview(editReviewPayload));
    history.push(`/spots/${newReview.spotId}`);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <textarea
          type="text"
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required={true}
        />
        <input
          type="number"
          placeholder="Stars"
          value={stars}
          min="1"
          max="5"
          onChange={(e) => setStars(e.target.value)}
        />

        <button type="submit">Confirm Edit</button>
      </form>
    </section>
  );
};

export default EditReviewForm;
