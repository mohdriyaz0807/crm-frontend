import {createStore , applyMiddleware ,combineReducers} from 'redux'
import {logger} from 'redux-logger'

import userReducer from './User/user-reduder'
const store =  createStore(rootReducer , applyMiddleware(logger) )


export default combineReducers({
    user : userReducer
})