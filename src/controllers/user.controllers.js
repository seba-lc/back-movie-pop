const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');

const usersCtrl = {};

/*name, user, password*/
usersCtrl.createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    userInfo.favMovies = [];
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
    const newUser = new User(userInfo);
    await newUser.save();
    res.status(200).json({
      message: 'Usuario generado exitosamente'
    })

  } catch (error) {
    console.log(error);
    if(error.code === 11000){
      return res.status(201).json({error: "usuario existente"})
    };
    res.status(404).json({
      message: 'Error al cargar el usuario, intentelo nuevamente'
    })
  }
} 

/*user, password*/
usersCtrl.getUserByUser = async (req, res) => {
  try {
    const user = await User.findOne({user: req.body.user}).select('-createdAt -updatedAt');
    if(user != null){
      const result = await bcrypt.compare(req.body.password, user.password);
      if(result){
        const token = jwt.sign({id: user._id}, process.env.S_WORD, {expiresIn: process.env.EXPIRATION_TIME});
        res.status(200).json({id: token, name: user.name, user: user.user, favMovies: user.favMovies, comments: user.comments});
        return;
      }else{
        res.status(201).json({
          message: 'Datos Incorrectos'
        })
      };
    }else{
      res.status(201).json({
        message: 'Datos Incorrectos'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el usuario, intentelo nuevamente'
    })
  }
}

usersCtrl.getUserByToken = async (req, res) => {
  try {
    const user = await User.findById(req.id).select('-_id -password -createdAt -updatedAt');
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el usuario, intentelo nuevamente'
    })
  }
}

/*user, movieId*/
usersCtrl.postFavMovie = async (req, res) => {
  try {
    const moviePosted = await User.findOneAndUpdate(
      {user: req.body.user},
      { "$push": {"favMovies": req.body.movieId} },
      { "new": true, "upsert": true }
    );
    res.status(200).json({
      message: "Película añadida a la lista de favoritos"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el usuario, intentelo nuevamente'
    })
  }
}

/*user, favMovies(new)*/
usersCtrl.updateFavMovies = async (req, res) => {
  try {
    const updatedArray = await User.findOneAndUpdate({user: req.body.user}, {favMovies: req.body.favMovies});
    res.status(200).json({
      message: "Favoritos Actualizados Correctamente"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el usuario, intentelo nuevamente'
    })
  }
}

module.exports = usersCtrl;