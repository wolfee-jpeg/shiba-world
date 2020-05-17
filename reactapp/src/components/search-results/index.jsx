import React from 'react'
import { connect } from 'react-redux'
import useAlgoliaSearch, { Indexes } from '../../hooks/useAlgoliaSearch'
import useUserRecord from '../../hooks/useUserRecord'
import LoadingIndicator from '../loading-indicator'
import ErrorMessage from '../error-message'
import SearchResult from '../search-result'

const SearchResults = ({ searchTerm }) => {
  const [, , user] = useUserRecord()

  const [isLoading, isErrored, hits] = useAlgoliaSearch(
    Indexes.Assets,
    searchTerm,
    user && user.enabledAdultContent ? undefined : 'isAdult != 1'
  )

  if (isLoading || !hits) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return <ErrorMessage>Failed to perform search</ErrorMessage>
  }

  if (!hits.length) {
    return <p>No assets found matching your search term</p>
  }

  return (
    <>
      {hits.map(hit => (
        <SearchResult key={hit.objectID} hit={hit} />
      ))}
    </>
  )
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
