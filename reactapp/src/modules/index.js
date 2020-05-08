import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import counter from './counter'
import app from './app'
import { reducer as editorReducer } from './editor'

export default combineReducers({
  counter,
  app,
  editor: editorReducer,
  firebase: firebaseReducer
})
