require('dotenv').config()

import express from 'express'
import { 
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises'

import { dataPath } from './helpers/utils'

interface ModInfoContent {
  authors?: string[];
  Authors?: string[];
  dependencies?: {
    [key: string]: string;
  };
  dependency?: {
    [key: string]: string;
  };
  description: string;
  iconpath?: string;
  modid?: string;
  modID?: string;
  name: string;
  networkVersion?: null;
  RequiredOnClient?: boolean;
  RequiredOnServer?: boolean;
  Side?: string;
  texturesize?: number;
  type: string;
  version: string;
  website?: string;
}

interface ItemObj {
  code: string;
  mod: string;
}

interface Output {
  mods: {
    [mod: string]: string;
  }
}

const modsRouter = express.Router()

const unpackPath = `../../../../../${process.env.VS_UNPACK_PATH}`
const modsDataFilePath = `${dataPath}/mods.json`

modsRouter.get("/", async (req, res, next) => {
  await readFile(modsDataFilePath, "utf8")
    .then(data => {
      const parsedData = JSON.parse(data)
      res.send({
        ...parsedData
      })
    })
    .catch(err => {
      if (err) {
        console.error("ERROR READING MOD FILE: ", err)
        res.send({ message: "failure" })
      }
    })
})

modsRouter.get("/readunpack", async (req, res, next) => {
  const output: Output = {
    mods: {}
  } // extend to parse items from item files later

  await readdir(unpackPath)
    .then(async (files) => {
      for (const file of files) {
        console.info("READING UNPACK FOLDER: ", file)
        const modFolderPath = `${unpackPath}/${file}`
        const unpackedFile = await readdir(modFolderPath)
      
        if (unpackedFile?.includes('modinfo.json')) {
          console.info("- READING modinfo.json")
          await readFile(`${modFolderPath}/modinfo.json`, "utf8")
            .then(async (fileData) => {
              if (file === 'alchemy-1.6.4.zip_afa541f5fe49') {
                console.info(fileData)
              }
              const parsedModInfoContents: ModInfoContent = JSON.parse(fileData)
              const mod = parsedModInfoContents?.modid || parsedModInfoContents?.modID || 'ERROR'
              const modVersion = parsedModInfoContents.version
              output.mods[mod] = modVersion

              await writeFile(modsDataFilePath, JSON.stringify(output.mods))
                .catch(err => !!err && console.error("ERROR WRITING TO MODS DATA FILE"))
              return
            })
            .catch(err => {
              if (err) {
                console.error("ERROR READING FILE: ", err)
                return
              }
            })
        }
      }
    })
    .catch(err => {
      if (err) {
        console.error("UNPACK ERROR: ", err)
        res.send({
          status: "failure"
        })
      }
    })
    .finally(() => {
      res.setHeader('Content-Type', 'application/json')
      res.send({
        status: "success",
        ...output
      })
    })
})

export default modsRouter