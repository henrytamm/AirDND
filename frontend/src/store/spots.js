import { csrfFetch } from './csrf';

//actions
const GET_SPOTS = 'spots/getSpots';
const GET_ONE_SPOT = 'spots/getOneSpot'
const ADD_SPOT = 'spots/addSpot'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const getOneSpot = (spot) => ({
    type: GET_ONE_SPOT,
    spot
})

const addSpot = (payload) => ({
    type: ADD_SPOT,
    payload
})

const editSpot = (payload) => ({
    type: EDIT_SPOT,
    payload
})

const deleteSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})


//thunks

export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/');
    const data = await response.json();
    dispatch(getSpots(data.spots));
    return response;
};

export const getOneSpotById = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getOneSpot(data))
        return res
    }
}

export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
    const response = await csrfFetch("api/spots", {
        method: "POST",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }),
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot
    }
}

export const editingSpot = (spot) => async (dispatch) => {
    const {id} = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(spot),
    })

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpot(editedSpot))
        return editedSpot
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const destroyedSpot = await response.json();
        dispatch(deleteSpotAction(spotId))
        return destroyedSpot
    }
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_SPOTS: {
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        }

        case GET_ONE_SPOT: {
            newState[action.spot.id] = action.spot
        }

        case ADD_SPOT: {
            newState[action.payload.id] = action.payload;
        }
        
        case EDIT_SPOT: {
            newState[action.payload.id] = action.payload;
        }

        case DELETE_SPOT: {
            delete newState[action.spotId];
            return newState;
        }

        
        default:
            return state;
    }
};



export default spotsReducer;
