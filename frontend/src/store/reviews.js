import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "spots/getAllReviews";
const CREATE_REVIEW = "spots/createReview";
const DELETE_REVIEW = "spots/deleteReview";
const EDIT_REVIEW = "spots/editReview";

const getAllReviewsAction = (reviews) => ({
  type: GET_ALL_REVIEWS,
  reviews,
});

const createReviewAction = (payload) => ({
    type: CREATE_REVIEW,
    payload
})

const deleteReviewAction = (payload) => ({
    type: DELETE_REVIEW,
    payload
})

const editReviewAction = (payload) => ({
    type: EDIT_REVIEW,
    payload
})

export const getReviewsForSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    console.log('####', spotId)
  
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllReviewsAction(...data, {...spotId}));
      console.log(data,'reviews')
      return {data}
    }
}

export const createReview = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createReviewAction(data))
        return data
    }
}

export const deleteReview = (reviewId) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        
    });
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_ALL_REVIEWS: {
            action.reviews = [action.reviews]
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW: {
            newState[action.payload.id] = action.payload;
            return newState
        }
        
        case DELETE_REVIEW: {
            delete newState[action.payload];
            return newState
        }

        default:
            return state;
    }
}

export default reviewsReducer
