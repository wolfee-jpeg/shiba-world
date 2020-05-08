import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import withAuthProfile from '../../hocs/withAuthProfile'
import * as routes from '../../routes'

const PageFooter = ({ auth }) => {
  const useStyles = makeStyles({
    footer: {
      margin: '3rem 0 0 0',
      padding: '1rem 2rem',
      fontSize: '16px'
    }
  })

  const classes = useStyles()

  return (
    <footer className={classes.footer} align="right" color="">
      {!auth.isLoaded
        ? null
        : auth.uid
        ? `You are logged in`
        : 'You are not logged in'}
      <br />
      <Link to={routes.admin}>&copy;</Link> &ndash;{' '}
      <Link to={routes.privacyPolicy}>Privacy Policy</Link>
    </footer>
  )
}

export default withAuthProfile(PageFooter)
