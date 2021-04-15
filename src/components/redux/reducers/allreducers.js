import { 
    FETCHWINES,
    ADDTOCART,
    FILTER_WINES,
    CHECKOUTREQUIREMENTS,
    CALCULATE
 } from "../actions/types";

 const initialState = {
     allwines : [],
     filteredWines : [],
     cartItems : [],
     userInfo : [],
     productsCalculations : []
}

// save the wines data to store state
const wineReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCHWINES:
            return{
                ...state,
                allwines : action.payload
            }
        case FILTER_WINES:
            return{
                ...state,
                filteredWines : action.payload
            }
        case ADDTOCART:
            return{
                ...state,
                cartItems : action.payload
            }
        case CHECKOUTREQUIREMENTS:
            return{
                ...state,
                userInfo : action.payload
            }
        case CALCULATE:
            return{
                ...state,
                productsCalculations : action.payload
            }
        default:
            return state
    }
}

export default wineReducer