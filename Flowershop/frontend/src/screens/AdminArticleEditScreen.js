import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails, updateArticle } from '../actions/articleActions';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AdminArticleEditScreen = () => {
  const { id } = useParams(); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  console.log(id)

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, article, error } = articleDetails;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const { success: updateSuccess, error: updateError } = articleUpdate;
  const navigate = useNavigate();


  useEffect(() => {
    if (updateSuccess) {
    } else {
      if (!article || article._id !== id) {
        dispatch(getArticleDetails(id));
      } else {
        setTitle((prevTitle) => article.title);
        setContent((prevContent) => article.content);
  
        console.log('ID:', id);
        console.log('Title:', title);
        console.log('Content:', content);
      }
    }
  }, [dispatch, id, article, updateSuccess]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateArticle(id, { title, content }));
    navigate('/admin/articles');
  };

  return (
    <div>
      <h2>Uredi članak</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Naslov</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sadržaj</label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ažuriraj članak
          </button>
          <Link to="/admin/articles" className="btn btn-secondary ml-2">
            Natrag
          </Link>
        </form>
      )}
    </div>
  );
};

export default AdminArticleEditScreen;
