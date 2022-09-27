require('dotenv').config()
import { Mod, ModDependencies, ModsData } from '../../templates/helpers/types';

export const basePath = process.env.BASE_PATH
export const buildPath = `${basePath}/generatedMod`
export const dataPath = `${basePath}/data`

interface GenQuestGiverDataObjProps {
    id?: string;
    name?: string;
    shapeId?: string;
    damage?: number;
    health?: number;
    reviveHours?: number;
    randomizedNames?: string[];
    questIds?: string[];
}

export const genQuestGiverDataObj = ({ 
  id,
  name,
  shapeId,
  damage,
  health,
  reviveHours,
  randomizedNames,
  questIds,
}: GenQuestGiverDataObjProps) => ({
  id: id || '',
  name: name || '',
  shape: shapeId || 'trader',
  quests: questIds || [],
  damage: damage || 500,
  health: health || 1000,
  reviveHours: reviveHours || 1,
  randomizedNames: randomizedNames || [
    "Rosto", 
    "Solom"
  ]
})

export const formatMods = (mods: Mod[]) => {
  let modObj: ModDependencies = {}
  mods?.forEach((mod: Mod) => modObj[mod.name] = mod.version)
  return modObj
}
