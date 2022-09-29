require('dotenv').config()

import express from 'express'
import fs from 'fs'

import { dataPath, genQuestGiverDataObj } from './helpers/utils'
import { QuestData } from './types/questDataTypes'
import { QuestGiver, QuestGiverData } from './types/questGiverDataTypes'

const questGiverDataFilePath = `${dataPath}/givers.json`
const questDataFilePath = `${dataPath}/quests.json`

const questGiverRouter = express.Router()

questGiverRouter.get("/", async (req, res, next) => {
  fs.readFile(questGiverDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTGIVER DATA: ", err)
      res.send("failure")
    }
    res.send(JSON.parse(data))
  })
})

questGiverRouter.post("/", async (req, res, next) => {
  const newQuestGiver = genQuestGiverDataObj(req.body)
  const questGiverId = req.body.id

  try {
    fs.readFile(questDataFilePath, "utf8", (questsErr, questsData) => {
      if (questsErr) {
        console.error("ERROR READING QUEST DATA FILE: ", questsErr)
        res.send("failure")
      }

      const parsedQuestsData: QuestData[] = JSON.parse(questsData)
      const questIds = parsedQuestsData?.filter(quest => quest.questGiverId)?.map(quest => quest.id) || []
      newQuestGiver.quests = questIds

      fs.readFile(questGiverDataFilePath, "utf8", (giverErr, giverData) => {
        if (giverErr) {
          console.error("ERROR READING QUEST GIVER DATA FILE: ", giverErr)
          res.send("failure")
        }
        const questGiverFileData = JSON.parse(giverData)
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
              console.error("questGiverSecondReadFile Error: ", readErr)
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
    })
  }
  catch (err) {
    res.send("failure")
  }
})

export default questGiverRouter
