import { csrfFetch } from './csrf';

//actions
const GET_REVIEWS = "reviews/getReviews"
const ADD_REVIEW = "reviews/addReview"
const EDIT_REVIEW = "reviews/editReview"
const DELETE_REVIEW = "reviews/deleteReview"

const getReviewsAction = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const addReviewAction = (newReview) => ({
    type: ADD_REVIEW,
    newReview
})

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReviewAction = (review) => ({
    type: DELETE_REVIEW,
    review
})
//thunks

export const allReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviewsAction(...data))
    return response
    
}

export const createNewReview = (review) => async (dispatch) => {
    const {spotId} = review;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
    });
        const newReview = await response.json();
        console.log('#######', response)
        dispatch (addReviewAction(newReview))
        return response
}

export const editReview = (review) => async (dispatch) => {
    const { id } = review;
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(review),
    });
    const editedReview = await res.json();
    if (res.ok) {
        dispatch(editReviewAction(editedReview))
        return res
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_REVIEWS: {
           action.reviews = [action.reviews];
           action.reviews.forEach(review => {
            newState[review.id] = review
           })
           return newState;
        }

        case ADD_REVIEW: {
            newState[action.newReview.id] = action.newReview;
        }

        case EDIT_REVIEW: {
            newState[action.review.id] = action.review
        }

        default:
            return state;
    }
};


export default reviewsReducer