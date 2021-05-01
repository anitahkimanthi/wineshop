import { CHECKOUTREQUIREMENTS } from '../actions/types'

const initialState = {
  userInfo: {}
}

// on checkout require user to enter personal information
const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUTREQUIREMENTS:
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state
  }
}

export default UserInfoReducer
