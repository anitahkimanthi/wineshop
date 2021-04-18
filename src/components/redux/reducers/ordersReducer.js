import {
    ORDERS
} from "../actions/types"

const initialState = {
    orders : []
}

// save the wines data to store state
const fetchWines = (state = initialState, action) =>{
    
    switch(action.type){
       
        case ORDERS:
        return{
            ...state,
            orders : action.payload
        }
        default:
            return state
    }
}

export default fetchWines