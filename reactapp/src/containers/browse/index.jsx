import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Markdown from 'react-markdown'
import useDatabase from '../../hooks/useDatabase'
import LoadingIcon from '../../components/loading'
import AssetResults from '../../components/asset-results'
import speciesMeta from './species-meta'

// function firstLetterUppercase(text) {
//   return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`
// }

const useStyles = makeStyles({
  root: {
    padding: '1rem'
  }
})

function Title({ tagName }) {
  return <h1>{tagName ? speciesMeta[tagName].name : 'All'}</h1>
}

function Description({ tagName }) {
  const classes = useStyles()
  if (!tagName in speciesMeta) {
    return null
  }
  return (
    <Paper className={classes.root}>
      <Markdown>{speciesMeta[tagName].description}</Markdown>
    </Paper>
  )
}

export default ({
  match: {
    params: { tagName }
  }
}) => {
  const [isLoading, isErrored, results] = useDatabase(
    'assets',
    null,
    tagName
      ? {
          field: 'tags',
          operator: 'array-contains',
          value: tagName
        }
      : null
  )

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored) {
    return 'Error!'
  }

  return (
    <>
      <Title tagName={tagName} />
      <Description tagName={tagName} />
      <h2>Browse Assets</h2>
      {!results || !results.length ? (
        'No results'
      ) : (
        <AssetResults assets={results} />
      )}
    </>
  )
}
