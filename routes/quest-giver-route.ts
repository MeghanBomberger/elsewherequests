require('dotenv').config()

import express from 'express'
import {
  access,
  constants,
} from 'node:fs'

const questGiverData = require("../data/givers.json")
const questGiverDataFile = "../elsewherequests/data/givers.json"

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  const data = questGiverData
  res.send(data)
})

questGiverRouter.post("/", async (req, res, next) => {
  // console.log(req.body)
  access(questGiverDataFile, constants.F_OK, (err) => {
    err ? console.error(err) : console.log(`${questGiverDataFile} file found.`)
  })
  res.send("success")
})

// questGiverRouter.put("/:id", async (req, res, next) => {
//   console.log(req.params)
//   console.log(req.body)
//   res.send("success")
// })
// TODO - PUT not working with form currently, making do with POST in the meantime.

export default questGiverRouter
