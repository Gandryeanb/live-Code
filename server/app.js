require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT
const db = mongoose.connection;

const userRoute = require('./routes/userRoute')

mongoose.connect(process.env.DB, {
  useNewUrlParser: true
})

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({
    extended: false
  }))

  .use('/users', userRoute)


  .listen(port, () => {
    console.log(`\n> Server Running on PORT ${port}`)
  })

db
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () {
    console.log('> DB connected')
  });
