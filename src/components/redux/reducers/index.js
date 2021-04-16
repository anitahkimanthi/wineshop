import { combineReducers } from "redux";
import fetchWinesReducer from "./winesReducer";
import checkoutReqReducer from "./userDataReducer";
import addToCartReducer  from "./addToCartReducer";
import calculationReducer from "./calculationReducer";
       

export default combineReducers({
    wineData : fetchWinesReducer,
    cart : addToCartReducer,
    userInfo : checkoutReqReducer,
    calculations : calculationReducer

})
