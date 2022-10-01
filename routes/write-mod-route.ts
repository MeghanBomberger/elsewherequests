require('dotenv').config()

import express from 'express'
import fs from 'fs'

import { 
  basePath,
  buildPath,
  dataPath,
  formatMods,
} from './helpers/utils'
import { QuestGiverData } from './types/questGiverDataTypes'
import { generateCreatureFileContents } from '../templates/creature-file-templates'
import { EntityShape, ModsData, Objective } from '../templates/helpers/types'
import { modInfoDefaultTemplate } from '../templates/mod-info-template'
import { questGiverEntityFileContents, traderShape } from '../templates/questgiver-template'
import { QuestData } from './types/questDataTypes'
import { generateQuestConfigFileContents } from '../templates/quest-config-template'

const writeModRouter = express.Router()

const writeModInfoFile = async () => {
  await fs.readFile(`${dataPath}/modinfo.json`, 'utf8', (err, data) => {
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
    
    fs.appendFile(`${buildPath}/modinfo.json`, "", (err2) => {
      if (err2) {
        console.error("MODINFO CREATE FILE ERROR: ", err2)
        return
      }

      fs.writeFile(`${buildPath}/modinfo.json`, JSON.stringify(modInfoContents), (err3) => {
        if (err3) {
          console.error("MODINFO WRITE ERROR: ", err3)
          return
        }
        return
      })
    })
  })
}

const writeEntityFiles = async () => {
  await fs.readFile(`${dataPath}/givers.json`, "utf8", (err, data) => {
    if (err) {
      console.error("ERROR READING QUEST GIVER DATA FILE: ", err)
      return
    }

    const parsedData: QuestGiverData = JSON.parse(data)
    const {questGivers, questGiverShapes} = parsedData

    questGivers?.forEach(async (giver) => {
      const questGiverBuildFilePath = `${buildPath}/entities/${giver.id}.json`
      const giverShape: EntityShape = questGiverShapes.find(shape => shape.id === giver.shape) || traderShape

      await fs.appendFile(questGiverBuildFilePath, '', async (err2) => {
        if (err2) {
          console.error("ERROR CREATING QUEST GIVER DATA FILE: ", err2)
          return
        }

        const giverContents = await questGiverEntityFileContents({giver: giver, shape: giverShape})

        await fs.writeFile(questGiverBuildFilePath, giverContents, (err3) => {
          if (err3) {
            console.error("ERROR WRITING QUEST GIVER DATA FILE: ", err3)
            return
          }
          return
        })
      })
    })

    return
  })
}

const writeCreatureItemFile = async () => {
  await fs.readFile(`${dataPath}/givers.json`, "utf8", async (err, data) => {
    if (err) {
      console.error("ERROR READING QUEST GIVER DATA FILE: ", err)
      return
    }
    const creatureFilePath = `${buildPath}/itemtypes/creatures.json`
    const parsedData: QuestGiverData = JSON.parse(data)
    const { questGivers } = parsedData
    const questGiverIds = questGivers?.map(giver => giver.id) || []
    const contents = await generateCreatureFileContents(questGiverIds)

    fs.appendFile(creatureFilePath, '', (err2) => {
      if (err2) {
        console.error("ERROR CREATING CREATURE.JSON FILE: ", err2)
        return
      }

      fs.writeFile(creatureFilePath, contents, (err3) => {
        if (err3) {
          console.error("ERROR WRITING CREATURE.JSON FILE: ", err3)
          return
        }
      })
    })
  })
}

const writeQuestsConfigFile = async () => {
  await fs.readFile(`${dataPath}/quests.json`, "utf8", async (err, data) => {
    if (err) {
      console.error("ERROR READING QUESTS DATA FILE: ", err)
      return
    }

    const parsedData: QuestData[] = JSON.parse(data)
    const contents = await generateQuestConfigFileContents(parsedData)
    const questFilePath = `${buildPath}/config/quests.json`

    fs.appendFile(questFilePath, '', (err2) => {
      if (err2) {
        console.error("ERROR CREATING QUESTS.JSON FILE: ", err2)
        return
      }
    })

    fs.writeFile(questFilePath, contents, (err3) => {
      if (err3) {
        console.error("ERROR WRITING QUESTS.JSON FILE: ", err3)
        return
      }
    })
  })
}

interface EnLangConfig {
  [key: string]: string;
}

