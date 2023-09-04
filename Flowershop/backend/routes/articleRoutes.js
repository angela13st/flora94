// routes/articleRoutes.js

import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleContoller.js';

const router = express.Router();

router.route('/').get(getArticles);
router.route('/:id').get(getArticleById);


router.route('/').post(createArticle);


router.route('/:id').put(updateArticle);

router.route('/:id').delete(deleteArticle);

export default router;
