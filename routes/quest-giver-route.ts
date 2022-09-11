require('dotenv').config()

import express from 'express'

const questGiverData = require("../data/givers.json")

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  res.send(questGiverData)
})

export default questGiverRouter
