require('dotenv').config()
import { Mod, ModDependencies, ModsData } from '../../templates/helpers/types';
import { QuestConfigFileObj, QuestData } from '../types/questDataTypes';

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

export const genQuestDataObj = ({
  id,
  title,
  description,
  perPlayer,
  cooldown,
  gatherObjectives,
  killObjectives,
  rewardItems,
  preReqQuestId,
  questGiverId,
}: QuestData) => {
  const quest: QuestConfigFileObj = {
    id,
    cooldown,
    perPlayer,
    title,
    description,
    questGiverId,
  }

  if (!!gatherObjectives?.length) {
    //@ts-ignore - TODO fix types here
    quest.gatherObjectives = gatherObjectives?.map(item => ({
      ids: item.ids,
      demand: item.quantity
    })) || []
  }

  if (!!killObjectives?.length) {
    quest.killObjectives = killObjectives?.map(mob => ({
      validCodes: mob.ids,
      demand: mob.quantity
    })) || []
  }

  if (!!rewardItems?.length) {
    //@ts-ignore - TODO fix types here
    quest.rewardItems = rewardItems?.map(item => ({
      itemCode: item.ids?.[0],
      amount: item.quantity
    }))
  }

  if (!!preReqQuestId) {
    quest.predecessor = preReqQuestId
  }

  return quest
}
