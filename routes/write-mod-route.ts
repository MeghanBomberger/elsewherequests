require('dotenv').config()

import express from 'express'
import fs from 'fs'
import { EntityShape, ModsData } from '../templates/helpers/types'
import { modInfoDefaultTemplate } from '../templates/mod-info-template'
import { questGiverEntityFileContents, traderShape } from '../templates/questgiver-template'

import { 
  buildPath,
  dataPath,
  formatMods,
} from './helpers/utils'
import { QuestGiverData } from './types/questGiverDataTypes'

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

const writeEntityFiles = () => {
  console.info("...fetching quest giver data...")
  fs.readFile(`${dataPath}/givers.json`, "utf8", (err, data) => {
    if (err) {
      console.error("ERROR READING QUEST GIVER DATA FILE: ", err)
      return
    }

    const parsedData: QuestGiverData = JSON.parse(data)
    const {questGivers, questGiverShapes} = parsedData

    questGivers?.forEach(async (giver) => {
      console.info(`...writing entity file ${giver.id}.json...`)
      const questGiverBuildFilePath = `${buildPath}/entities/${giver.id}.json`
      const giverShape: EntityShape = questGiverShapes.find(shape => shape.id === giver.shape) || traderShape

      // @ts-ignore
      await fs.appendFile(questGiverBuildFilePath, '', async (err2, data2) => {
        if (err2) {
          console.error("ERROR CREATING QUEST GIVER DATA FILE: ", err2)
          return
        }

        const giverContents = await questGiverEntityFileContents({giver: giver, shape: giverShape})

        // @ts-ignore
        await fs.writeFile(questGiverBuildFilePath, giverContents, (err3, data3) => {
          if (err3) {
            console.error("ERROR WRITING QUEST GIVER DATA FILE: ", err3)
            return
          }

          console.info(`${giver.id}.json complete!`)
          return
        })
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

  console.info("")
  console.info("-------------------------------------------")

  console.info("WRITING MODINFO.JSON FILE...")
  await writeModInfoFile()
  status.modInfoFile = "modinfo.json editted"
  console.info("WRITING MODINFO.JSON FILE COMPLETE!")

  console.info("WRITING QUEST GIVER ENTITY FILES...")
  await writeEntityFiles()
  status.questGiverEntities = "entity files editted"
  console.info("WRITING QUEST GIVER ENTITY FILES COMPLETE!")

  // TODO - write creature item file

  // TODO - write quest config file
  
  // TODO - write en lang file

  console.info("MOD GENERATION COMPLETE. READY TO ZIP!")
  
  console.info("-------------------------------------------")
  console.info("")
  
  res.send(status)
})

export default writeModRouter
