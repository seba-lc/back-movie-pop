const {model, Schema} = require('mongoose');

const CommentSchema = new Schema({
  user: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  },
  movieId: {
    type: Number,
    required: true,
    maxlength: 10
  },
  message: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 200
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Comment', CommentSchema);