import React, { useState } from 'react';
import { withRouter } from "react-router";
import {connect} from "react-redux"
import {ordersAction} from "../redux/actions/actions";
import {Link} from "react-router-dom"

function Orders (props) {
   
    const [state, setState] = useState({
        bottleQuantity : "1",
        caseQuantity : "1",
        bottleTotals : 0,
        caseTotals : 0
    })
    
    const {imageUrl, error, orders} = props

    console.log(orders)

    // redirect to the detail page
    const ShowDetails = (d) =>{
        props.history.push( `/wines/?name=${d.name.toLowerCase()}`)
        
    }

    // on click of add to cart button, add to cart
    const handleAddToCart = (d) =>{
        const {bottleQuantity,bottleTotals,caseQuantity,caseTotals} = state

        const userData = {
            bottleQuantity : bottleQuantity,
            caseTotals : caseTotals === 0 ? d.cost.case : caseTotals,
            caseQuantity : caseQuantity,
            bottleTotals : bottleTotals === 0 ? d.cost.bottle : bottleTotals,
        }

        props.addToCart(d, userData)
    }

    // handle user inputs and change state
    const handleBottleQuantityInput = (e) =>{
        // set state on change of value
        const {value} = e.target

        // do the calculations as input change
        const bottlePrice = e.currentTarget.id
        const bottlePriceCalc = value * bottlePrice

        // setting values to state
        setState({
            ...state,
            bottleQuantity : value,
            bottleTotals : bottlePriceCalc
        })
    }

    // handle user inputs and change state
    const handleCaseQuantityInput = (e) =>{
        // set state on change of value
        const {value} = e.target

        // do the calculations as input change
        const casePrice = e.currentTarget.id
        
        const casePriceCalc = value * casePrice
        
        // setting the values to state
        setState({
            ...state,
            caseQuantity : value,
            caseTotals : casePriceCalc
        })
    }
    
    if(orders.length !== 0) {
        const items = orders.map((d, i) =><div className="row winewrapper allwines">
        <div className="col-12 col-sm-6 col-md-6 col-lg-5 cardwrapper ordersCards" key={i}>
            <div className="no-gutters row cardcontent">
                <div className="col-lg-5 wineImage">
                    <img src={imageUrl + d.image} alt={d.name} className="img-fluid"/>
                </div>
                
                <div className="col-lg-7">
                <div className="card-body content">
                    <h5 className="card-title row">
                        <b className="col-12">
                            <span className="number">{d.id}</span> 
                            <br/>
                            <span className="name">{d.name}</span>
                        </b>
                    </h5>
                    <br/>
                    <div className="card-text row">
                        <div className="bottles col-12">
                            <h6><b>Bottles</b></h6>
                            <p>
                                Price : $ {d.price}
                            </p>
                            <input 
                                id={d.bottleQuantity}
                                type="number" 
                                disabled
                                name="bottleQuantity"
                                value={state.bottleQuantity} 
                                onChange={handleBottleQuantityInput}
                            />
                            <span className="quantity">QTY</span>
                        </div>
                    </div>

                    <div className="cta">
                        <button className="details" onClick={ () => ShowDetails(d)}>Details</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
     <div className="col-sm-6 col-md-6 col-lg-7 cardwrapper delivery">
        <div className="cardcontent">
            <p>Delivery status : <span>Pending</span></p>
        </div>
     </div>
 </div>
        )
        return (
            <div>
                    {items}
            </div>
        )}
        
        return (
            <div className="row winewrapper">
                <div className="col-12 text-center">
                    You do not have any pending orders <Link to="/">view products</Link>
                </div>
            </div>
        ) 
        
    }
     
const mapStateToProps = (state) =>({
    orders : state.orders.orders,
    imageUrl : state.wineData.imageUrl
    
})

export default  withRouter(connect(mapStateToProps, {ordersAction})(Orders))
