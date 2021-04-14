import axios from 'axios'
import {
    ADDTOCART,
    FETCHWINES,
    CALCULATE
} from "./types";

// get all wines from the database
export const fetchWines = () => dispatch => {

    const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"
    

    axios.get(url)
    .then(function (response) {
        dispatch({
            type: FETCHWINES,
            payload: response,
        })
    })
    .catch(function (error) {
        console.log(error);
    })
}

// add item to cart
export const addtocart = (countersstate) => dispatch => {
    dispatch({
        type: ADDTOCART,
        payload: countersstate - 5,
    })
}

// calculate totals and quantity
export const calculations = (userInputs) => dispatch => {
    // do the calculation and then dispatch to actions
    dispatch({
        type: CALCULATE,
        payload: userInputs,
    })
}

