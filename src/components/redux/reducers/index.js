import { combineReducers } from "redux";
import fetchWinesReducer from "./winesReducer";
import checkoutReqReducer from "./userDataReducer";
import addToCartReducer  from "./addToCartReducer";
import calculationReducer from "./calculationReducer";
import orderReducer from "./ordersReducer";

export default combineReducers({
    wineData : fetchWinesReducer,
    cart : addToCartReducer,
    orders : orderReducer,
    userInfo : checkoutReqReducer,
    calculations : calculationReducer

})
