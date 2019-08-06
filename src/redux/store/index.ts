import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import reducer from '../reducer'
// import api from '../api'

const middleware = [thunk.withExtraArgument({})]
const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(...middleware) :
  composeWithDevTools(applyMiddleware(...middleware, createLogger({ collapsed: true })))

export default (preloadedState = {}) => {
  const store = createStore(
    reducer,
    preloadedState,
    enhancer
  )
  return store
}