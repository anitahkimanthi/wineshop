import {
    FETCHWINES, FETCH_ERROR
} from "../actions/types"

const initialState = {
    wines : [],
    error : ""
}

// save the wines data to store state
const fetchWines = (state = initialState, action) =>{
    switch(action.type){
        case FETCHWINES:
            return{
                ...state,
                wines : action.payload
            }
        case FETCH_ERROR:
            return{
                ...state,
                error : action.payload
            }
        default:
            return state
    }
}

export default fetchWines