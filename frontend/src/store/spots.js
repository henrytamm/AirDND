import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "/spots/getAllSpots";

const GET_ONE_SPOT = "spots/getOneSpot"

const CREATE_SPOT = "/spots/createSpot";

const REMOVE_SPOT = "/spots/removeSpot";

const EDIT_SPOT = "/spots/editSpot"

const getAllSpotsAction = (spots) => ({
    type: GET_ALL_SPOTS,
    spots,
})

const getOneSpotAction = (spot) => ({
    type: GET_ONE_SPOT,
    spot
})

const createSpotAction = (spots) => ({
    type: CREATE_SPOT,
    spots,
})

const editSpotAction = (spotId) => ({
    type: EDIT_SPOT,
    spotId
})

const removeSpotAction = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
})


export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/');
    const data = await response.json();
    dispatch(getAllSpotsAction(data.spots));
    return response;
};

export const getSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneSpotAction(data));
    return data;
  }
};

export const createSpot = (spots) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spots),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createSpotAction(data));
    return data;
  }
};

export const editSpot = (spot) => async (dispatch) => {
    const {id} = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(spot),
    })

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpotAction(editedSpot))
        return editedSpot
    }
}

export const deleteASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeSpotAction(spotId));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_SPOTS: {
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        }

    case CREATE_SPOT:
      newState[action.spots.id] = action.spots;

    case REMOVE_SPOT:
      delete newState[action.spotId];
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
