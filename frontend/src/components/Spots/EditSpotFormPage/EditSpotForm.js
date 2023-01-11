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
      console.log(editedSpot)
      history.push(`/spots/${editedSpot.id}`);
    } catch (response) {
      const data = await response.json();
      setErrors([...Object.values(data.errors)]);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={updateAddress}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={updateState}
        />
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={updateLat}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={updateLng}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={updatePrice}
        />
        <input
          type="text"
          placeholder="PreviewImage"
          value={previewImage}
          onChange={updatePreviewImage}
        />

        <button type="submit"> Update Spot </button>
      </form>
    </section>
  );
};

export default EditSpotForm;