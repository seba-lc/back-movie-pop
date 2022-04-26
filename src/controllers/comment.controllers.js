const Comment = require('./../models/Comment');

const commentCtrl = {};

/*user, movieId, message*/
commentCtrl.createUserComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).json({
      message: 'Comentario cargado con éxito'
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el comentario, inténtelo nuevamente'
    })
  }
}

commentCtrl.getCommentByMovieId = async (req, res) => {
  try {
    const response = await Comment.findOne({movieId: req.params.id}, '-updatedAt');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Error al cargar el comentario, inténtelo nuevamente'
    })
  }
}

module.exports = commentCtrl;
