import React from 'react';

import { NewsItem } from './NewsItem';

export const NewsList = ({ data }) => {
  const [newsItems, setNewsItems] = React.useState(null);

  React.useEffect(() => {
    const markup = data.map(id => (
      <NewsItem key={id} id={id}/>
    ))
    setNewsItems(markup);
  }, [data])

  return (
    <ul>
      {newsItems}
    </ul>
  )
}
