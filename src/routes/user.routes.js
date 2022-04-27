const { Router } = require('express');
const { checkToken, checkOrigin } = require('../middlewares/auth');
const usersCtrl = require('./../controllers/user.controllers');

const router = Router();

const { createUser, getUserByUser, getUserByToken, postFavMovie } = usersCtrl;

router.route('/')
  .post(checkOrigin, getUserByUser)
  .get(checkToken, getUserByToken);

router.route('/register')
  .post(checkOrigin, createUser);

router.route('/favorites')
  .post(checkToken, postFavMovie);

module.exports = router;