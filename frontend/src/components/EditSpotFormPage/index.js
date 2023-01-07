import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editingSpot, allSpots, deleteSpotThunk } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const EditSpotForm = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(allSpots)
    }, [dispatch])


const spotToBeEdited = useSelector((state) => state.spot);

const [address, setAddress] = useState(spotToBeEdited?.address)
const [city, setCity] = useState(spotToBeEdited?.city)
const [country, setCountry] = useState(spotToBeEdited?.country)
const [state, setState] = useState(spotToBeEdited?.state)
const [lat, setLat] = useState(spotToBeEdited?.lat)
const [lng, setLng] = useState(spotToBeEdited?.lng)
const [name, setName] = useState(spotToBeEdited?.name)
const [description, setDescription] = useState(spotToBeEdited?.description)
const [price, setPrice] = useState(spotToBeEdited?.price)
const [previewImage, setPreviewImage] = useState(spotToBeEdited?.previewImage)
const [errors, setErrors] = useState([])

const updateAddress = (e) => setAddress(e.target.value);
const updateCity = (e) => setCity(e.target.value);
const updateState = (e) => setState(e.target.value);
const updateCountry = (e) => setCountry(e.target.value);
const updateLat = (e) => setLat(e.target.value);
const updateLng = (e) => setLng(e.target.value);
const updateName = (e) => setName(e.target.value);
const updateDescription = (e) => setDescription(e.target.value);
const updatePreviewImage = (e) => setPreviewImage(e.target.value)
const updatePrice = (e) => setPrice(e.target.value);

const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
        id: spotId,
        address,
        city,
        country,
        state,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
    }
    let newEditedSpot;
    newEditedSpot = await dispatch(editingSpot(payload))
    history.push(`/spots/${newEditedSpot.id}`)
}


return (
    <section>
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={updateAddress}/>
            <input
            type='text'
            placeholder='City'
            value={city}
            onChange={updateCity}/>
            <input
            type='text'
            placeholder='Country'
            value={country}
            onChange={updateCountry}/>
            <input
            type='text'
            placeholder='State'
            value={state}
            onChange={updateState}/>
            <input
            type='number'
            placeholder='Latitude'
            value={lat}
            onChange={updateLat}/>
            <input
            type='number'
            placeholder='Longitude'
            value={lng}
            onChange={updateLng}/>
            <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={updateName}/>
            <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={updateDescription}/>
            <input
            type='text'
            placeholder='Price'
            value={price}
            onChange={updatePrice}/>
             <input
            type='text'
            placeholder='PreviewImage'
            value={previewImage}
            onChange={updatePreviewImage}/>

            <button type="submit"> Edit Spot </button>
            {/* <button onClick={deleteButton}>Delete Spot</button> */}
        </form>
    </section>
   )
}


export default EditSpotForm