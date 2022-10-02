require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { dataPath } from './helpers/utils'
import { MobData } from './types/mobsDataType'

const mobsDataFilePath = `${dataPath}/mobs.json`

const mobsRouter = express.Router()

mobsRouter.get("/", async (req, res, next) => {
  fs.readFile(mobsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTS DATA: ", err)
      res.send("failure")
    }
    console.log(data)
    res.send(JSON.parse(data))
  })
})

mobsRouter.post("/", async (req, res, next) => {
  const newMob = req.body
  const mobId = req.body.id

  fs.readFile(mobsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING ITEMS DATA: ", err)
      res.send("failure")
    }
    
    const parsedData: MobData[] = JSON.parse(data)
    const contents = parsedData?.filter(mob => mob.id !== mobId)
    contents.push(newMob)

    fs.writeFile(mobsDataFilePath, JSON.stringify(contents), (writeErr) => {
      if (writeErr) {
        console.error("ERROR WRITING ITEMS DATA: ", writeErr)
        res.send("failure")
      }

      fs.readFile(mobsDataFilePath, "utf8", (readErr, readData) => {
        if (readErr) {
          console.error("ERROR READING ITEMS DATA: ", readErr)
          res.send("failure")
        }

        const fileData: MobData = JSON.parse(readData)

        res.send({
          message: "success",
          mobs: fileData
        })
      })
    })
  })
})

export default mobsRouter
