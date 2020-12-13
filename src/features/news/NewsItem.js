import React from 'react';

import { Article } from './Article';

export const NewsItem = ({ id }) => {
  return (
    <li>
      <Article id={id}/>
    </li>
  )
}
