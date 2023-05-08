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
    <div className="create-spot-form">
      <form onSubmit={handleSubmit}>
        <h1>Become a Host!</h1>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={updateName}
          />
        </div>
        <div className="form-row">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            required
            onChange={updateAddress}
          />
        </div>
        <div className="form-row">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            required
            onChange={updateCity}
          />
        </div>
        <div className="form-row">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            required
            onChange={updateState}
          />
        </div>
        <div className="form-row">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            required
            onChange={updateCountry}
          />
        </div>
        <div className="form-row">
          <label htmlFor="lat">Latitude</label>
          <input
            type="text"
            id="lat"
            value={lat}
            required
            onChange={updateLat}
          />
        </div>
        <div className="form-row">
          <label htmlFor="lng">Longitude</label>
          <input
            type="text"
            id="lng"
            value={lng}
            required
            onChange={updateLng}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            required
            onChange={updateDescription}
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            required
            onChange={updatePrice}
          />
        </div>
        <div className="form-row">
          <label htmlFor="previewImage">Images</label>
          <input
            type="text"
            id="previewImage"
            value={previewImage}
            required
            onChange={updatePreviewImage}
          />
        </div>
        <button type="submit">Create new Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
