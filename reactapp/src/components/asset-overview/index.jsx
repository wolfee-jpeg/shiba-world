import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../../components/loading-indicator'
import ErrorMessage from '../../components/error-message'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import FormattedDate from '../formatted-date'
// import CommentList from '../comment-list'
// import AddCommentForm from '../add-comment-form'
// import VotesList from '../votes-list'
// import AddVoteForm from '../add-vote-form'
// import FeatureListButton from '../feature-list-button'
import * as routes from '../../routes'
import withAuthProfile from '../../hocs/withAuthProfile'
import TagChip from '../tag-chip'

const isUrlAnImage = url =>
  url.indexOf('png') >= 0 || url.indexOf('jpg') >= 0 || url.indexOf('jpeg') >= 0

const FileResultThumbnail = ({ url }) => {
  return (
    <img
      src={url}
      style={{ width: '100%', maxWidth: '500px', maxHeight: '500px' }}
      alt="Thumbnail for file"
    />
  )
}

const getFilenameFromUrl = url =>
  url
    .replace('%2F', '/')
    .split('/')
    .pop()
    .split('?')
    .shift()
    .replace(/%20/g, ' ')
    .split('___')
    .pop()

const FileResult = ({ url }) => (
  <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
    {getFilenameFromUrl(url)}
    <br />
    {isUrlAnImage(url) ? (
      <FileResultThumbnail url={url} />
    ) : (
      <Button>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      </Button>
    )}
  </Paper>
)

const useStyles = makeStyles({
  description: {
    fontSize: '90%',
    margin: '1rem 0',
    '& A': { textDecoration: 'underline' }
  }
})

const SingleListView = ({ assetId, auth, small = false }) => {
  const [isLoading, isErrored, result] = useDatabase('assets', assetId)
  const classes = useStyles()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored || result === null) {
    return <ErrorMessage>Failed to load asset</ErrorMessage>
  }

  const {
    title,
    description,
    createdAt,
    createdBy,
    tags,
    fileUrls,
    thumbnailUrl,
    modifiedAt,
    modifiedBy
  } = result

  return (
    <>
      <img src={thumbnailUrl} height={300} alt="The thumbnail for the asset." />
      <Typography
        variant="h1"
        style={{ fontSize: small ? '1.5rem' : '3rem', marginTop: '2rem' }}>
        <Link to={routes.viewAssetWithVar.replace(':assetId', assetId)}>
          {title}
        </Link>
      </Typography>
      <div className={classes.description}>
        <Markdown source={description} />
      </div>
      <div>
        {tags
          ? tags.map(tagName => <TagChip key={tagName} tagName={tagName} />)
          : '(no tags)'}
      </div>
      <Typography variant="h2" style={{ fontSize: '2rem', margin: '2rem 0' }}>
        Files
      </Typography>
      {fileUrls
        .filter(fileUrl => fileUrl !== thumbnailUrl)
        .map(fileUrl => (
          <FileResult key={fileUrl} url={fileUrl} />
        ))}
      <br />
      <div>
        {small ? (
          <Link to={`/assets/${assetId}`}>
            <Button color="primary">View Asset</Button>
          </Link>
        ) : auth && auth.uid === createdBy.id ? (
          <Link to={`/assets/${assetId}/edit`}>
            <Button color="primary">Edit Asset</Button>
          </Link>
        ) : null}
      </div>
      <Typography component="p" style={{ margin: '1rem 0' }}>
        Created {createdAt ? <FormattedDate date={createdAt} /> : '(unknown)'}{' '}
        by {createdBy ? createdBy.username : '(unknown)'}
      </Typography>
      {modifiedBy && (
        <Typography component="p" style={{ margin: '1rem 0' }}>
          Last modified <FormattedDate date={modifiedAt} /> by{' '}
          {modifiedBy ? modifiedBy.username : '(unknown)'}
        </Typography>
      )}
      {/* {!small && (
        <>
          <FeatureListButton assetId={assetId} />
          <Grid container>
            <Grid item xs={6}>
              <h2>Comments</h2>
              <CommentList assetId={assetId} />
              <h3>Add Comment</h3>
              <AddCommentForm assetId={assetId} />
            </Grid>
            <Grid item xs={6}>
              <h2>Votes</h2>
              <VotesList assetId={assetId} />
              <h3>Add Vote</h3>
              <AddVoteForm assetId={assetId} />
            </Grid>
          </Grid>
        </>
      )} */}
    </>
  )
}

export default withAuthProfile(SingleListView)
