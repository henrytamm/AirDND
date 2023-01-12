import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../../store/spots';


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
        try {
            let newSpot;
            newSpot = await dispatch(createSpot(payload))
            history.push(`/spots/${newSpot.id}`)
        } catch (res){
            setErrors([])
            const data = await res.json();

            if (data && data.message) setErrors(data.errors)
        }
        // let newSpot;
        // newSpot = await dispatch(createSpot(payload))

        // if (newSpot) {
        //     history.push(`/spots/${newSpot.id}`)
        
    }




   return (
    <div className='outer-container'>
        <div className="create-spot-container"></div>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h2>Create Spot</h2>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={updateAddress}/>
                <p className='errors'>{errors.address}</p>
            <input
            type='text'
            placeholder='City'
            value={city}
            onChange={updateCity}/>
                <p className='errors'>{errors.city}</p>
            <input
            type='text'
            placeholder='Country'
            value={country}
            onChange={updateCountry}/>
                <p className='errors'>{errors.country}</p>
            <input
            type='text'
            placeholder='State'
            value={state}
            onChange={updateState}/>
                <p className='errors'>{errors.state}</p>
            <input
            type='number'
            placeholder='Latitude'
            value={lat}
            onChange={updateLat}/>
                <p className='errors'>{errors.lat}</p>
            <input
            type='number'
            placeholder='Longitude'
            value={lng}
            onChange={updateLng}/>
                <p className='errors'>{errors.lng}</p>
            <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={updateName}/>
                <p className='errors'>{errors.name}</p>
            <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={updateDescription}/>
                <p className='errors'>{errors.description}</p>
            <input
            type='text'
            placeholder='Price'
            value={price}
            onChange={updatePrice}/>
                <p className='errors'>{errors.price}</p>
             <input
            type='text'
            placeholder='PreviewImage'
            value={previewImage}
            onChange={updatePreviewImage}/>

            <button type="submit"> Create New Spot </button>
        </form>
        </div>
   )
}

export default CreateSpotForm