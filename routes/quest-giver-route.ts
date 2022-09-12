require('dotenv').config()

import express from 'express'
import fse from 'fs-extra'

const questGiverData = require("../data/givers.json")

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  res.send(questGiverData)
})

export default questGiverRouter
