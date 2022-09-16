require('dotenv').config()

import express from 'express'

const questGiverData = require("../data/givers.json")

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  const data = questGiverData
  res.send(data)
})

questGiverRouter.post("/", async (req, res, next) => {
  console.log(req.body)
  res.send("success")
})

export default questGiverRouter
