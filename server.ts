require('dotenv').config()

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'

import itemsRouter from './routes/items-route'
import mobsRouter from './routes/mobs-route'
import modsRouter from './routes/mods-route'
import questGiverRouter from './routes/quest-giver-route'
import questsRouter from './routes/quests-route'
import writeModRouter from './routes/write-mod-route'

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic(__dirname + '/client/build'))

app.get("/", (req, res) => {
  res.send({message: "Hi"})
})

// wake up path for free heroku hosting - users coming in from portfolio won't have to wait for the application to boot back up.
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" })
}) 

// API routes
app.use("/api/questgivers", questGiverRouter)
app.use("/api/quests", questsRouter)
app.use("/api/items", itemsRouter)
app.use("/api/mobs", mobsRouter)
app.use("/api/mods", modsRouter)

// API route to generate mod files
app.use("/api/writemod", writeModRouter)

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