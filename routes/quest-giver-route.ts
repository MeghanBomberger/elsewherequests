require('dotenv').config()

import express from 'express'
import fs from 'fs'

import { dataPath, genQuestGiverDataObj } from './helpers/utils'
import { QuestGiver, QuestGiverData } from './types/questGiverDataTypes'

const questGiverDataFilePath = `${dataPath}/givers.json`

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  fs.readFile(questGiverDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTGIVER DATA: ", err)
      res.send("failure")
    }
    res.send(data)
  })
})

questGiverRouter.post("/", async (req, res, next) => {
  const newQuestGiver = genQuestGiverDataObj(req.body)
  const questGiverId = req.body.id

  try {
    fs.readFile(questGiverDataFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("questGiverReadFile Error: ", err)
        res.send("failure")
      }
      const questGiverFileData = JSON.parse(data)
      const questGivers = questGiverFileData.questGivers
      const questGiverIndex = questGivers.findIndex((giver: QuestGiver) => giver.id === questGiverId)
      
      if (questGiverIndex === -1) {
        questGivers.push(newQuestGiver)
      } else {
        questGivers[questGiverIndex] = newQuestGiver
      }

      const content = JSON.stringify({
        ...questGiverFileData,
        questGivers
      })

      fs.writeFile(questGiverDataFilePath, content, writeErr => {
        if (writeErr) {
          console.error("questGiverWriteError: ", writeErr)
          res.send("failure")
        }

        fs.readFile(questGiverDataFilePath, 'utf8', (readErr, finalData) => {
          if (readErr) {
            console.error("questGiverSecondReadFile Error: ", err)
            res.send("failure")
          }
          
          const fileData: QuestGiverData = JSON.parse(finalData)

          res.send({
            message: "success",
            questGivers: fileData.questGivers
          })
        })
      })
    })
  }
  catch (err) {
    res.send("failure")
  }
})

export default questGiverRouter
