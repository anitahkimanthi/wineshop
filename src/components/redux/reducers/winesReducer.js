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
    searchKeyWord : "red",
    selectedProduct : []
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
                ...state,
                error : action.payload
            }
        case FILTER_WINES:
            return{
                ...state,
                searchKeyWord : action.payload
            }
        case VIEW_DETAILS:
            return{
                ...state,
                selectedProduct : action.payload
            }
        default:
            return state
    }
}

export default fetchWines