import React from 'react'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import AccountSummary from '../../components/account-summary'

const MyAccount = () => (
  <>
    <h1>Your account</h1>
    <hr />
    <AccountSummary />
  </>
)

export default withRedirectOnNotAuth(MyAccount)
