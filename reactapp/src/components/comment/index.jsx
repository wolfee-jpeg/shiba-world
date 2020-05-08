import React from 'react'
import FormattedDate from '../formatted-date'

const Comment = ({ listId, comment, createdBy, createdAt }) => (
  <div>
    {comment}
    <br />
    Comment <FormattedDate date={createdAt} /> by {createdBy.username}
  </div>
)

export default Comment
