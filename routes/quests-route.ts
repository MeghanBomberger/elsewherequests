require('dotenv').config()

import express from 'express'
import fs from 'fs'

import { dataPath, genQuestDataObj } from './helpers/utils'
import { QuestConfigFileObj, QuestData } from './types/questDataTypes'

const questsDataFilePath = `${dataPath}/quests.json`

const questsRouter = express.Router()

questsRouter.get("/", async (req, res, next) => {
  fs.readFile(questsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING QUESTS DATA: ", err)
      res.send("failure")
    }
    res.send(JSON.parse(data))
  })
})

questsRouter.post("/", async (req, res, next) => {
  const newQuest: QuestConfigFileObj = genQuestDataObj(req.body)
  const questId = req.body.id

  fs.readFile(questsDataFilePath, "utf8", (readErr, readData) => {
    if (readErr) {
      console.error("ERROR READING QUEST DATA FILE: ", readErr)
      res.send("failure")
    }

    const parsedQuestsData: QuestConfigFileObj[] = JSON.parse(readData)
    const contents = parsedQuestsData?.filter(quest => quest.id !== questId)
    contents.push(newQuest)

    fs.writeFile(questsDataFilePath, JSON.stringify(contents), (writeErr) => {
      if (writeErr) {
        console.error("ERROR WRITING TO QUEST FILE: ", writeErr)
        res.send("failure")
      }

      fs.readFile(questsDataFilePath, 'utf8', (returnErr, returnData) => {
        if (returnErr) {
          console.error("ERROR READING QUEST FILE: ", returnErr)
          res.send("failure")
        }

        const fileData: QuestData[] = JSON.parse(returnData)

        res.send({
          message: "success",
          quests: fileData
        })
      })
    })
  })
})

export default questsRouter
