import {
    FILTER_WINES
} from "../actions/types"

const initialState = {
    filteredWines : []
}

// save the wines data to store state
const filteredWines = (state = initialState, action) =>{
    switch(action.type){
        case FILTER_WINES:
            return{
                ...state,
                filteredWines : action.payload
            }
            default:
                return state
    }
}

export default filteredWines