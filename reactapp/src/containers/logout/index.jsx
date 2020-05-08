import React, { useEffect } from 'react'
import { logout, loggedInUserId } from '../../firebase'
import * as routes from '../../routes'
import { trackAction, actions } from '../../analytics'

const Logout = ({ history: { push } }) => {
  useEffect(() => {
    const oldLoggedInUserId = loggedInUserId

    logout()

    trackAction(actions.LOGOUT, {
      userId: oldLoggedInUserId.uid
    })

    setTimeout(() => push(routes.home), 1500)
  }, [push])

  return <>You are now logged out. Redirecting you to homepage...</>
}

export default Logout
