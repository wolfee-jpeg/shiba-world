import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as routes from '../../routes'
import LoginForm from '../../components/login-form'
import withRedirectOnAuth from '../../hocs/withRedirectOnAuth'
import { trackAction, actions } from '../../analytics'
import Heading from '../../components/heading'

const Login = ({ push }) => (
  <>
    <Heading variant="h1">Sign Up</Heading>
    <p>Enter your details below to create a new account.</p>
    <LoginForm
      onSuccess={auth => {
        trackAction(actions.SIGNUP, {
          userId: auth.user ? auth.user.uid : 'unknown'
        })

        push(routes.myAccount)
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
