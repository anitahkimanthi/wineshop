import { 
    FETCHWINES,
    ADDTOCART
 } from "../actions/types";

 const initialState = {
     wines : [],
     productAdded : [],
}

export const allWinesReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCHWINES:
            return{
                ...state,
                wines : action.payload
            }
            default:
                return state
    }
}

export const addToCart = (state = initialState, action) =>{
    switch(action.type){
        case ADDTOCART:
            return{
                ...state,
                productAdded : action.payload
            }
            default:
                return state
    }
}