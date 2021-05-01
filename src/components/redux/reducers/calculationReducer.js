import { CALCULATEAllTOTALS, SINGLE_WINE_CALCULATION } from '../actions/types'

const initialState = {
  priceTotals: '',
  singleProductCalculations: {}
}

// calculate the final output from the products added to cart
const calculationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATEAllTOTALS:
      return {
        ...state,
        priceTotals: action.payload
      }
    case SINGLE_WINE_CALCULATION:
      return {
        ...state,
        singleProductCalculations: action.payload
      }
    default:
      return state
  }
}

export default calculationReducer
