import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
import rootReducer from "../reducers";


const initialState = {}
const middleware = [thunk]

const composedMiddleware = applyMiddleware(...middleware)

const enhancers = [
    composedMiddleware,
]

const composedEhancers = composeWithDevTools(...enhancers)

const store = createStore(
    rootReducer,
    initialState,
    composedEhancers
)
export default store;