import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listArticles, deleteArticle } from '../actions/articleActions';
import { Link } from 'react-router-dom';

const AdminArticleListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, articles, error } = articleList;

  const articleDelete = useSelector((state) => state.articleDelete);
  const { success: deleteSuccess } = articleDelete;

  useEffect(() => {
    dispatch(listArticles());
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <div>
      <h2>Admin lista članaka</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Autor</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.author.name}</td>
                <td>
                  <Link to={`/admin/articles/${article._id}/edit`} className="btn btn-primary">
                    Uredi
                  </Link>
                  <button
                    onClick={() => deleteHandler(article._id)}
                    className="btn btn-danger ml-2"
                  >
                    Izbriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminArticleListScreen;
