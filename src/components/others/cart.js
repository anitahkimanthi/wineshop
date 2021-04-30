import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CheckoutInfo from "./personalDetails"
import store from "../redux/store"
import {
    CARTITEMS,
    CALCULATEAllTOTALS
} from "../redux/actions/types";


function Cart (props){
    const [state, setState] = useState({
        open : false,
        cartItem : null,
    })
    const {totalPrice, cart, prices} = props

    const handleCheckout = (c) => {
        setState({
            open : true,
            cartItem : c 
        });
    };
    useEffect(() =>{

        if(cart.length > 1){
            const sum = prices.reduce((a, b) => {return a + b})
            store.dispatch({
                type: CALCULATEAllTOTALS,
                payload: sum,
            }) 
        }else{
            store.dispatch({
                type: CALCULATEAllTOTALS,
                payload: prices,
            }) 
        }
       
    
       
    })
    
    const handleClose = () => {
        setState({open : false});
    };

    const emptyCart = (index) =>{
        const getLocalData = JSON.parse(localStorage.getItem("cartproducts"))

        const newCart = getLocalData.filter((d, i) => d.name !== index)

        localStorage.setItem("cartproducts", JSON.stringify(newCart))
        
        store.dispatch({
            type: CARTITEMS,
            payload: newCart === null ? cart: newCart,
        })

    }

    const handleCheckoutAll = () =>{
        setState({
            cartItem : cart,
            open : true,
        })
    }

    const {open,cartItem} = state

    const cartData = cart.map((c, index) => 
        <div className="addtocartcard card col-12" key={index} >
            <div className="row">
                <div className="col-12 col-md-4 section">
                    <p>Delivery Info</p>
                </div>
                <div className="col-12 col-md-3 section">
                    <div className="bottles">
                       {c.quantity}
                        <h6>Bottles</h6> 
                    </div>
                </div>
                <div className="col-12 col-md-5 ">
                    <ul className="calc row">
                        <li className="list-unstyled col-6 price">
                            <h6>
                                <b>
                                {c.id} {c.name}
                                </b>
                            </h6>
                            <small>{c.quantity} * {c.price}</small>
                        </li>
                        <li className="list-unstyled empty col-6 ">
                        <button onClick={() => emptyCart(c.name)}>Empty cart</button>
                        </li>
                    </ul>
                    <hr/>
                    <ul className="product_total row">
                        <li className="list-unstyled col-6 price">
                               Total = $ {c.totals} 
                        </li>
                        <li className="list-unstyled checkout col-6">
                            <button className="cta" onClick={ ()=> handleCheckout(c)}>Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

    return(
        <div className="row cart"onClose={handleClose}>

                {cart.length !== 0 ? cartData : <div className="col-12 text-center">No items added</div>}

                {cartData.length !== 0 ? 
                <div className="card col-12">
                    <div className="row">
                        <div className="col-6 title">
                            <h4><b>Total</b></h4>
                        </div>
                        <div className="col-6 price_total">
                            <ul className="product_total altotal row">
                            <li className="list-unstyled price col-12 col-md-6">
                                <h3><b>$ {totalPrice}</b></h3>
                            </li>
                            <li className="list-unstyled checkoutall col-12 col-md-6">
                                <button className="cta" onClick={handleCheckoutAll}>Checkout all </button>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                :
                null}

                {open &&
                <CheckoutInfo open={open} cartItem={cartItem} handleCheckout={handleCheckout} handleCheckoutAll={handleCheckoutAll} handleClose={handleClose}/>
                }
        </div>
    )
}

const mapStateToProps = (state) =>({
    cart : state.cart.cartproducts,
    prices : state.cart.cartproducts.map(p => p.totals),
    totalPrice : state.calculations.priceTotals
})

export default connect(mapStateToProps)(Cart)
