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

const writeModInfoFile = () => {
  fs.readFile(`${dataPath}/modinfo.json`, 'utf8', (err, data) => {
    if (err) {
      console.error("ERROR FETCHING MODS DATA: ", err)
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
        return
      }

      // @ts-ignore
      fs.writeFile(`${buildPath}/modinfo.json`, JSON.stringify(modInfoContents), (err3, data3) => {
        if (err3) {
          console.error("MODINFO WRITE ERROR: ", err3)
          return
        }
        return
      })
    })
  })
}

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
  await writeModInfoFile()
  status.modInfoFile = "modinfo.json editted"
  console.log("WRITING MODINFO.JSON FILE COMPLETE!")

  // TODO - write entity files
  // TODO - write creature item file
  // TODO - write quest config file
  // TODO - write en lang file

  console.log("MOD GENERATION COMPLETE. READY TO ZIP!")
  
  console.log("-------------------------------------------")
  console.log("")
  
  res.send(status)
})

export default writeModRouter
