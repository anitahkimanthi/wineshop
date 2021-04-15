import axios from 'axios'
import {
    ADDTOCART,
    FETCHWINES,
    CALCULATE,
    CHECKOUTREQUIREMENTS,
    FILTER_WINES,
} from "./types";

// get all wines from the database
export const fetchWines = () => dispatch => {

    const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"
    
    console.log(url)

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

// user credentials before checkout
export const filterWines = (wineCategory) => dispatch => {
    // get wine category and use it to fillter all wines with same name
    dispatch({
        type: FILTER_WINES,
        payload: [],
    })
}

// add item to cart
export const addtocart = (productsDetails) => dispatch => {
    // get the details of the wine clicked and add them to cart (name, price, quantity, and image)
    dispatch({
        type: ADDTOCART,
        payload: [],
    })
}

// calculate totals and quantity
export const productsCalculations = () => dispatch => {
    // get items added to cart and add the prices
    dispatch({
        type: CALCULATE,
        payload: [],
    })
    
}

// user credentials before checkout
export const checkoutRequiredInfo = (userInformation) => dispatch => {
    // when user clicks checkout request them to enter their details
    dispatch({
        type: CHECKOUTREQUIREMENTS,
        payload: [],
    })
}


