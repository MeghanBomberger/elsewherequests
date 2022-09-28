require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { dataPath } from './helpers/utils'

const itemsDataFilePath = `${dataPath}/items.json`

const itemsRouter = express.Router()

itemsRouter.get("/", async (req, res, next) => {
  fs.readFile(itemsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTS DATA: ", err)
      res.send("failure")
    }
    res.send(JSON.parse(data))
  })
})

export default itemsRouter
