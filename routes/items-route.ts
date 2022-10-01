require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { dataPath } from './helpers/utils'
import { ItemData } from './types/itemDataTypes'

const itemsDataFilePath = `${dataPath}/items.json`

const itemsRouter = express.Router()

itemsRouter.get("/", async (req, res, next) => {
  fs.readFile(itemsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING ITEMS DATA: ", err)
      res.send("failure")
    }
    res.send(JSON.parse(data))
  })
})

itemsRouter.post("/", async (req, res, next) => {
  const newItem = req.body
  const itemId = req.body.id

  fs.readFile(itemsDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING ITEMS DATA: ", err)
      res.send("failure")
    }

    const contents = JSON.parse(data)?.filter(item => item.id !== itemId)
    contents.push(newItem)
    
    fs.writeFile(itemsDataFilePath, JSON.stringify(contents), (writeErr) => {
      if (writeErr) {
        console.error("ERROR WRITING ITEMS DATA: ", writeErr)
        res.send("failure")
      }

      fs.readFile(itemsDataFilePath, "utf8", (readErr, readData) => {
        if (readErr) {
          console.error("ERROR READING ITEMS DATA: ", readErr)
          res.send("failure")
        }

        const fileData: ItemData = JSON.parse(readData)

        res.send({
          message: "success",
          items: fileData
        })
      })
    })
  })
})

export default itemsRouter
