import { useState } from "react";
import { connect } from "react-redux";
import CheckoutInfo from "./personalDetails"
import {emptyCart, cartItemsCalculations} from "../redux/actions/actions"


function Cart (props){
    const [state, setState] = useState({
        open : false,
        cartItem : null,
    })
    
    const {totalPrice, cart,emptyCart, cartItemsCalculations} = props


    const handleCheckout = (c) => {
        setState({
            open : true,
            cartItem : c,
        });
    };
    
    const handleClose = () => {
        setState({open : false});
    };

    const empty = (name) =>{
        console.log(name)
        emptyCart(name)
        cartItemsCalculations()
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
            <div className="row no-gutters">
                <div className="col-4 col-md-4 section">
                    <p>Delivery Info</p>
                </div>
                <div className="col-2 col-md-3 section">
                    <div className="bottles">
                       {c.bottleQuantity}
                        <h6>Bottle(s)</h6> 
                    </div>
                </div>
                <div className="col-6 col-md-5">
                    <ul className="calc row">
                        <li className="list-unstyled col-12 col-sm-6 price">
                            <h6>
                                <b>
                                {c.id} {c.name}
                                </b>
                            </h6>
                            <small>{c.bottleQuantity} * {c.price.toFixed(2)}</small>
                        </li>
                        <li className="list-unstyled empty col-12 col-sm-6 ">
                        <button onClick={() => empty(c.name)}>Empty cart</button>
                        </li>
                    </ul>
                    <hr/>
                    <ul className="product_total row">
                        <li className="list-unstyled col-12 col-sm-6 price">
                               Total = $ {c.totals.toFixed(2)} 
                        </li>
                        <li className="list-unstyled checkout col-12 col-sm-6 ">
                            <button className="cta" onClick={ ()=> handleCheckout(c)}>Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

    return(
        <div className="row cart" onClose={handleClose}>

                {cart.length !== 0 ? cartData : <div className="col-12 text-center">No items added</div>}

                {cartData.length !== 0 ? 
                <div className="card col-12 cartCheckout">
                    <div className="row no-gutters">
                        <div className="col-4 col-sm-5 col-md-7 title">
                            <h4><b>Total</b></h4>
                        </div>
                        <div className="col-8 col-sm-5 col-md-7price_total">
                            <ul className="product_total altotal row">
                            <li className="list-unstyled price col-12 col-md-6">
                                <h3><b>$ {(Math.round(totalPrice * 100) / 100).toFixed(2)}</b></h3>
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
    totalPrice : state.calculations.priceTotals
})

export default connect(mapStateToProps,{cartItemsCalculations, emptyCart})(Cart)
