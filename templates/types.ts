// Some of the cases are mismatched. This is due to inconsistancies between the multiple APIs involved between the game itself and the various mods. Sorry, it hurts my heart too.

export interface Objective {
  itemIds: string[];
  quantity: number;
  description: string;
}

export interface Reward {
  itemId: string[];
  quantity: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  gatherObjectives: Objective[];
  rewards: Reward[];
}

export interface QuestGiver {
  id: string;
  name: string;
  randomizedName: string[];
  health: number;
  reviveHours: number;
  damage: number;
  quests: Quest[];
}

export enum QuestGiverShapeType {
  humanoid = "humanoid",
  land = "land"
}

export interface TextureAlternative {
  type: string;
  subTypes?: string[];
}

export interface EntityShape {
  displayName: string;
  mod: string;
  name: string;
  type: QuestGiverShapeType;
  textureAlternatives: TextureAlternative[];
  animations: Animation[];
}

export interface QuestGiverShape {
  id: string;
  mod: string;
  name: string;
  type: QuestGiverShapeType;
  alternativePath: string;
  alternatives: string[];
  animationIds: string[];
}

export enum CityRoles {
  cooking = "Cooking",
  digging = "Digging",
  farming = "Farming",
  forestry = "Forestry",
  husbandry = "Husbandry",
  metalWorking = "Metal Working",
  mining = "Mining",
  pottery = "Pottery",
  spawn = "Spawn"
}

export interface City {
  name: string;
  role: CityRoles;
}

export interface Location {
  name: string;
  city: string;
}

export interface Item {
  id: string;
  name: string;
  mod: string;
  attribute: string[];
}

export enum AccumType {
  noaccum = "noaccum",
  max = "max",
}

export interface EmotionState {
  code: string;
  duration: number;
  chance: number;
  slot: number;
  priority: number;
  accumType: AccumType;
}

export interface AITask {
  code: string;
  entityCodes?: string[];
  priority: number;
  damage?: number;
  mincooldown?: number;
  maxcooldown?: number;
  attackDurationMs?: number;
  damagePlayerAtMs?: number;
  seekingRange?: number;
  movespeed?: number;
  animation?: string;
  animationSpeed?: number;
  whenInEmotionState?: string;
  minduration?: number;
  maxduration?: number;
}

export interface Behavior {
  code: string;
  showtagonlywhentargeted?: boolean;
  stepHeight?: number;
  selectFromRandomName?: string[];
  minHours?: number;
  maxHours?: number;
  currenthealth?: number;
  maxhealth?: number;
  states?: EmotionState[];
  aitasks?: AITask[];
  quests?: string[];
  selectrandom?: boolean;
  selectrandomcount?: number;
}

export interface Animation {
  code: string;
  animation: string;
  animationSpeed?: number;
  weight?: number;
  blendMode: "addAverage";
  easeInSpeed?: number;
  easeOutSpeed?: number;
  triggeredBy?: {
    defaultAnim: boolean;
  };
}

export interface Coords {
  x: number;
  y: number;
}

export interface Base {
  base: string;
}

export interface Textures extends Base {
  alternates: Base[];
}

export interface MinMaxHours {
  min: number;
  max: number;
}

export interface QuestGiverBehavior {
  questIds?: string[];
  canSelectRandom?: boolean;
  selectRandomCount?: number;
}