const genObjStr = (gatherObj: Objective[], killObj: Objective[]) => {
  const gatherStrs = gatherObj?.map(obj => `${obj.description}: 0/${obj.quantity}`) || []
  const killStrs = killObj?.map(obj => `${obj.description}: 0/${obj.quantity}`) || []
  const objStr = [...gatherStrs, ...killStrs].join("<br>")
  return objStr
}

const writeEnLangFile = async () => {
  await fs.readFile(`${dataPath}/givers.json`, 'utf8', (giverDataErr, giverData) => {
    if (giverDataErr) {
      console.error("ERROR READING GIVER.JSON DATA FILE: ", giverDataErr)
      return
    }

    fs.readFile(`${dataPath}/quests.json`, 'utf8', async (questDataErr, questData) => {
      if (questDataErr) {
        console.error("ERROR READING QUESTS.JSON DATA FILE: ", questDataErr)
        return
      }

      const parsedGiversData: QuestGiverData = JSON.parse(giverData)
      const { questGivers } = parsedGiversData
      const parsedQuestsData: QuestData[] = JSON.parse(questData)

      const contents: EnLangConfig = {}

      await questGivers.forEach(giver => {
        const { id, name } = giver
        contents[`item-creature-${id}`] = name
      })

      await parsedQuestsData.forEach(quest => {
        const {
          id,
          title,
          description,
          gatherObjectives,
          killObjectives,
        } = quest

        const questKeyBase = `vsquestexample:quest-${id}`

        contents[`${questKeyBase}-title`] = title
        contents[`${questKeyBase}-desc`] = description

        const objectivesStr = genObjStr(gatherObjectives, killObjectives)
        contents[`${questKeyBase}-obj`] = objectivesStr

        const enLangFilePath = `${buildPath}/lang/en.json`

        fs.appendFile(enLangFilePath, '', (appendEnLangFileErr) => {
          if (appendEnLangFileErr) {
            console.error("ERROR CREATING EN.JSON FILE: ", appendEnLangFileErr)
            return
          }

          fs.writeFile(enLangFilePath, JSON.stringify(contents), (writeFileErr) => {
            if (writeFileErr) {
              console.error("ERROR CREATING EN.JSON FILE: ", writeFileErr)
              return
            }
          })
        })
      })
    })
  })
}

writeModRouter.get("/", (req, res, next) => {
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
  writeModInfoFile()
    .then(() => {
      status.modInfoFile = "modinfo.json editted"
      console.info("WRITING MODINFO.JSON FILE COMPLETE!")

      console.info("WRITING QUEST GIVER ENTITY FILES...")
      writeEntityFiles()
        .then(() => {
          status.questGiverEntities = "entity files editted"
          console.info("WRITING QUEST GIVER ENTITY FILES COMPLETE!")

          console.info("WRITING CREATURES.JSON FILE...")
          writeCreatureItemFile()
            .then(() => {
              status.creatureItems = "creatures.json file editted"
              console.info("WRITING CREATURES.JSON FILE COMPLETE!")

              console.info("WRITING QUESTS.JSON FILE...")
              writeQuestsConfigFile()
                .then(() => {
                  status.questConfig = "quests.json file editted"
                  console.info("WRITING QUESTS.JSON FILE COMPLETE!")
                  
                  console.info("WRITING EN LANG FILE...")
                  writeEnLangFile()
                    .then(() => {
                      status.enLang = "en.json file editted"
                      console.info("WRITING EN LANG FILE COMPLETE!")
                      
                      console.info("MOD GENERATION COMPLETE. READY TO ZIP!")
                      
                      console.info("-------------------------------------------")
                      console.info("")

                      res.send(status)
                    })
                    .catch(err => {
                      if (err) {
                        console.error("ERROR WRITING MOD FILES: ", err)
                        res.send("failure")
                      }
                    })
                })
                .catch(err => {
                  if (err) {
                    console.error("ERROR WRITING MOD FILES: ", err)
                    res.send("failure")
                  }
                })
            })
            .catch(err => {
              if (err) {
                console.error("ERROR WRITING MOD FILES: ", err)
                res.send("failure")
              }
            })
        })
        .catch(err => {
          if (err) {
            console.error("ERROR WRITING MOD FILES: ", err)
            res.send("failure")
          }
        })
    })
    .catch(err => {
      if (err) {
        console.error("ERROR WRITING MOD FILES: ", err)
        res.send("failure")
      }
    })
})

export default writeModRouter
