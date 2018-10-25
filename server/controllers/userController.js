const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

  static dislike(req, res) {
    User.updateOne({
        _id: req.decoded.id
      }, {
        $push: {
          dislikedVideo: req.params.id
        }
      })
      .then(data => {
        User.updateOne({
            _id: req.decoded.id
          }, {
            $pull: {
              likedVideo: req.params.id
            }
          })
          .then(data => {
            res.status(200).json({
              status: 'success',
              message: 'success dislike like'
            })
          })
          .catch(err => {
            res.status(500).json({
              status: 'failed',
              message: err.message
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static like(req, res) {
    User.updateOne({
        _id: req.decoded.id
      }, {
        $push: {
          likedVideo: req.params.id
        }
      })
      .then(data => {
        User.updateOne({
            _id: req.decoded.id
          }, {
            $pull: {
              dislikedVideo: req.params.id
            }
          })
          .then(data => {
            res.status(200).json({
              status: 'success',
              message: 'success like'
            })
          })
          .catch(err => {
            res.status(500).json({
              status: 'failed',
              message: err.message
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static getUser(req, res) {
    User.findOne({
        _id: req.decoded.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: {
            id: data._id,
            name: data.name,
            like: data.likedVideo,
            dislike: data.dislikedVideo
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static Register(req, res) {
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    let user = new User(data)

    user.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: `creating account with email ${data.email} is success`
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static Login(req, res) {

    User.findOne({
        email: req.body.email
      })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let token = jwt.sign({
              id: data._id,
              name: data.name
            }, process.env.HAST_JWT)

            res.status(200).json({
              status: 'success',
              token
            })

          } else {
            res.status(500).json({
              status: 'failed',
              message: 'wrong password or email'
            })
          }
        } else {
          res.status(404).json({
            status: 'failed',
            message: 'user not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })

  }

}

module.exports = UserController
