import { useState } from "react";
import { connect } from "react-redux";

function Cart (props){
    const [checkout, setCheckout] = useState(false)

    const cartData = props.cart.map((c, i) => 
        <div className="card">
            
        </div>
    )
    return(
        <div className="row">
            <div className="col-12">

            </div>
        </div>
    )
}

const mapStateToProps = (state) =>({
    cart : state.cart.cartproducts,
    totalPrice : state.calculations.priceTotals
})

export default connect(mapStateToProps)(Cart)
