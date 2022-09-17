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

// questGiverRouter.put("/:id", async (req, res, next) => {
//   console.log(req.params)
//   console.log(req.body)
//   res.send("success")
// })
// TODO - PUT not working with form currently, making do with POST in the meantime.

export default questGiverRouter
