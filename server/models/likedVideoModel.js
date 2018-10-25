const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedVideoSchema = new Schema({
  uniqueParam: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const LikedVideo = mongoose.model('LikedVideo', likedVideoSchema)

module.exports = LikedVideo
