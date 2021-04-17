import axios from 'axios'
import store from '../store';
import data from "../../data/data"
import {
    ADDTOCART,
    FETCHWINES,
    CHECKOUTREQUIREMENTS,
    FETCH_ERROR,
    SINGLE_WINE_CALCULATION,
    CALCULATEAllTOTALS,
    VIEW_DETAILS
} from "./types";

// get all wines from the database
export const fetchWines = () => dispatch => {

    dispatch({
        type: FETCHWINES,
        payload: data,
    })
    // const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"

    // axios.get(url)
    // .then( response =>{
    //     const data = response.data
    //     dispatch({
    //         type: FETCHWINES,
    //         payload: data,
    //     })
    // })
    // .catch(error =>{
    //     dispatch({
    //         type: FETCH_ERROR,
    //         payload: "Network error!",
    //     })
    // })
}


// add item to cart
export const addToCart = (d, userData,) => dispatch => {
    // get the details of the wine clicked and add them to cart (name, price, quantity, and image)
   
   const pushTocart = store.getState().cart.cartproducts

   const item = new Object()
    item.id = d.no
    item.image = d.image
    item.name = d.name
    item.quantity = userData.bottleQuantity
    item.totals = userData.bottleTotals

    pushTocart.push(item)
    // push the product to the cartproducts array
    dispatch({
        type: ADDTOCART,
        payload: pushTocart,
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


