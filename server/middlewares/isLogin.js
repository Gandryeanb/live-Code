const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {

  let token = req.headers.token
  if (token) {

    let decoded = jwt.verify(token, process.env.HAST_JWT)

    if (decoded) {
      req.decoded = decoded
      next()
    }

  } else {
    res.status(500).json({
      status: 'failed',
      message: 'you need to login first'
    })
  }

}

module.exports = isLogin
