import React from 'react'
import { connect } from 'react-redux'
import AssetResults from '../asset-results'
import useDatabaseSearch from '../../hooks/useDatabaseSearch'
import LoadingIndicator from '../../components/loading-indicator'

const SearchResults = ({ searchTerm }) => {
  const [isLoading, isErrored, results] = useDatabaseSearch('assets', [
    {
      fieldName: 'tags',
      operator: 'array-contains',
      value: searchTerm
    }
  ])

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return 'Error'
  }

  const searchTermChunks = searchTerm.split(' ')

  // firebase doesn't let us do multiple array-contains so we must filter it ourselves
  const filteredResults = results.filter(({ tags }) =>
    searchTermChunks.every(chunk => tags.includes(chunk))
  )

  if (!filteredResults.length) {
    return <p>No assets found matching your search term</p>
  }

  return <AssetResults assets={filteredResults} />
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
