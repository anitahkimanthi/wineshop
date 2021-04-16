import React, { useState } from 'react';
import { withRouter } from "react-router";
import { fetchWines,filterWines, amountsCalculations, addToCart} from "../redux/actions/actions";
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
        setOpen = true
        console.log(open)
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

    const filteredData = wines.filter(d => d.tags[0] === "red" )
    console.log(filterData);

   if(props.wines === "")  {
   const wines = wines.filter((d, i) => d.tags[0].toLowerCase() === searchKeyWord &&
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
                                   value={bottleQuantity} 
                                   onChange={() => handleBottleQuantityInput(d)}
                               /> <span className="quantity">QTY</span>
                           </div>
                           <div className="case col-12 col-md-6">
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
       </div>        
   )
   return (
       <div className="row winewrapper filter">
           {wines} hellow
       </div>
       ) 
   } else {
   return (
       <div className="row  winewrapper filter">
           <span className="span">{props.error}</span>
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

export default connect(mapStateToProps, {filterWines,fetchWines, amountsCalculations,addToCart})(Filter)