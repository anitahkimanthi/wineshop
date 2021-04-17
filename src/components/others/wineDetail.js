import React, { useState } from 'react';
import { amountsCalculations, addToCart} from "../redux/actions/actions";
import {connect} from "react-redux";

function WineDetail (props) {
    const [bottleQuantity, setBottleQuantity] = useState("")
    const [caseQuantity, setCaseQuantity] = useState("")
    const [bottleTotals, setBottleTotals] = useState("")
    const [caseTotals, setCaseTotals] = useState("")
    

    // on click of add to cart button, add to cart
    const handleAddToCart = (d) =>{
        
        const userData = {
            caseQuantity : props.caseQuantity,
            caseTotals : props.caseTotals,
            caseQuantity : props.caseQuantity,
            bottleTotals : props.bottleTotals,
        }

        props.addToCart(d, userData)
    }

    // handle user inputs and change state
    const handleBottleQuantityInput = (d) =>{
        // set state on change of value

        // do the calculations as input change
        // save the totals in redux state
    
        const bottleData = {
            bottleQuantity,
            bottleTotals,
        }

        props.amountsCalculations(bottleData)
    }

    // handle user inputs and change state
    const handleCaseQuantityInput = (d) =>{
        // set state on change of value

        // do the calculations as input change
        // save the totals in state state

        const caseData = {
            caseQuantity,
            caseTotals
        }
        props.amountsCalculations(caseData)
    }

    const query = new URLSearchParams(props.location.search)
    const tag = query.get("tag").toString()
    const filteredData = wines.filter(d => d.name.toLowerCase().toString() === tag)

    const wines = props.filteredData.map((d, i) =>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper" key={i}>
            <div className="no-gutters row cardcontent">
                    <div className="col-lg-5 wineImage">
                        <img src={props.imageUrl + d.image} alt={d.name}/>
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
                            <div className="bottles col-12 col-md-6">
                                <h6><b>Bottles</b></h6>
                                <p>${d.cost.bottle}</p>
                                <input 
                                    type="number" 
                                    name="bottleQuantity"
                                    value={bottleQuantity} 
                                    onChange={() => handleBottleQuantityInput(d)}
                                /> <span className="quantity">QTY</span>
                            </div>
                            <div className="case col-12 col-md-6">
                                <h6><b>Case</b></h6>
                                <p>${d.cost.case}</p>
                                <input 
                                    type="number" 
                                    name="caseQuantity"
                                    value={caseQuantity} 
                                    onChange={() => handleCaseQuantityInput(d)}
                                /> <span className="quantity">QTY</span>
                            </div>
                        </div>

                        <div className="cta row">
                            <button className="addtocart col-12" onClick={ () => handleAddToCart(d)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        )
        
        return (
            <div className="justify-content-center card details">
                {wines}
            </div>
        )
}
 
const mapStateToProps = (state) =>({
    caseQuantity : state.calculations.singleProductCalculations.caseQuantity,
    caseTotals : state.calculations.singleProductCalculations.caseTotals,
    bottleTotals : state.calculations.singleProductCalculations.bottleTotals,
    bottleQuantity: state.calculations.singleProductCalculations.bottleQuantity,
    
})

export default connect(mapStateToProps, { amountsCalculations,addToCart})(WineDetail)
