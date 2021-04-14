import { combineReducers } from "redux";
import {allWinesReducer} from "./allreducers";

export default combineReducers({
    wineData : allWinesReducer,
})
