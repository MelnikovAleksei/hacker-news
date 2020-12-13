import React from 'react'

import { CommentItem } from './CommentItem';

export const CommentsList = ({ data }) => {
  const commentsList = {
    paddingTop: 20,
    paddingBottom: 20
  };
  return (
    <ul
      style={commentsList}
    >
      {data.map(id => (
        <CommentItem key={id} data={id}/>
      ))}
    </ul>
  )
}
