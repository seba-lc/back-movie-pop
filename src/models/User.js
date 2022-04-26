const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  user: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required:true,
    trim: true,
    minlength: 8,
    maxlength: 80
  },
  favMovies: {
    type: Array,
    required: true,
    default: []
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
    required: true,
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('User', UserSchema);