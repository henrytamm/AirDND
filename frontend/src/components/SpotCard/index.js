import './SpotCard.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spots';

const SpotCard = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const viewSpotInfo = () => {
        history.push(`/spots/${spot.id}`);
    }
    const editButton = () => {
        history.push(`/user/edit/${spot.id}`)
    }
    const deleteButton = () => {
        dispatch(deleteSpotThunk(spot.id))
    }
    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === spot.ownerId;
    // console.log('eeeeeee', sessionUser)
    return (
        <div className='spot-card'>
            <div>{spot.address}</div>
            <div>{spot.name}</div>
            <button onClick={viewSpotInfo}>View Spot Info</button>
            {isOwner && <button onClick={deleteButton}>Delete</button>}
            {isOwner && <button onClick={editButton}>Edit</button>}
        </div>
    )
}

export default SpotCard;
