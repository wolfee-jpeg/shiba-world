import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import firebase from 'firebase/app'
// import * as Sentry from '@sentry/browser'
import { loggedInUserId } from './firebase'
import ReactReduxFirebaseProvider from 'react-redux-firebase/lib/ReactReduxFirebaseProvider'
import store, { history } from './store'
import App from './containers/app'
import { trackAction, actions } from './analytics'
// import { inDevelopment } from './environment'
import { changeSearchTerm } from './modules/app'

import 'sanitize.css/sanitize.css'
import './assets/css/theme.css'
import './assets/css/mana.min.css'

// if (!inDevelopment()) {
//   Sentry.init({
//     dsn: 'https://eefc3e7e553546a0bf725a90f3048ae9@sentry.io/1509721'
//   })
// }

history.listen(location => {
  trackAction(actions.NAVIGATE, {
    location,
    userId: loggedInUserId ? loggedInUserId.uid : null
  })

  store.dispatch(changeSearchTerm())
})

const target = document.querySelector('#root')

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </ConnectedRouter>
  </Provider>,
  target
)
