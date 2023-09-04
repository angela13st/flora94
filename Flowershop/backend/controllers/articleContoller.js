import asyncHandler from 'express-async-handler';
import Article from '../models/articleModel.js';

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({});
  res.json(articles);
});

// @desc    Fetch a single article by ID
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Public
const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Public
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Create an article
// @route   POST /api/articles
// @access  Public
const createArticle = async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const newArticle = new Article({
        title,
        content,
        author,
      });
  
      const createdArticle = await newArticle.save();
  
      res.status(201).json(createdArticle);
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export { getArticles, getArticleById, updateArticle, deleteArticle, createArticle };
