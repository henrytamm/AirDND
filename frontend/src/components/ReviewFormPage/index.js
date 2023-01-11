import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewReview} from "../../store/reviews";
import { useParams } from "react-router-dom";


export default function ReviewForm() {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);


    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      spotId,
      review,
      stars,
    };

    try {
      await dispatch(createNewReview(payload));
      history.push(`/spots/${spotId}`);
    } catch (res) {
      const data = await res.json();
      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
};

return (
    <div>
        <form onSubmit={handleSubmit}>
          <h2>Create Review</h2>
          {errors && (
            <ul>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <label>
            Review
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required={true}
            />
          </label>
          <label>
            Stars
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              max="5"
              min="1"
              required={true}
            />
          </label>

          <input type="submit" />
        </form>
    </div>
  );

};
