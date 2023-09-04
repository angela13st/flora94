import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleCreateScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const authorId = userInfo ? userInfo._id : null;
    console.log(authorId)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/articles', { title, content, author: authorId });

      if (response.status === 201) {
        const newArticleId = response.data._id;
        navigate(`/article/${newArticleId}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div>
      <h2>Napiši članak</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Naslov</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Sadržaj</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            style={{ minHeight: '200px' }} 
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Dodaj članak
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleCreateScreen;
