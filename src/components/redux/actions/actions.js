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
export const addtocart = (productsDetails) => dispatch => {
    
}

// calculate totals and quantity
export const calculations = () => dispatch => {
    // get items added to cart and add the prices
    
}

// user credentials before checkout
export const checkout = (userInformation) => dispatch => {
   
}


