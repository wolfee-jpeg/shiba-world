import React from 'react'
import SingleListView from '../single-list-view'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import { Typography } from '@material-ui/core'

const FeaturedList = () => {
  const [isFetching, isErrored, featuredList] = useDatabase(
    'special',
    'featuredList',
    null,
    false // disable refs
  )

  if (isFetching) {
    return <LoadingIndicator />
  }

  if (isErrored || !featuredList || !featuredList.list) {
    return 'Failed to get featured list!'
  }

  const {
    list: { id: listId }
  } = featuredList

  return (
    <>
      <Typography
        variant="h1"
        style={{ margin: '3rem 0', fontSize: '2rem', fontWeight: 'bold' }}>
        Featured List
      </Typography>
      <SingleListView listId={listId} small />
    </>
  )
}

export default FeaturedList
