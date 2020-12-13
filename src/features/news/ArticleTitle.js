import React from 'react';

export const ArticleTitle = ({ isLoadingData, title }) => {
  return (
    <h3>
      {isLoadingData ? 'Loading...' : title}
    </h3>
  )
}
