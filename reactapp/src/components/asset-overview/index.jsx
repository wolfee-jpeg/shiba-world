import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../../components/loading-indicator'
import ErrorMessage from '../../components/error-message'
import FormattedDate from '../formatted-date'
// import CommentList from '../comment-list'
// import AddCommentForm from '../add-comment-form'
// import VotesList from '../votes-list'
// import AddVoteForm from '../add-vote-form'
// import FeatureListButton from '../feature-list-button'
import * as routes from '../../routes'
import TagChip from '../tag-chip'
import useUserRecord from '../../hooks/useUserRecord'
import Heading from '../../components/heading'

const isUrlAnImage = url =>
  url.indexOf('png') >= 0 || url.indexOf('jpg') >= 0 || url.indexOf('jpeg') >= 0

const FileResultThumbnail = ({ url }) => {
  return (
    <img
      src={url}
      style={{ width: '100%', maxWidth: '500px' }}
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
  },
  notApprovedMessage: {
    marginBottom: '2rem',
    padding: '1rem'
  }
})

function NotApprovedMessage() {
  const classes = useStyles()
  return (
    <Paper className={classes.notApprovedMessage}>
      <strong>This asset has not been approved yet. It:</strong>
      <ul>
        <li>does not show up in search results</li>
        <li>is not visible to logged out users</li>
      </ul>
    </Paper>
  )
}

function filterOnlyNonImageUrl(url) {
  return !filterOnlyImagesUrl(url)
}

function filterOnlyImagesUrl(url) {
  return (
    url.includes('jpg') ||
    url.includes('png') ||
    url.includes('gif') ||
    url.includes('jpeg')
  )
}

export default ({ assetId, small = false }) => {
  const [isLoading, isErrored, result] = useDatabase('assets', assetId)
  const classes = useStyles()
  const [, , user] = useUserRecord()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (
    isErrored ||
    result === null ||
    (!user && result && result.isApproved === false)
  ) {
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
    isApproved,
    modifiedAt,
    modifiedBy
  } = result

  return (
    <>
      {isApproved === false && <NotApprovedMessage />}
      <img src={thumbnailUrl} height={300} alt="The thumbnail for the asset." />
      <Heading variant="h1">
        <Link to={routes.viewAssetWithVar.replace(':assetId', assetId)}>
          {title}
        </Link>
      </Heading>
      <div className={classes.description}>
        <Markdown source={description} />
      </div>
      <div>
        {tags
          ? tags.map(tagName => <TagChip key={tagName} tagName={tagName} />)
          : '(no tags)'}
      </div>
      <Heading variant="h2">Files</Heading>
      {fileUrls
        .filter(filterOnlyNonImageUrl)
        .filter(fileUrl => fileUrl !== thumbnailUrl)
        .map(fileUrl => (
          <FileResult key={fileUrl} url={fileUrl} />
        ))}

      <Heading variant="h2">Images</Heading>
      {fileUrls
        .filter(filterOnlyImagesUrl)
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
        ) : user && user.id === createdBy.id ? (
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
