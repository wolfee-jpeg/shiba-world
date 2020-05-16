import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Message from '../message'

const useStyles = makeStyles(() => ({
  progress: {
    display: 'block',
    margin: '0 auto'
  }
}))

function LoadingIndicator({ message = '' }) {
  const classes = useStyles()
  return (
    <>
      <CircularProgress className={classes.progress} color="secondary" />
      {message && <Message>{message}</Message>}
    </>
  )
}

export default LoadingIndicator
