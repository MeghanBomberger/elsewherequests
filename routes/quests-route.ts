require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { dataPath } from './helpers/utils'

const questsDataFilePath = `${dataPath}/quests.json`

const questsRouter = express.Router()

questsRouter.get("/", async (req, res, next) => {
  fs.readFile(questsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTS DATA: ", err)
      res.send("failure")
    }
    res.send(data)
  })
})

export default questsRouter