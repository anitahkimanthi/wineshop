import React, { useState,useSelector} from 'react';
import { withRouter } from "react-router";
import { fetchWines, addToCart, cartItemsCalculations} from "../redux/actions/actions";
import {connect} from "react-redux";

function Wines (props) {
    const [state, setState] = useState({
        bottleQuantity : "1",
        caseQuantity : "1",
        bottleTotals : 0,
        caseTotals : 0
    })
    
    const fetchData = props.fetchWines();

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
        props.cartItemsCalculations()

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
            ... state,
            caseQuantity : value,
            caseTotals : casePriceCalc
        })
    }
    

    if(props.error === "")  {
    const wines = props.wines.map((d, i) =>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper" key={i}>
            <div className="no-gutters row cardcontent">
                    <div className="col-lg-5 wineImage">
                    <img src={props.imageUrl + d.image} alt={d.name} className="img-fluid"/>
                    </div>
                    
                    <div className="col-lg-7">
                    <div className="card-body content">
                        <h5 className="card-title row">
                            <b className="col-12">
                                <span className="number">{d.no}</span> 
                                <br/>
                                <span className="name">{d.name}</span>
                            </b>
                        </h5>
                        <br/>
                        <div className="card-text row">
                            <div className="bottles col-6">
                                <h6><b>Bottles</b></h6>
                                <p>
                                    $ {state.bottleTotals === 0 ? 
                                    d.cost.bottle
                                    :
                                    <span>{state.bottleTotals }</span>}
                                </p>
                                <input 
                                    id={d.cost.case}
                                    type="number" 
                                    name="bottleQuantity"
                                    value={state.bottleQuantity} 
                                    onChange={handleBottleQuantityInput}
                                />
                                <span className="quantity">QTY</span>
                            </div>
                            <div className="case col-6">
                                <h6><b>Case</b></h6>
                                <p>
                                    $ {state.caseTotals === 0 ? 
                                    d.cost.case
                                    :
                                    <span>{state.caseTotals }</span>}
                                </p>
                                <input 
                                    id={d.cost.case}
                                    type="number" 
                                    name="caseQuantity"
                                    value={state.caseQuantity} 
                                    onChange={handleCaseQuantityInput}
                                />
                                <span className="quantity">QTY</span>
                            </div>
                        </div>

                        <div className="cta">
                            <button className="details" onClick={ () => ShowDetails(d)}>Details</button>
                            <button className="addtocart" onClick={ () => handleAddToCart(d)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    )
    return (
        <div className="row winewrapper allwines">
            {wines}
        </div>
        ) 
    } 
    return (
        <div className="row card winewrapper">
            <span className="span">{props.error}</span>
        </div>
    ) 
        
}
 
const mapStateToProps = (state) =>({
    wines: state.wineData.allWines,
    error : state.wineData.error,
    imageUrl : state.wineData.imageUrl,
    
})

export default   withRouter(connect(mapStateToProps, {fetchWines,addToCart, cartItemsCalculations}) (Wines))
