import React, { useState } from 'react';
import { withRouter } from "react-router";
import { fetchWines,filterWines, amountsCalculations, addToCart,viewDetails} from "../redux/actions/actions";
import {connect} from "react-redux";

function Filter (props) {
   
    const [open, setOpen] = useState(false)
    const [bottleQuantity, setBottleQuantity] = useState(1)
    const [caseQuantity, setCaseQuantity] = useState(1)
    const [bottleTotals, setBottleTotals] = useState("")
    const [caseTotals, setCaseTotals] = useState("")
    
    const {
        searchKeyWord,
        wines,
        error,
        imageUrl

    } = props

    const fetchData = props.fetchWines();
    const filterData = props.filterWines();

    // redirect to the detail page
    const ShowDetails = (d) =>{
        props.viewDetails(d);
        props.history.push(`/wines/${d.name}`)
       
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


    const filteredData = wines.filter(d => d.tags.map(t=> t.toLowerCase()) === searchKeyWord)

    if(wines.length !== 0 && filteredData.length !== 0 && filteredData !== undefined ) {
        const products = filteredData.map((d, i) =>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper" key={i}>
                <div className="no-gutters row cardcontent">
                        <div className="col-3 col-sm-6 col-md-5 wineImage">
                        <img src={props.imageUrl + d.image} alt={d.name} className="img-fluid"/>
                        </div>
                        
                        <div className="col-9 col-sm-6 col-md-7">
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
                {products}
            </div>
            ) 
        } else {

        const products = wines.map((d, i) =>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper" key={i}>
                <div className="no-gutters row cardcontent">
                        <div className="col-3 col-sm-6 col-md-5 wineImage">
                        <img src={props.imageUrl + d.image} alt={d.name} className="img-fluid"/>
                        </div>
                        
                        <div className="col-9 col-sm-6 col-md-7">
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
                                        value={bottleQuantity} 
                                        onChange={() => handleBottleQuantityInput(d)}
                                    /> <span className="quantity">QTY</span>
                                </div>
                                <div className="case col-6">
                                    <h6><b>Case</b></h6>
                                    <p>${d.cost.case}</p>
                                    <input 
                                        type="number" 
                                        value={caseQuantity} 
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
            </div>)

            return (
                <div className="row winewrapper">
                    {products}
                </div>
            ) 
        } 
    }
     
const mapStateToProps = (state) =>({
    wines : state.wineData.allWines,
    searchKeyWord: state.wineData.searchKeyWord,
    error : state.wineData.error,
    imageUrl : state.wineData.imageUrl,
    caseQuantity : state.calculations.singleProductCalculations.caseQuantity,
    caseTotals : state.calculations.singleProductCalculations.caseTotals,
    bottleTotals : state.calculations.singleProductCalculations.bottleTotals,
    bottleQuantity: state.calculations.singleProductCalculations.bottleQuantity,
    
})

export default connect(mapStateToProps, {filterWines,viewDetails,fetchWines, amountsCalculations,addToCart})(Filter)
