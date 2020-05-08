import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import RecentAssets from '../../components/recent-assets'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const Home = ({ searchTerm }) => {
  const classes = useStyles()

  return (
    <>
      {!searchTerm && (
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Welcome to VRC Assets
          </Typography>
          <Typography component="p" style={{ marginTop: '0.5rem' }}>
            Start by searching for keywords above.
          </Typography>
        </Paper>
      )}
      {!searchTerm && <RecentAssets />}
    </>
  )
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(Home)
