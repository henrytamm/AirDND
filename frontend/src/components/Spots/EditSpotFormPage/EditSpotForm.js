import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { editSpot } from "../../../store/spots";

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const allSpots = useSelector((state) => state.spots);
  const thisSpot = allSpots[spotId];
  //   console.log(thisSpot)
  const history = useHistory();

  const [address, setAddress] = useState(thisSpot?.address);
  const [city, setCity] = useState(thisSpot?.city);
  const [state, setState] = useState(thisSpot?.state);
  const [country, setCountry] = useState(thisSpot?.country);
  const [lat, setLat] = useState(thisSpot?.lat);
  const [lng, setLng] = useState(thisSpot?.lng);
  const [name, setName] = useState(thisSpot?.name);
  const [description, setDescription] = useState(thisSpot?.description);
  const [price, setPrice] = useState(thisSpot?.price);
  const [previewImage, setPreviewImage] = useState(thisSpot?.previewImage);
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
    setErrors([]);
    const payload = {
      id: spotId,
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
    let editedSpot;
    try {
      editedSpot = await dispatch(editSpot(payload));
      // console.log(editedSpot);
      history.push(`/spots/${editedSpot.id}`);
    } catch (response) {
      const data = await response.json();
      setErrors([...Object.values(data.errors)]);
      console.log('####', data.errors)
    }
  };

  return (
    <div>
      <form className="edit-form" onSubmit={handleSubmit}>
        <h1 className="update">Update your spot!</h1>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>

        <label>
          Name
          <input
            type="text"
            value={name}
            required
            onChange={updateName}/>
            <p className='errors'>{errors.name}</p>
        </label>

        <label>
          Address
          <input
            type="text"
            value={address}
            required
            onChange={updateAddress}/>
            <p className='errors'>{errors.address}</p>
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            required
            onChange={updateCity}/>
            <p className='errors'>{errors.city}</p>
        </label>

        <label>
          State
          <input
            type="text"
            value={state}
            required
            onChange={updateState}/>
            <p className='errors'>{errors.state}</p>
        </label>

        <label>
          Country
          <input
            type="text"
            value={country}
            required
            onChange={updateCountry}/>
            <p className='errors'>{errors.country}</p>
        </label>

        <label>
          Latitiude
          <input
            type="text"
            value={lat}
            required
            onChange={updateLat}/>
            <p className='errors'>{errors.lat}</p>
        </label>

        <label>
          Longitude
          <input
            type="text"
            value={lng}
            required
            onChange={updateLng}/>
            <p className='errors'>{errors.lng}</p>
        </label>

        <label>
          Description
          <input
            type="text"
            value={description}
            required
            onChange={updateDescription}/>
            <p className='errors'>{errors.description}</p>
        </label>

        <label>
          Price
          <input
            type="text"
            value={price}
            required
            onChange={updatePrice}/>
            <p className='errors'>{errors.price}</p>
        </label>

        <label>
          Images
          <input
            type="text"
            value={previewImage}
            required
            onChange={updatePreviewImage}/>
        </label>

        <button className="submitButton" type="submit">
          Update Spot
        </button>
      </form>
    </div>
  );
};
export default EditSpotForm;
