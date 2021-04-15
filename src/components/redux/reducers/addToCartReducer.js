import {
    ADDTOCART
} from "../actions/types"

const initialState = {
    products : []
}

// on add to cart button, add the item clicked product
const addToCartReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADDTOCART:
            return{
                ...state,
                products : action.payload
            }
            default:
                return state
    }
}

export default addToCartReducer