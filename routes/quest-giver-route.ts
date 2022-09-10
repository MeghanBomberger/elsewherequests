require('dotenv').config()

import express from 'express'

const questGiverRouter = express.Router()

questGiverRouter.post("/", async (req, res, next) => {
  res.send("Quest Giver Post Route Coming Soon...")
})
