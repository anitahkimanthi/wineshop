import {
    FETCHWINES
} from "../actions/types"

const initialState = {
    allwines : []
}

// save the wines data to store state
const fetchWines = (state = initialState, action) =>{
    switch(action.type){
        case FETCHWINES:
            return{
                ...state,
                allwines : action.payload
            }
            default:
                return state
    }
}

export default fetchWines