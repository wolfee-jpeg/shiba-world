import React from 'react'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import * as routes from '../../routes'

const useStyles = makeStyles({
  chip: { marginRight: '0.25rem', cursor: 'pointer' }
})

export default ({ tagName }) => {
  const classes = useStyles()
  return (
    <Link to={routes.browseWithVar.replace(':tagName', tagName)}>
      <Chip className={classes.chip} label={tagName} color="primary" />
    </Link>
  )
}
