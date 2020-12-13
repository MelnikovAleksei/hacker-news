import React from 'react';

export const ArticleParagraph = ({ children, isLoadingData, text }) => {

  return (
    <p>
      {isLoadingData ?
        'Loading...'
      :
      text}
      {children}
    </p>
  )
}
