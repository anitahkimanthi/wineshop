import axios from 'axios'
import store from '../store';
import data from "../../data/data"
import {
    ADDTOCART,
    FETCHWINES,
    CHECKOUTREQUIREMENTS,
    ORDERS,
    CALCULATEAllTOTALS,
} from "./types";

// get all wines from the database
export const fetchWines = () => dispatch => {

    const url = "https://storage.googleapis.com/wineshop-assets/wine-shop.json"

    axios.get(url)
    .then( response =>{
        const responseData = response.data
        dispatch({
            type: FETCHWINES,
            payload: responseData,
        })
        localStorage.setItem("wines", JSON.stringify(responseData))

    })
    .catch(error =>{
        dispatch({
            type: FETCHWINES,
            payload: data,
        })
        localStorage.setItem("wines", JSON.stringify(data))
    })
}


// add item to cart
export const addToCart = (d, userData,) => dispatch => {
    // get the details of the wine clicked and add them to cart (name, price, quantity, and image)
   
    const pushTocart = store.getState().cart.cartproducts
    const checkProduct = pushTocart.some(p => p.name === d.name)

    if(!checkProduct){
        const item = {}
        item.id = d.no
        item.image = d.image
        item.name = d.name
        item.price = d.cost.bottle
        item.bottleQuantity = userData.bottleQuantity
        item.caseQuantity = userData.caseQuantity
        item.totals = userData.bottleTotals
        
    pushTocart.push(item)

    localStorage.setItem("cartproducts", JSON.stringify(pushTocart))
    // push the product to the cartproducts array
    dispatch({
        type: ADDTOCART,
        payload: pushTocart,
    })
    }
}

// calculate totals and quantity
export const cartItemsCalculations = () => dispatch => {

    const cart = store.getState().cart.cartproducts

    // get items added to cart and add the prices
    const priceValues = cart.map((p, i) => Number(p.totals))
    
    if(cart.length > 1){
        const sum = priceValues.reduce((a, b) => {return a + b})
        store.dispatch({
            type: CALCULATEAllTOTALS,
            payload: sum,
        }) 
    }else{
        store.dispatch({
            type: CALCULATEAllTOTALS,
            payload: priceValues,
        }) 
    }
    
}

export const ordersAction = (cartItem) => dispatch =>{

    const orderItems = store.getState().orders.orders

    orderItems.push(cartItem)

    localStorage.setItem("orderItems", JSON.stringify(orderItems))

    dispatch({
        type : ORDERS,
        payload: orderItems
    })
}

// user credentials before checkout
export const checkoutRequiredInfo = (userInfo) => dispatch => {
    // when user clicks checkout request them to enter their details
    dispatch({
        type: CHECKOUTREQUIREMENTS,
        payload: userInfo,
    })
}


