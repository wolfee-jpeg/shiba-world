import React from 'react'
import { connect } from 'react-redux'
import AssetResults from '../asset-results'
import useDatabaseSearch from '../../hooks/useDatabaseSearch'

const SearchResults = ({ searchTerm }) => {
  if (!searchTerm) return null

  const [isLoading, isErrored, results] = useDatabaseSearch(
    'assets',
    'tags',
    'array-contains',
    searchTerm
  )

  if (isLoading || isErrored) return null

  if (!results.length) {
    return <p>No assets found matching your search term</p>
  }

  return <AssetResults assets={results} />
}

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(SearchResults)
