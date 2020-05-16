import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1rem',
    textAlign: 'center'
  }
}))

export const types = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'successs'
}

export default ({ children, type = type.INFO }) => {
  const classes = useStyles()
  return <Paper className={classes.paper}>{children}</Paper>
}
