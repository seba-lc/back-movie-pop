const { Router } = require('express');
const { checkToken } = require('../middlewares/auth');
const usersCtrl = require('./../controllers/user.controllers');

const router = Router();

const { createUser, getUserByUser, getUserByToken, postUserComment, postFavMovie } = usersCtrl;

router.route('/')
  .post(getUserByUser)
  .get(checkToken, getUserByToken);

router.route('/register')
  .post(createUser);

router.route('/comments')
  .post(checkToken, postUserComment);

router.route('/favorites')
  .post(checkToken, postFavMovie);

module.exports = router;