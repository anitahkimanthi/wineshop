import React, { useState } from 'react';
import { withRouter } from "react-router";
import {connect} from "react-redux"
import {ordersAction, emptyOrders} from "../redux/actions/actions";
import {Link} from "react-router-dom"

function Orders (props) {
   
    const [state, setState] = useState({
        bottleQuantity : "1",
        caseQuantity : "1",
        bottleTotals : 0,
        caseTotals : 0
    })
    
    const {imageUrl, orders} = props

    // redirect to the detail page
    const ShowDetails = (d) =>{
        props.history.push( `/wines/?name=${d.name.toLowerCase()}`)
        
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

    const clearOrders = () =>{
        props.emptyOrders()
    }
    
    if(orders.length !== 0) {
        const items = orders.map((d, i) =><div className="row winewrapper orderWrapper allwines">
            <div className="col-12 col-sm-6 col-md-6 col-lg-5 cardwrapper ordersCards" key={i}>
                <div className="no-gutters row cardcontent">
                    <div className="col-3 col-sm-4 col-lg-5 wineImage">
                        <img src={imageUrl + d.image} alt={d.name} className="img-fluid"/>
                    </div>
                    
                    <div className="col-9 col-sm-8 col-lg-7">
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
                <div className="empty-orders row">
                    <p className="col-12 text-right">
                       <span onClick={clearOrders}>Clear orders</span>
                    </p>
                </div>
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

export default  withRouter(connect(mapStateToProps, {ordersAction, emptyOrders})(Orders))
