import React from 'react'
import moment from 'moment'

const FormattedDate = ({ date, isRelative = true }) => (
  <span title={moment(date).toString()}>
    {isRelative ? moment(date).fromNow() : moment(date).toString()}
  </span>
)

export default FormattedDate
