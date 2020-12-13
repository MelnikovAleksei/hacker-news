import React from 'react';

import { Link } from 'react-router-dom';

import { api } from '../../utils/api/api';

import { secToString } from '../../utils/secToString';

import { ArticleParagraph } from './ArticleParagraph';
import { ArticleAddress } from './ArticleAddress';
import { ArticleLink } from './ArticleLink';
import { CommentsList } from './CommentsList';
import { UpdateNewsButton } from './UpdateNewsButton';

export const SingleNewsPage = ({ match }) => {
  const { newsId } = match.params;
  const [articleData, setArticleData] = React.useState({});
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const fetchData = React.useCallback(() => {
    setIsLoadingData(true);
    api.getItemById(newsId)
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
  }, [newsId])

  React.useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleUpdateNews = () => {
    fetchData();
  }

  return (
    <section>
      <UpdateNewsButton
        text="Update news"
        isLoading={isLoadingData}
        onClick={handleUpdateNews}
      />
      <article>
        <header>
          <h3>
            {articleData.title}
          </h3>
          <ArticleLink
            url={articleData.url}
            text="Link to news"
          />
        </header>
        <ArticleParagraph
          isLoadingData={isLoadingData}
          text="Date: "
        >
          <time>{isLoadingData ? 'Loading...' : secToString(articleData.time)}</time>
        </ArticleParagraph>
        <ArticleAddress
          isLoadingData={isLoadingData}
          text={`By: ${articleData.by}`}
        />
        <ArticleParagraph
          isLoadingData={isLoadingData}
          text={articleData.kids && articleData.descendants }
        >
          {` comment('s)`}
        </ArticleParagraph>
        <Link to="/">Back to news list</Link>
        {articleData.kids &&
          <CommentsList data={articleData.kids}/>
        }
      </article>
    </section>
  )
}
