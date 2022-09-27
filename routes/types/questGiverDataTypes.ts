import { EntityShape } from "../../templates/helpers/types";

export interface QuestGiver {
  id: string;
  name: string;
  shape: string;
  quests: string[];
  damage: number;
  health: number;
  reviveHours: number;
  randomizedNames: string[];
}

export interface TextureAlternative {
  type: string;
  subTypes: string[];
}

export interface QuestGiverShape {
  displayName: string;
  mod: string;
  id: string;
  type: string;
  textureAlternatives: TextureAlternative[];
  additionalAnimations?: string[];
}

export interface QuestGiverData {
  questGivers: QuestGiver[];
  questGiverShapes: EntityShape[];
}