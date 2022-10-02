require('dotenv').config()

import express from 'express'
import { 
  readdir,
  readFile,
} from 'node:fs/promises'

import { ItemData } from '../types/itemDataTypes'

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
  },
  items: ItemData[];
}

const modsRouter = express.Router()

const unpackPath = `../../../../../${process.env.VS_UNPACK_PATH}`

modsRouter.get("/readunpack", async (req, res, next) => {
  const output: Output = {
    mods: {},
    items: []
  }

  await readdir(unpackPath)
    .then(async (files) => {
      for (const file of files) {
        console.log("READING UNPACK FOLDER: ", file)
        const modFolderPath = `${unpackPath}/${file}`
        const unpackedFile = await readdir(modFolderPath)
      
        if (unpackedFile?.includes('modinfo.json')) {
          console.log("- READING modinfo.json")
          await readFile(`${modFolderPath}/modinfo.json`, "utf8")
            .then(async (fileData) => {
              if (file === 'alchemy-1.6.4.zip_afa541f5fe49') {
                console.log(fileData)
              }
              const parsedModInfoContents: ModInfoContent = JSON.parse(fileData)
              const mod = parsedModInfoContents?.modid || parsedModInfoContents?.modID || 'ERROR'
              const modVersion = parsedModInfoContents.version
              output.mods[mod] = modVersion

              await readdir(`${modFolderPath}/assets`)
                .then(async (assetFiles) => {
                  console.log("- READING ASSET FOLDER: ", `${mod}: ${modVersion}`)
                  for (const assetFile of assetFiles) {
                    console.log("- - READING /assets/: ", assetFile)
                    
                    await readdir(`${modFolderPath}/assets/${assetFile}`)
                      .then(async (assetData) => {
                        const itemFolders = assetData?.filter(folder => folder === 'blocktypes' || folder === 'itemtypes')
                        
                        if (!!itemFolders?.length) {
                          itemFolders?.forEach(async (folder) => {
                            console.log(`- - - READING /assets/${assetFile}/${folder}`);

                            await readdir(`${modFolderPath}/assets/${assetFile}/${folder}`)
                              .then(async (itemFolderData) => {
                                const assetFiles = itemFolderData?.filter(data => data?.split(".")?.length > 1 && data?.split(".")[1] === 'json');

                                await assetFiles.forEach(async (assetItemFile) => {
                                  console.log(`- - - - READING /assets/${assetFile}/${folder}/${assetItemFile}`);

                                  const assetFileData = await readFile(`${modFolderPath}/assets/${assetFile}/${folder}/${assetItemFile}`, "utf8").catch(err => !!err && console.error("ERROR READING ITEM FILE DATA"));

                                  const parsedAssetFileData = JSON.parse(assetFileData || '');
                                  const {
                                    code,
                                    variantgroups
                                  } = parsedAssetFileData

                                  console.log(parsedAssetFileData)
                                  // @ts-ignore
                                  const filteredVariantGroups: any[] = variantgroups?.filter(group => group.code === 'type')
                                  filteredVariantGroups?.forEach(group => {
                                    const itemObj: ItemData = {
                                      mod,
                                      id: code,
                                      primaryAttributes: group.states
                                    }
                                    output.items.push(itemObj)
                                  })

                                  // console.log(parsedAssetFileData)
                                  // TODO create item strings using code + state(s)
                                  // const itemObj: ItemObj = {
                                  //   code: `${parsedAssetFileData.code}`,
                                  //   mod: mod
                                  // }
                                  // output.items.push(itemObj)
                                });

                                const subFolders = itemFolderData?.filter(data => data?.split(".")?.length === 1);
                                console.log("subFolders: ", subFolders);
                                // TODO search subFolders for item files
                              })
                              .catch(err => !!err && console.error("ERROR READING ITEM FOLDER DATA"));
                          })
                        }

                        // TODO 'entities' folder for mobs
                      })
                      .catch(err => !!err && console.error("ERROR READING ASSETS FOLDER"))
                  }
                  return
                })
                .catch(err => !!err && console.error("UNABLE TO READ ASSETS FOLDER OF: ", file))

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