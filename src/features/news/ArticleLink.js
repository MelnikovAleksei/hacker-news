import React from 'react';

export const ArticleLink = ({ url, text }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}
