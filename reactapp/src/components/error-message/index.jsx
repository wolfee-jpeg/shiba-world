import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  paper: {
    padding: '0.5rem'
  }
}))

export default ({ children }) => {
  const classes = useStyles()
  return <Paper className={classes.paper}>{children}</Paper>
}
