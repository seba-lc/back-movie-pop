const { Router } = require('express');
const { checkToken, checkOrigin } = require('../middlewares/auth');
const usersCtrl = require('./../controllers/user.controllers');

const router = Router();

const { createUser, getUserByUser, getUserByToken, postFavMovie, updateFavMovies } = usersCtrl;

router.route('/')
  .post(checkOrigin, getUserByUser)
  .get(checkToken, getUserByToken);

router.route('/register')
  .post(checkOrigin, createUser);

router.route('/favorites')
  .post(checkToken, postFavMovie);

router.route('/deletefav')
  .post(checkToken, updateFavMovies);

module.exports = router;