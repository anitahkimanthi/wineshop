import axios from 'axios'
import store from '../store';
import {
    ADDTOCART,
    FETCHWINES,
    CHECKOUTREQUIREMENTS,
    FILTER_WINES,
    FETCH_ERROR,
    SINGLE_WINE_CALCULATION,
    CALCULATEAllTOTALS
} from "./types";

// get all wines from the database
export const fetchWines = () => dispatch => {

    const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"
    
    console.log(url)

    axios.get(url)
    .then( response =>{
        const data = response.data

        dispatch({
            type: FETCHWINES,
            payload: data,
        })
    })
    .catch(function (error) {
        console.log(error);

        dispatch({
            type: FETCH_ERROR,
            payload: "Something went wrong!",
        })
    })
}

// user credentials before checkout
export const filterWines = (category) => dispatch => {
    // get wine category and use it to fillter all wines with same name
    const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"
    
    console.log(url)

    axios.get(url)
    .then( response =>{
        const data = response.data.map(d => d.name === category)

        dispatch({
            type: FILTER_WINES,
            payload: data,
        })
    })
    .catch(function (error) {
        console.log(error);

        dispatch({
            type: FETCH_ERROR,
            payload: "Something went wrong!",
        })
    })
}


// add item to cart
export const addToCart = (d, userData,) => dispatch => {
    // get the details of the wine clicked and add them to cart (name, price, quantity, and image)
   const product = {
       name : d.name,
       image : d.image,
       quantity : userData.bottleQuantity,
       totals : userData.bottleTotals
   }

    // push the product to the cartproducts array
    dispatch({
        type: ADDTOCART,
        payload: product,
    })
}

// calculate totals and quantity
export const cartItemsCalculations = () => dispatch => {
    // get items added to cart and add the prices
    const products = store.getState().cart.cartproducts.products.map((p, i) => p)

    // calculate total prices
        // code here

    dispatch({
        type: CALCULATEAllTOTALS,
        payload: "",
    })
    
}

// calculate totals of single product on quantity increase or decrease
export const amountsCalculations = (bottleData, caseData) => dispatch => {
    // combine the data objects using concat

    dispatch({
        type: SINGLE_WINE_CALCULATION,
        payload: {}
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


