import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import RecentAssets from '../../components/recent-assets'

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import * as routes from '../../routes'

import shibaInuImageUrl from '../../assets/images/species/shiba_inu.jpg'
import avaliImageUrl from '../../assets/images/species/avali.png'
import bestBoiImageUrl from '../../assets/images/species/best_boi.png'
import sergalImageUrl from '../../assets/images/species/sergal.png'
import rexouiumImageUrl from '../../assets/images/species/rexouium.png'
import kangarooImageUrl from '../../assets/images/species/kangaroo.png'
import racoonImageUrl from '../../assets/images/species/racoon.png'
import otherSpeciesImageUrl from '../../assets/images/species/other-species.png'

const useSpeciesStyles = makeStyles(theme => ({
  root: {
    width: 250,
    margin: '0.5rem'
  },
  media: {
    height: 250
  }
}))

const Species = ({ name, title, description, imageUrl }) => {
  const classes = useSpeciesStyles()
  const url = routes.browseWithVar.replace(':tagName', name)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={url}>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={`Thumbnail for ${name}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={url}>Browse</Link>
        </Button>
      </CardActions>
    </Card>
  )
}

console.log(shibaInuImageUrl)

const SpeciesBrowser = () => (
  <>
    <h2>Species</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Species
        name="shiba"
        title="Pikapetey Shiba"
        description="Cute fucks"
        imageUrl={shibaInuImageUrl}
      />
      <Species
        name="avali"
        title="Aioli"
        description="Space chicken"
        imageUrl={avaliImageUrl}
      />
      <Species
        name="bestboi"
        title="Best Boi"
        description="The best of the bois"
        imageUrl={bestBoiImageUrl}
      />
      <Species
        name="sergal"
        title="Sergal"
        description="Wedge of cheese"
        imageUrl={sergalImageUrl}
      />
      <Species
        name="rexouium"
        title="T-Rex"
        description="King caretakers of my butt"
        imageUrl={rexouiumImageUrl}
      />
      <Species
        name="kangaroo"
        title="Kanga"
        description="I like their pouches UwU"
        imageUrl={kangarooImageUrl}
      />
      <Species
        name="racoon"
        title="Racoon"
        description="Trash pandas"
        imageUrl={racoonImageUrl}
      />
      <Species
        name="other"
        title="Other species"
        description="The other species that some people use"
        imageUrl={otherSpeciesImageUrl}
      />
    </div>
  </>
)

const useViewStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: '1rem'
  }
}))

const Home = ({ searchTerm }) => {
  const classes = useViewStyles()

  return (
    <>
      {!searchTerm && (
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Welcome to VRC Arena
          </Typography>
          <Typography component="p" style={{ marginTop: '0.5rem' }}>
            A repository of assets for the different species of the online
            multiplayer social game VRChat. Get started by selecting your
            favorite species below.
          </Typography>
        </Paper>
      )}
      {!searchTerm && <SpeciesBrowser />}
      {!searchTerm && <RecentAssets />}
    </>
  )
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(Home)
