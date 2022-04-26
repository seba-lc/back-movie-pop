const { Router } = require('express');
const { checkToken } = require('../middlewares/auth');
const commentCtrl = require('./../controllers/comment.controllers');

const router = Router();

const { createUserComment, getCommentByMovieId } = commentCtrl;

router.route('/')
  .post(checkToken, createUserComment);

router.route('/:id')
  .get(getCommentByMovieId);

module.exports = router;