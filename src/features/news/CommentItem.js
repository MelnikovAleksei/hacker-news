import React from 'react';

import { CommentsList } from './CommentsList';

import { api } from '../../utils/api/api';

import parse from 'html-react-parser';
import { decodeEntities } from '../../utils/decodeEntities';
import { secToString } from '../../utils/secToString';

export const CommentItem = ({ data }) => {
  const [commentData, setCommentData] = React.useState({});
  const [commentsListMarkup, setCommentsListMarkup] = React.useState(null);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingData(true);
    api.getItemById(data)
      .then(
        (data) => {
          setCommentData(data);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingData(false);
      })
  }, [data])

  const handleClickLoadNestedComments = () => {
    const markup = (
      <CommentsList data={commentData.kids}/>
    )
    setCommentsListMarkup(markup)
  }

  const commentsItem = {
    paddingTop: 5,
    paddingBottom: 5
  };

  return (
    commentData.deleted ?
      <li style={commentsItem}>Comment has been deleted</li>
    :
      <li style={commentsItem}>
        {isLoadingData && <p>Loading...</p>}
        {commentData.kids && (
          <p>{commentData.kids.length} nested comment('s)</p>
        )}
        <address>by: {isLoadingData ? 'Loading...' : commentData.by}</address>
        <p>Date: <time>{isLoadingData ? 'Loading...' : secToString(commentData.time)}</time></p>
        <h4>Comment text:</h4>
        {isLoadingData ? <p>Loading...</p> : parse(decodeEntities(commentData.text))}
        {commentData.kids ?
          <button
            type="button"
            onClick={handleClickLoadNestedComments}
            disabled={!commentData.kids}
          >
            Load nested comments
          </button>
        :
          null
        }
        {commentsListMarkup}
      </li>
  )
}
