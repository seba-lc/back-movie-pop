const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token){
    res.status(400).json({ok: false, message: 'Token no válido'});
    return
  }
  try {
    const {id} = jwt.verify(token, process.env.S_WORD);
    if(!id){
      res.status(400).json({ok: false, message: 'Token no válido'})
      return
    }
    req.id = id;
    next();
  } catch (error) {
    console.log(error.message);
    if(error.message === 'jwt expired'){
      res.status(400).json({message: 'Token expirado'})
    }
    res.status(500).json({message: 'Error en el servidor'})
  }
}