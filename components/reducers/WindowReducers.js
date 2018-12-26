import {combineReducers} from 'redux'
import * as reducers from './Reducers'

export default combineReducers({
    libraries: reducers.libraryReducers,
    selectedReducers: reducers.selectedReducers,
    events: reducers.events,
    venues: reducers.venues
})