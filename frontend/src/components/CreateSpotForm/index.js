import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';


const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState()
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([]);

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([])
        
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
        }
        let newSpot;
        newSpot = await dispatch(createSpot(payload))

        if (newSpot) {
            history.push(`/spots/${newSpot.id}`)
        }
        
    }




   return (
    <section>
        <form onSubmit={handleSubmit}>
            <input
            type='test'
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

            <button type="submit"> Create New Spot </button>
        </form>
    </section>
   )
}

export default CreateSpotForm