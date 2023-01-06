import { csrfFetch } from './csrf';

//actions
const GET_SPOTS = 'spots/getSpots';

const ADD_SPOT = 'spots/addSpot'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const addSpot = (payload) => ({
    type: ADD_SPOT,
    payload
})


//thunks

export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/'
    );
    const data = await response.json();
    dispatch(getSpots(data.spots));
    return response;
};

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
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_SPOTS:
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;

        case ADD_SPOT:
            newState[action.payload.id] = action.payload;
        default:
            return state;
    }
};



export default spotsReducer;
