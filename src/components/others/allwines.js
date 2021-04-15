import { fetchWines, amountsCalculations, addToCart} from "../redux/actions/actions";
import {useState} from "react"
import {connect} from "react-redux";

const Wines = (props) =>{
    const [open, setOpen] = useState(false)
    const [bottleQuantity, setBottleQuantity] = useState("")
    const [caseQuantity, setCaseQuantity] = useState("")
    const [bottleTotals, setBottleTotals] = useState("")
    const [caseTotals, setCaseTotals] = useState("")
    
    // redirect to the detail page
    const ShowDetails = (d) =>{
         setOpen = true
         console.log(open)
         props.history.push(`/wines/${d.name}`)
        
    }

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

    console.log(fetchWines())

    const wines = props.wines.map((d, i) =>
        <div className="col-12 col-sm-6 col-md-3" key={i}>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src={d.image} alt={d.name}/>
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                            {d.no} {d.name}
                        </h5>
                        <p class="card-text">
                            
                        </p>
                        <div class="card-text">
                            <div className="bottles">
                                <h5>Bottles</h5>
                                <p></p>
                                <input 
                                    type="number" 
                                    value={bottleQuantity} 
                                    onChange={() => handleBottleQuantityInput(d)}
                                />
                            </div>
                            <div className="case">
                                <h5>Bottles</h5>
                                <p></p>
                                <input 
                                    type="number" 
                                    value={caseQuantity} 
                                    onChange={() => handleCaseQuantityInput(d)}
                                />
                            </div>
                        </div>

                        <button className="details btn" onClick={ () => ShowDetails(d)}>Details</button>
                        <button className="addtocart btn" onClick={ () => handleAddToCart(d)}>Add to cart</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
            
        )
        
        return (
            <div className="justify-content-center card winewrapper">
                {wines}
            </div>
        )
}
 
const mapStateToProps = (state) =>({
    wines: state.wineData.wines,
    caseQuantity : state.calculations.singleProductCalculations.caseQuantity,
    caseTotals : state.calculations.singleProductCalculations.caseTotals,
    bottleTotals : state.calculations.singleProductCalculations.bottleTotals,
    bottleQuantity: state.calculations.singleProductCalculations.bottleQuantity,
    
})

export default connect(mapStateToProps, {fetchWines, amountsCalculations,addToCart})(Wines)
