interface Objective {
  ids: string[];
  quantity: number;
  description: string;
}

interface Reward {
  id: string;
  quantity: number;
}

export interface QuestData {
  id: string;
  title: string;
  perPlayer: boolean;
  description: string;
  cooldown: number;
  gatherObjectives: Objective[];
  killObjectives: Objective[];
  rewardItems: Reward[];
  preReqQuestId: string;
  questGiverId: string;
}

interface QuestConfigObjective {
  validCodes: string[];
  demand: number;
}

interface QuestConfigItemReward {
  itemCode: string;
  amount: number;
}

export interface QuestConfigFileObj {
  id: string;
  predecessor?: string;
  cooldown: number;
  perPlayer: boolean;
  gatherObjectives?: QuestConfigObjective[];
  killObjectives?: QuestConfigObjective[];
  itemRewards?: QuestConfigItemReward[];
}
