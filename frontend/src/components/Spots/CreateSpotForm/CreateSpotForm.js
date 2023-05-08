import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../../store/spots";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePreviewImage = (e) => setPreviewImage(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };
    try {
      let newSpot;
      newSpot = await dispatch(createSpot(payload));
      history.push(`/spots/${newSpot.id}`);
    } catch (res) {
      const data = await res.json();
      setErrors([...Object.values(data.errors)]);
      // console.log("#####", data.errors);
    }
    // let newSpot;
    // newSpot = await dispatch(createSpot(payload))

    // if (newSpot) {
    //     history.push(`/spots/${newSpot.id}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="create-spot-form"> Become a Host!</h1>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>

        <label>
          Name
          <input type="text" value={name} required onChange={updateName} />
        </label>

        <label>
          Address
          <input
            type="text"
            value={address}
            required
            onChange={updateAddress}
          />
        </label>

        <label>
          City
          <input type="text" value={city} required onChange={updateCity} />
        </label>

        <label>
          State
          <input type="text" value={state} required onChange={updateState} />
        </label>

        <label>
          Country
          <input
            type="text"
            value={country}
            required
            onChange={updateCountry}
          />
        </label>

        <label>
          Latitiude
          <input type="text" value={lat} required onChange={updateLat} />
        </label>

        <label>
          Longitude
          <input type="text" value={lng} required onChange={updateLng} />
        </label>

        <label>
          Description
          <input
            type="text"
            value={description}
            required
            onChange={updateDescription}
          />
        </label>

        <label>
          Price
          <input type="text" value={price} required onChange={updatePrice} />
        </label>

        <label>
          Images
          <input
            type="text"
            value={previewImage}
            required
            onChange={updatePreviewImage}
          />
        </label>

        <button type="submit">Create new Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
