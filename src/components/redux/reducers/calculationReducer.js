import {
    CALCULATE
} from "../actions/types"

const initialState = {
    productsCalculations : {}
}

// calculate the final output from the products added to cart
const calculationReducer = (state = initialState, action) =>{
    switch(action.type){
        case CALCULATE:
            return{
                ...state,
                productsCalculations : action.payload
            }
            default:
                return state
    }
}

export default calculationReducer