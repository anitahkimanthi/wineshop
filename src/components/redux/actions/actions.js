import axios from 'axios'
import {
    ADDTOCART,
    FETCHWINES,
    CALCULATE,
    CHECKOUT,
    FILTERWINES,
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

// user credentials before checkout
export const filterWines = (wineCategory) => dispatch => {
    // get wine category and use it to fillter all wines with same name
}

// add item to cart
export const addtocart = (productsDetails) => dispatch => {
    // get the details of the wine clicked and add them to cart (name, price, quantity, and image)
}

// calculate totals and quantity
export const calculations = () => dispatch => {
    // get items added to cart and add the prices
    
}

// user credentials before checkout
export const checkout = (userInformation) => dispatch => {
    // when user clicks checkout request them to enter their details
   
}


