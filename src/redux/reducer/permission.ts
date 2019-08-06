import {
  SET_AUTH_STATUS
} from '../constants/ActionTypes'
import * as Cookies from 'js-cookie'

const initalState = {
  isAuthenticated: !!Cookies.get('token')
}

const authReducer = (state = initalState, action:any) => {
  switch (action.type) {
  case SET_AUTH_STATUS:
    return {
      ...state,
      isAuthenticated: action.status
    }
  default:
    return state
  }
}

export default authReducer