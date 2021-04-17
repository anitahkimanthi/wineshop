import React, { useState,useSelector} from 'react';
import { withRouter } from "react-router";
import { fetchWines, amountsCalculations, addToCart} from "../redux/actions/actions";
import {connect} from "react-redux";

function Wines (props) {
    const [inputValues, setInputValues] = useState({
        bottleQuantity : "1",
        caseQuantity : "1",
        bottleTotals : "",
        caseTotals : ""
    })
    
    const fetchData = props.fetchWines();

    // redirect to the detail page
    const ShowDetails = (d) =>{
        window.location.href= `/wines/?name=${d.name.toLowerCase()}`
        
    }

    // on click of add to cart button, add to cart
    const handleAddToCart = (d) =>{
        
        const userData = {
            bottleQuantity : props.caseQuantity,
            caseTotals : props.caseTotals,
            caseQuantity : props.caseQuantity,
            bottleTotals : props.bottleTotals,
        }

        props.addToCart(d, userData)
    }

    // handle user inputs and change state
    const handleBottleQuantityInput = (d, e) =>{
        // set state on change of value
        const {name, value} = e.target
        console.log(name)
        setInputValues({
            ...inputValues,
            [name] : value
        })
        // do the calculations as input change
        // save the totals in redux state
        const {bottleQuantity,bottleTotals,} = inputValues

        const bottleData = {
            bottleQuantity,
            bottleTotals,
        }

        props.amountsCalculations(bottleData)
    }

    // handle user inputs and change state
    const handleCaseQuantityInput = (d,e) =>{
        // set state on change of value
        const {name, value} = e.target

        setInputValues({
            ...inputValues,
            [name] : value
        })
        // do the calculations as input change
        // save the totals in state state
        const {caseQuantity,caseTotals} = inputValues
        const caseData = {
            caseQuantity,
            caseTotals
        }
        props.amountsCalculations(caseData)
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
                                <p>${d.cost.bottle}</p>
                                <input 
                                    type="number" 
                                    name="bottleQuantity"
                                    value={inputValues.bottleQuantity} 
                                    onChange={() => handleBottleQuantityInput(d)}
                                /> <span className="quantity">QTY</span>
                            </div>
                            <div className="case col-6">
                                <h6><b>Case</b></h6>
                                <p>${d.cost.case}</p>
                                <input 
                                    type="number" 
                                    name="caseQuantity"
                                    value={inputValues.caseQuantity} 
                                    onChange={() => handleCaseQuantityInput(d)}
                                /> <span className="quantity">QTY</span>
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
    caseQuantity : state.calculations.singleProductCalculations.caseQuantity,
    caseTotals : state.calculations.singleProductCalculations.caseTotals,
    bottleTotals : state.calculations.singleProductCalculations.bottleTotals,
    bottleQuantity: state.calculations.singleProductCalculations.bottleQuantity,
    
})

export default  connect(mapStateToProps, {fetchWines,amountsCalculations,addToCart}) (Wines)
