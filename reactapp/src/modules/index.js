import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { connectRouter } from 'connected-react-router'
import counter from './counter'
import app from './app'
import { reducer as editorReducer } from './editor'

export default history =>
  combineReducers({
    counter,
    app,
    editor: editorReducer,
    firebase: firebaseReducer,
    router: connectRouter(history)
  })
