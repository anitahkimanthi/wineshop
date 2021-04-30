import React, { useState } from 'react';
import { withRouter } from "react-router";
import { fetchWines, addToCart, cartItemsCalculations } from "../redux/actions/actions";
import { connect } from "react-redux";

function Filter(props) {
    const [state, setState] = useState({
        bottleQuantity: 1,
        caseQuantity: 1,
        bottleTotals: 0,
        caseTotals: 0,
        index: 0,
        title: ""
    })

    const { imageUrl, wines, error } = props

    // redirect to the detail page
    const ShowDetails = (d) => {
        props.history.push(`/wines/?name=${d.name.toLowerCase()}`)

    }

    // on click of add to cart button, add to cart
    const handleAddToCart = (d) => {

        const { bottleQuantity, caseQuantity, bottleTotals, caseTotals } = state

        const userData = {
            bottleQuantity: bottleQuantity,
            caseTotals: caseTotals === 0 ? d.cost.case : caseTotals,
            caseQuantity: caseQuantity,
            bottleTotals: bottleTotals === 0 ? d.cost.bottle : bottleTotals,
        }

        props.addToCart(d, userData)
        props.cartItemsCalculations()

    }

    // handle user inputs and change state
    const handleBottleQuantityInput = (e) => {
        // set state on change of value
        const { value } = e.target

        // do the calculations as input change
        const bottlePrice = e.currentTarget.id

        const bottlePriceCalc = value * bottlePrice

        // convert to two decimals
        const price = parseFloat(bottlePriceCalc).toFixed(2)

        // setting values to state
        setState({
            ...state,
            bottleQuantity: value,
            bottleTotals: price,
        })
    }

    // handle user inputs and change state
    const handleCaseQuantityInput = (e) => {
        // set state on change of value
        const { value } = e.target

        // do the calculations as input change
        const casePrice = e.currentTarget.id

        const casePriceCalc = value * casePrice

        // convert to two decimals
        const price = parseFloat(casePriceCalc).toFixed(2)

        // setting the values to state
        setState({
            ...state,
            caseQuantity: value,
            caseTotals: price
        })
    }

    const handleClick = (index, title) => {
        setState({
            ...state,
            index: index,
            title: title,
        })
    }

    // defining the cases of the clicked item to defferentiate between the case and bottles quantities
    const casetitle = "case"

    if (wines) {

        const query = new URLSearchParams(props.location.search)

        const searchKeyWord = query.get("tag").toString()

        const filteredData = wines.filter(w => w.tags.some(t => t.toLowerCase() === searchKeyWord))

        if (filteredData.length !== 0) {
            const products = filteredData.map((d, i) =>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper" key={i}>
                    <div className="no-gutters row cardcontent">
                        <div className="col-lg-5 wineImage">
                            <img src={imageUrl + d.image} alt={d.name} className="img-fluid" />
                        </div>

                        <div className="col-lg-7">
                            <div className="card-body content">
                                <h5 className="card-title row">
                                    <b className="col-12">
                                        <span className="number">{d.no}</span>
                                        <br />
                                        <span className="name">{d.name}</span>
                                    </b>
                                </h5>
                                <br />
                                <div className="card-text row">
                                    <div className="bottles col-6">
                                        <h6><b>Bottles</b></h6>

                                        {state.index === i ?
                                            <p>
                                                {state.bottleQuantity === 1 ? <span>$ {d.cost.bottle.toFixed(2)}</span>
                                                    :
                                                    <span>$ {state.bottleTotals}</span>
                                                }

                                            </p>
                                            :
                                            <p>
                                                {d.cost.bottle.toFixed(2)}
                                            </p>
                                        }

                                        <input
                                            id={d.cost.bottle}
                                            type="number"
                                            name="bottleQuantity"
                                            onChange={handleBottleQuantityInput}
                                            onClick={(e) => handleClick(i)}
                                        />
                                        <span className="quantity">QTY</span>
                                    </div>
                                    <div className="case col-6">
                                        <h6><b>Case</b></h6>
                                        {state.title === "case" && state.index === i ?
                                            <p>
                                                <span> $ {state.caseTotals}</span>
                                            </p>
                                            :
                                            <p>
                                                <span> $ {d.cost.case.toFixed(2)}</span>
                                            </p>
                                        }
                                        <input
                                            id={d.cost.case}
                                            type="number"
                                            name="caseQuantity"
                                            onChange={handleCaseQuantityInput}
                                            onClick={(e) => handleClick(i, casetitle)}
                                        />
                                        <span className="quantity">QTY</span>
                                    </div>
                                </div>

                                <div className="cta">
                                    <button className="details" onClick={() => ShowDetails(d)}>Details</button>
                                    <button className="addtocart" onClick={() => handleAddToCart(d)}>Add to cart</button>
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
        }
        return (
            <div className="row winewrapper allwines">
                <div className="col-12 text-center">
                    No result, choose another category
                </div>
            </div>
        )
    }

    return (
        <div className="row winewrapper error">
            <div className="col-12 text-center">{error} </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    wines: state.wineData.allWines,
    error: state.wineData.error,
    imageUrl: state.wineData.imageUrl,

})

export default withRouter(connect(mapStateToProps, { fetchWines, addToCart, cartItemsCalculations })(Filter))
