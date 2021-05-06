import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import {
  fetchWines,
  addToCart,
  cartItemsCalculations
} from '../redux/actions/actions'
import { connect } from 'react-redux'
import FilterByPrice from './filterbyprice'

function Wines (props) {
  const [state, setState] = useState({
    bottleQuantity: 1,
    caseQuantity: 1,
    bottleTotals: 0,
    caseTotals: 0,
    index: 0,
    max_price: "",
    min_price: "",
    title: ''
  })

  const { imageUrl, wines, error, fetchWines } = props
  const query = new URLSearchParams(props.location.search)

  useEffect(() => {
    fetchWines()
    const highprice = query.get('max_price')
    const lowprice = query.get('min_price')

    // set the price to state
    setState({
      ...state,
      max_price: highprice,
      min_price: lowprice
    })
  }, [fetchWines, props.location.search])

  // allow typing
  const handleInput = e => {
    const { value, name } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  // onclick search button or enter go to filter by price component and show the product
  const handleSearch = (e) => {
    e.preventDefault();
    
    const { min_price, max_price } = state
    const low = min_price === null ? 0 : min_price
    const high = max_price === null ? 0 : max_price

    props.history.push(`/price/?min_price=${low}&max_price=${high}`)
  }
  // redirect to the detail page
  const ShowDetails = d => {
    props.history.push(`/wines/?name=${d.name.toLowerCase()}`)
  }

  // on click of add to cart button, add to cart
  const handleAddToCart = d => {
    const { bottleQuantity, caseQuantity, bottleTotals, caseTotals } = state

    const userData = {
      bottleQuantity: bottleQuantity,
      caseTotals: caseTotals === 0 ? d.cost.case : caseTotals,
      caseQuantity: caseQuantity,
      bottleTotals: bottleTotals === 0 ? d.cost.bottle : bottleTotals
    }

    props.addToCart(d, userData)
    props.cartItemsCalculations()
  }

  // handle user inputs and change state
  const handleBottleQuantityInput = e => {
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
      bottleTotals: price
    })
  }

  // handle user inputs and change state
  const handleCaseQuantityInput = e => {
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
      title: title
    })
  }

  // defining the cases of the clicked item to defferentiate between the case and bottles quantities
  const casetitle = 'case'

  const {bottleTotals, caseTotals, bottleQuantity, caseQuantity} = state

  if (error === '' && wines) {
    const winesData = wines.map((d, i) => (
      <div className='col-12 col-sm-6 col-md-6 col-lg-4 cardwrapper' key={i}>
        <div className='no-gutters row cardcontent'>
          <div className='col-3 col-lg-4 wineImage'>
            <img src={imageUrl + d.image} alt={d.name} className='img-fluid' />
          </div>

          <div className='col-9 col-sm-8 col-lg-7'>
            <div className='card-body content'>
              <h5 className='card-title row'>
                <b className='col-12'>
                  <span className='number'>{d.no}</span>
                  <br />
                  <span className='name'>{d.name}</span>
                </b>
              </h5>
              <br />
              <div className='card-text row'>
                <div className='bottles col-6'>
                  <h6>
                    <b>Bottles</b>
                  </h6>

                  {state.index === i ? (
                    <p>
                      {bottleQuantity === 1 ? (
                        <span>$ {d.cost.bottle.toFixed(2)}</span>
                      ) : (
                        <span>$ {bottleTotals}</span>
                      )}
                    </p>
                  ) : (
                    <p>$ {d.cost.bottle.toFixed(2)}</p>
                  )}

                  <input
                    id={d.cost.bottle}
                    type='number'
                    name='bottleQuantity'
                    onChange={handleBottleQuantityInput}
                    onClick={e => handleClick(i)}
                  />
                  <span className='quantity'>QTY</span>
                </div>
                <div className='case col-6'>
                  <h6>
                    <b>Case</b>
                  </h6>
                  {state.title === 'case' && state.index === i ? (
                    <p>
                      {caseQuantity === 1 ? (
                        <span>$ {d.cost.case.toFixed(2)}</span>
                      ) : (
                        <span>$ {caseTotals}</span>
                      )}
                    </p>
                  ) : (
                    <p>
                      <span> $ {d.cost.case.toFixed(2)}</span>
                    </p>
                  )}
                  <input
                    id={d.cost.case}
                    type='number'
                    name='caseQuantity'
                    onChange={handleCaseQuantityInput}
                    onClick={e => handleClick(i, casetitle)}
                  />
                  <span className='quantity'>QTY</span>
                </div>
              </div>

              <div className='cta'>
                <button className='details' onClick={() => ShowDetails(d)}>
                  Details
                </button>
                <button
                  className='addtocart'
                  onClick={() => handleAddToCart(d)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
    return (
      <div className='row winewrapper allwines'>
        {query.has('price') || query.has('max_price') ? (
          <div className='col-12'>
            <form className='pricerange' onSubmit={handleSearch}>
              <label>Min price</label>
              <input
                type='number'
                name='min_price'
                placeholder='Enter price'
                value={state.min_price}
                onChange={handleInput}
              />
              <label>Max price</label>
              <input
                type='number'
                name='max_price'
                placeholder='Enter price'
                value={state.max_price}
                onChange={handleInput}
              />
              <input type='submit' value='Search' className='send' />
            </form>
          </div>
        ) : (
          ''
        )}
        {query.has('max_price') ? <FilterByPrice/> : winesData}
      </div>
    )
  }
  return (
    <div className='row card winewrapper'>
      <span className='span'>{props.error}</span>
    </div>
  )
}

const mapStateToProps = state => ({
  wines: state.wineData.allWines,
  error: state.wineData.error,
  imageUrl: state.wineData.imageUrl
})

export default withRouter(
  connect(mapStateToProps, { fetchWines, addToCart, cartItemsCalculations })(
    Wines
  )
)
