import {
    FETCHWINES, 
    FETCH_ERROR, 
    FILTER_WINES,
    VIEW_DETAILS,
    IMAGES_URL
} from "../actions/types"

const initialState = {
    allWines : [],
    error : "",
    imageUrl : "https://storage.googleapis.com/wineshop-assets/wine-bottles/",
}

// save the wines data to store state
const fetchWines = (state = initialState, action) =>{
    switch(action.type){
        case FETCHWINES:
            return{
                ...state,
                allWines : action.payload
            }
        case IMAGES_URL:
        return{
            ...state,
            imageUrl : state.imageUrl
        }
        case FETCH_ERROR:
            return{
                error : action.payload
            }
        default:
            return state
    }
}

export default fetchWines