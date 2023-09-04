import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArticleDetails } from '../actions/articleActions';

const ArticleDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();


  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  useEffect(() => {

    dispatch(getArticleDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailsScreen;
