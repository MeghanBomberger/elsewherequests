import express from 'express'
import { resolve } from 'path';

import { connection } from './connection'
import {
  fetchAllModsQuery,
  createModQuery,
  deleteModQuery,
  updateModQuery,
} from './queries/mod-queries'

interface Mod {
  id: string;
  version: string;
  isUse: boolean;
}

const fetchAllMods = (mod: Mod) => {
  return new Promise((res, reject) => {
    connection.query(
      fetchAllModsQuery,
      [],
      (err, results) => {
        if (err) {
					console.error("ERROR OCCURRED WHILE FETCHING MODS FROM DB", err)
					return reject(err)
				}

        resolve(results)
      }
    )
  })
}

const createMod = (mod: Mod) => {
  return new Promise ((resolve, reject) => {
    connection.query(
      createModQuery,
      [
        mod.id,
        mod.version,
        mod.isUse
      ],
      (err, results) => {
        if (err) {
					console.error("ERROR OCCURRED WHILE FETCHING MODS FROM DB", err)
					return reject(err)
				}
        resolve(results)
      }
    )
  })
}

const updateMod = (mod: Mod, originalId: string) => {
  return new Promise ((resolve, reject) => {
    connection.query(
      updateModQuery,
      [
        mod.id,
        mod.version,
        mod.isUse,
        originalId
      ],
      (err, results) => {
        if (err) {
					console.error("ERROR OCCURRED WHILE FETCHING MODS FROM DB", err)
					return reject(err)
				}
        resolve(results)
      }
    )
  })
}

const deleteMod = (modId: string) => {
  return new Promise ((resolve, reject) => {
    connection.query(
      deleteModQuery,
      [modId],
      (err, results) => {
        if (err) {
					console.error("ERROR OCCURRED WHILE FETCHING MODS FROM DB", err)
					return reject(err)
				}
        resolve(results)
      }
    )
  })
}

const modsDB = {
  fetchAllMods,
  createMod,
  updateMod,
  deleteMod
}