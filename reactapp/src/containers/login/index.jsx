import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as routes from '../../routes'
import LoginForm from '../../components/login-form'
import withRedirectOnAuth from '../../hocs/withRedirectOnAuth'
import { trackAction, actions } from '../../analytics'

const Login = ({ push }) => (
  <>
    <h1>Login or Sign Up</h1>
    <p>Enter your details below to login or create a new account.</p>
    <LoginForm
      onSuccess={auth => {
        trackAction(actions.LOGIN, {
          userId: auth.user ? auth.user.uid : 'unknown'
        })

        push(routes.home)
      }}
    />
    <p>
      You can read our <Link to={routes.privacyPolicy}>Privacy Policy</Link>{' '}
      here.
    </p>
  </>
)

export default connect(
  null,
  { push }
)(withRedirectOnAuth(Login))
