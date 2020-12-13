import React from 'react';

import { ArticleTitle } from './ArticleTitle';
import { ArticleParagraph } from './ArticleParagraph';
import { ArticleAddress } from './ArticleAddress';

import { Link } from 'react-router-dom';

import { api } from '../../utils/api/api';

import { secToString } from '../../utils/secToString';

export const Article = ({ children, id }) => {
  const [articleData, setArticleData] = React.useState({});
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingData(true);
    api.getItemById(id)
      .then(
        (data) => {
          setArticleData(data);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoadingData(false);
      })
  }, [id])

  return (
    <article>
      <header>
        <ArticleTitle
          isLoadingData={isLoadingData}
          title={articleData.title}
        />
      </header>
      <ArticleParagraph
        isLoadingData={isLoadingData}
        text={`The story's score: ${articleData.score}`}
      />
      <footer>
        <ArticleAddress
          isLoadingData={isLoadingData}
          text={`By: ${articleData.by}`}
        />
        <ArticleParagraph
          isLoadingData={isLoadingData}
          text="Date: "
        >
          <time>{isLoadingData ? 'Loading...' : secToString(articleData.time)}</time>
        </ArticleParagraph>
        {isLoadingData ?
          null
        :
          <Link to={`/news/${articleData.id}`}>Go to this news</Link>
        }
        {children}
      </footer>
    </article>
  )
}
