import { kill } from "process";
import { QuestData } from "../routes/types/questDataTypes";

export interface GatherObjective {
  validCodes: string[];
  demand: number;
}

interface ItemReward {
  itemCode: string;
  amount: number;
}

interface QuestConfig {
  id: string;
  cooldown: number;
  perPlayer: boolean;
  gatherObjectives?: GatherObjective[];
  killObjectives?: GatherObjective[];
  itemRewards?: ItemReward[];
}

export const generateQuestConfigFileContents = async (quests: QuestData[]) => {
  const contents: QuestConfig[] = []

  await quests.forEach(quest => {
    const {
      id,
      cooldown,
      perPlayer,
      gatherObjectives,
      killObjectives,
      rewardItems,
    } = quest

    const questObj: QuestConfig = {
      id: `vsquestexample:quest-${id}`,
      cooldown: cooldown,
      perPlayer: perPlayer,
    }

    const gatherObjectivesList = gatherObjectives?.map(obj => ({
      validCodes: [...obj.ids],
      demand: obj.quantity
    })) || []
    questObj.gatherObjectives = gatherObjectivesList

    const killObjectivesList = killObjectives?.map(obj => ({
      validCodes: [...obj.ids],
      demand: obj.quantity
    })) || []
    questObj.killObjectives = killObjectivesList

    const itemRewardsList = rewardItems?.map(item => ({
      itemCode: item.id,
      amount: item.quantity
    })) || []
    questObj.itemRewards = itemRewardsList

    contents.push(questObj)
  })

  return JSON.stringify(contents)
}