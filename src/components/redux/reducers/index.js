import { combineReducers } from "redux";
import fetchWinesReducer from "./fetchWinesReducer";
import filterWinesReducer from "./filterWinesReducer";
import checkoutReqReducer from "./checkoutReqReducer";
import addToCartReducer  from "./addToCartReducer";
import calculationReducer from "./calculationReducer";
       

export default combineReducers({
    wineData : fetchWinesReducer,
    filteredWines : filterWinesReducer,
    cart : addToCartReducer,
    userInfo : checkoutReqReducer,
    calculations : calculationReducer

})
