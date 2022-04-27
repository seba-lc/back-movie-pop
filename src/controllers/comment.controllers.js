const req = require('express/lib/request');
const Comment = require('./../models/Comment');

const commentCtrl = {};

/*user, movieId, message*/
commentCtrl.createUserComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el comentario, inténtelo nuevamente'
    })
  }
}

commentCtrl.getCommentByMovieId = async (req, res) => {
  try {
    const response = await Comment.find({movieId: req.params.id}, '-updatedAt');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el comentario, inténtelo nuevamente'
    })
  }
}

commentCtrl.deleteComment = async (req, res) => {
  try {
    const response = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Comentario Eliminado Correctamente'
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el comentario, inténtelo nuevamente'
    })
  }
}

module.exports = commentCtrl;
