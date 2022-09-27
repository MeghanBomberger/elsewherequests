require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { ModsData } from '../templates/helpers/types'
import { modInfoDefaultTemplate } from '../templates/mod-info-template'

import { 
  buildPath,
  dataPath,
  formatMods,
} from './helpers/utils'

const writeModRouter = express.Router()

writeModRouter.get("/", async (req, res, next) => {
  const status = {
    modInfoFile: '',
    questConfig: '',
    questGiverEntities: '',
    creatureItems: '',
    enLang: ''
  }

  console.log("")
  console.log("-------------------------------------------")

  console.log("WRITING MODINFO.JSON FILE...")
  fs.readFile(`${dataPath}/modinfo.json`, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING MODS DATA: ", err)
      res.send(status)
      return
    }
    const modInfoContents = modInfoDefaultTemplate
    const modsData: ModsData = JSON.parse(data)
    modInfoContents.version = modsData.version
    modInfoContents.dependencies = {
      ...modInfoContents.dependencies,
      ...formatMods(modsData.mods)
    }
    
    // @ts-ignore
    fs.appendFile(`${buildPath}/modinfo.json`, "", (err2: any, data2: any) => {
      if (err2) {
        console.error("MODINFO CREATE FILE ERROR: ", err2)
        res.send(status)
        return
      }
      status.modInfoFile = "modinfo.json created"

      // @ts-ignore
      fs.writeFile(`${buildPath}/modinfo.json`, JSON.stringify(modInfoContents), (err3, data3) => {
        if (err3) {
          console.error("MODINFO WRITE ERROR: ", err3)
          res.send(status)
          return
        }
        status.modInfoFile = "modinfo.json editted"
        res.send(status)
        return
      })
    })
  })
  console.log("WRITING MODINFO.JSON FILE COMPLETE!")

  console.log("-------------------------------------------")
  console.log("")
})

export default writeModRouter
