import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import * as routes from '../../routes'
import TagChip from '../tag-chip'
import * as tagList from '../../tags'

const useStyles = makeStyles({
  root: {
    width: 200,
    margin: '1rem',
    position: 'relative',
  },
  media: {
    height: 200
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  primaryTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '0.5rem'
  }
})

function truncateTextAndAddEllipsis(text) {
  return text.length >= 100 ? `${text.slice(0, 100)}...` : text
}

function getPrimaryTag(tags) {
  if (!tags) {
    return null
  }
  if (tags.includes(tagList.common.tutorial)) {
    return tagList.common.tutorial
  }
  const speciesValues = Object.values(tagList.species)
  const speciesTag = tags.filter(tagName => speciesValues.includes(tagName))
  if (speciesTag.length) {
    return speciesTag[0]
  }
  return null
}

export default function AssetItem({
  asset: { id, title, description, thumbnailUrl, tags },
  showPrimaryTag = false
}) {
  const classes = useStyles()
  const primaryTag = getPrimaryTag(tags)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={routes.viewAssetWithVar.replace(':assetId', id)}>
          {primaryTag && showPrimaryTag && (
            <div className={classes.primaryTag}>
              <TagChip tagName={getPrimaryTag(tags)} isFilled={false} />
            </div>
          )}
          <CardMedia
            className={classes.media}
            image={thumbnailUrl}
            title={`Thumbnail for ${title}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {truncateTextAndAddEllipsis(description)}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}
