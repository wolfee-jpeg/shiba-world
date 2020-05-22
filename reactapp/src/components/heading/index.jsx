import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  heading: ({ variant }) => ({
    fontSize: variant === 'h1' ? '3rem' : '1.5rem',
    margin: '2rem 0 1rem'
  })
})

export default ({ children, variant }) => {
  const classes = useStyles({ variant })

  return (
    <Typography variant={variant} className={classes.heading}>
      {children}
    </Typography>
  )
}
