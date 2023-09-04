import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listArticles } from '../actions/articleActions';
import { Link } from 'react-router-dom';

const ArticleListScreen = () => {
  const dispatch = useDispatch();


  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  useEffect(() => {

    dispatch(listArticles());
  }, [dispatch]);

  return (
    <div>
      <h1>Članci</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article._id} style={articleCardStyle}>
              <Link to={`/article/${article._id}`}>
                <h2>{article.title}</h2>
              </Link>
              <p style={articleContentStyle}>{article.content.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const articleCardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const articleContentStyle = {
  fontSize: '1rem',
  color: '#333',
};

export default ArticleListScreen;
