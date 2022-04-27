const { Router } = require('express');
const { checkToken, checkOrigin } = require('../middlewares/auth');
const commentCtrl = require('./../controllers/comment.controllers');

const router = Router();

const { createUserComment, getCommentByMovieId, deleteComment } = commentCtrl;

router.route('/')
  .post(checkToken, checkOrigin, createUserComment);

router.route('/:id')
  .get(checkOrigin, getCommentByMovieId)
  .delete(checkToken, checkOrigin, deleteComment);

module.exports = router;