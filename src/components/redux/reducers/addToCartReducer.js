import {
    ADDTOCART,
    EMPTY_CART
} from "../actions/types"

const initialState = {
    cartproducts : []
}

// on add to cart button, add the item clicked product
const addToCartReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADDTOCART:
            return{
                cartproducts : action.payload
            }
        case EMPTY_CART:
            return{
                ...state,
            }
            default:
                return state
    }
}

export default addToCartReducer