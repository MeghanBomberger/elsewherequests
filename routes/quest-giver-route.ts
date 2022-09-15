require('dotenv').config()

import express from 'express'

const questGiverData = require("../data/givers.json")

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  const data = questGiverData
  res.send(data)
})

export default questGiverRouter
