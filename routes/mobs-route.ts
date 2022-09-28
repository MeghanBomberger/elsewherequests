require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { dataPath } from './helpers/utils'

const mobsDataFilePath = `${dataPath}/mobs.json`

const mobsRouter = express.Router()

mobsRouter.get("/", async (req, res, next) => {
  fs.readFile(mobsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTS DATA: ", err)
      res.send("failure")
    }
    res.send(JSON.parse(data))
  })
})

export default mobsRouter
