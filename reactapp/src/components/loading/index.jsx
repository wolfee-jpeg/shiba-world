import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progress: {
    display: 'block',
    margin: '0 auto'
  }
}))

function LoadingIndicator() {
  const classes = useStyles()

  return (
    <>
      <CircularProgress className={classes.progress} color="secondary" />
    </>
  )
}

export default LoadingIndicator
