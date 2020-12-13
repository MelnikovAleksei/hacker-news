import React from 'react';

export const ArticleAddress = ({ isLoadingData, text }) => {
  return (
    <address>
      {isLoadingData ?
        'Loading...'
      :
        text}
    </address>
  )
}
