import React from 'react'
import Button from '@material-ui/core/Button'

export default ({ children, onClick, ...props }) => (
  <Button variant="contained" color="primary" onClick={onClick} {...props}>
    {children}
  </Button>
)
