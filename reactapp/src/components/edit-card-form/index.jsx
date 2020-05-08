import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Paper, Grid } from '@material-ui/core'
import CardImage from '../card-image'
import useScryfall from '../../hooks/useScryfall'

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  }
})

const SingleCardForm = ({
  scryfallCardId,
  cardName,
  imageUrl,
  ranking,
  reason,
  onChangeCardDetail,
  onRemoveCard
}) => {
  const [searchScryfallCardId, setSearchScryfallCardId] = useState('')
  const classes = useStyles()

  const [isFetching, isErrored, responseJson] = useScryfall(
    searchScryfallCardId
  )

  if (responseJson.image_uris) {
    if (responseJson.image_uris.normal !== imageUrl) {
      onChangeCardDetail('imageUrl', responseJson.image_uris.normal)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.root}>
        <Grid item xs={4}>
          <figure className="card-wrapper text-center" align="center">
            <CardImage imageUrl={imageUrl} />
          </figure>
        </Grid>
        <Grid item xs={8}>
          <strong>{cardName}</strong>
          <br />
          <br />
          <TextField
            label="Card ranking"
            type="number"
            min={1}
            max={10}
            value={ranking || ''}
            onChange={event =>
              onChangeCardDetail('ranking', event.target.value)
            }
          />
          <br />
          <br />
          <TextField
            label="Reason for ranking"
            type="text"
            value={reason || ''}
            onChange={event => onChangeCardDetail('reason', event.target.value)}
            fullWidth
            multiline
            placeholder="Why did you rank the card that number?"
          />
          <br />
          <Button onClick={() => onRemoveCard({ scryfallCardId })}>
            Delete
          </Button>
          <Button onClick={() => setSearchScryfallCardId(scryfallCardId)}>
            Refresh Image
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SingleCardForm
