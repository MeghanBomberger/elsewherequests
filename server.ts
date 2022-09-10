require('dotenv').config()

import cors from 'cors'
import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'

const app = express()

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.LIVE_URL || process.env.HEROKU_URL || 'http://localhost:3000',
  preflightContinue: false
}

app.use(express.json())
app.use(cors(options))
app.use(serveStatic(__dirname + '/client/build'))

app.get("/", (req, res) => {
  res.send({message: "Hi"})
})

// wake up path for free heroku hosting - users coming in from portfolio won't have to wait for the application to boot back up.
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" })
}) 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

app.listen(
  process.env.PORT || 3000,
  () => console.log(`Server listening on port ${process.env.PORT || 3000}`)
)