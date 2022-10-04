import { tables } from './tables'

export const fetchAllModsQuery = `
  SELECT
    id,
    version,
    isUse
  FROM ${tables.mods};
`

export const createModQuery = `
  INSERT INTO ${tables.mods} (
    id,
    version,
    isUse
  ) VALUES (?, ?, ?);
`

export const updateModQuery = `
  UPDATE ${tables.mods}
    SET 
      id = ?,
      version = ?,
      isUse = ?
  WHERE id = ?;
`

export const deleteModQuery = `
  DELETE FROM ${tables.mods}
  WHERE id = ?;
`
