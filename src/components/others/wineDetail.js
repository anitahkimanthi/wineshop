import React, { useState } from 'react';
import { 
    addToCart,
    fetchWines
} from "../redux/actions/actions";
import {connect} from "react-redux";

function WineDetail (props) {
    const [state, setState] = useState({
        bottleQuantity : 1,
        caseQuantity : 1,
        bottleTotals : 0,
        caseTotals : 0
    })
    
    const {imageUrl, wines} = props

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
    const query = new URLSearchParams(props.location.search)
    const searchKeyWord = query.get("name").toString()

    const filteredData = wines.filter(d => d.name.toLowerCase().toString() === searchKeyWord)
    
    const item = filteredData.map((d, i) =>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 cardwrapper" key={i}>
            <div className="no-gutters row cardcontent">
                    <div className="col-3 col-sm-4 col-md-5 wineImage">
                    <img src={imageUrl + d.image} alt={d.name} className="img-fluid"/>
                    </div>
                    
                    <div className="col-9 col-sm-8 col-lg-7">
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
                                {state.bottleQuantity === 1 ? <span>$ {d.cost.bottle.toFixed(2)}</span>
                                    :
                                    <span>$ {state.bottleTotals.toFixed(2)}</span>
                                }

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
                                $ {state.caseQuantity === 1 ? 
                                    <span>{d.cost.case.toFixed()}</span>
                                :
                                <span>
                                   $ {state.caseTotals.toFixed() }</span>}
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
                        <button className="addtocart" onClick={() => handleAddToCart(d)}>Add to cart</button>
                    </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="details row">
                <div className="col-12">
                   <h4>
                        <b>
                            Product Details
                        </b>
                    </h4>
                    <p>
                        {d.details.split("\\.")}
                    </p> 
                </div>
            </div>
        </div>
        )
        
        return (
            <div className="row justify-content-center details winewrapper card">
                {item}
            </div>
        )
}
 
const mapStateToProps = (state) =>({
    wines : state.wineData.allWines,
    imageUrl : state.wineData.imageUrl
    
})

export default connect(mapStateToProps, { fetchWines,addToCart})(WineDetail)
