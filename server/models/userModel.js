const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty']
  },
  email: {
    type: String,
    required: [true, 'email cannot be empty'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty']
  },
  likedVideo: [{
    type: String
  }],
  dislikedVideo: [{
    type: String
  }],
})

userSchema.post('validate', doc => {

  const hash = bcrypt.hashSync(doc.password, Number(process.env.HASH_PASS))

  doc.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User
