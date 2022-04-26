const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 50
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