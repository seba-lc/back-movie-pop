const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();
require('dotenv').config();

//configuracion de puerto y db

connectDB();
app.set('port', process.env.PORT || 4500);
app.listen(app.get('port'), () => {
  console.log('Server on port ' + app.get('port'));
});

//configuracion inicial
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './../public')));

//rutas
app.use('/api/moviepop/users', userRouter);
app.use('/api/moviepop/comments', commentRouter);