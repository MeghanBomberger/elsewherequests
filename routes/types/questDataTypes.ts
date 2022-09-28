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
  preReqQuestIds: string[];
  questGiverId: string;
}
