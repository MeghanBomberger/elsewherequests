import { 
  AITask, 
  Behavior, 
  EmotionState, 
  MinMaxHours,
  QuestGiverBehavior, 
} from "./types"

export const controlledPhysicsBehavior: Behavior = {
  code: "controlledphysics",
  stepHeight: 1.01
}

export const interpolatePositionBehavior: Behavior = {
  code: "interpolateposition"
}

export const nameTagClientBehavior: Behavior = {
  code: "nametag",
  showtagonlywhentargeted: true,
}

export const nameTagServerBehavior = (names: string[]): Behavior => ({
  ...nameTagClientBehavior,
  selectFromRandomName: names,
})

export const questGiverClientBehavior: Behavior = {
  code: "questgiver"
}

export const questGiverServerBehavior = ({
  questIds = [],
  canSelectRandom = false,
  selectRandomCount = 1,
}: QuestGiverBehavior): Behavior => {
  return {
    code: "questgiver",
    quests: questIds,
    selectrandom: canSelectRandom,
    selectrandomcount: selectRandomCount,
  }
}

export const repulseAgentsBehavior: Behavior = {
  code: "repulseagents"
}

export const reviveOnDeathBehavior = ({min = 24, max = 72}: MinMaxHours): Behavior => ({
  code: "reviveondeath",
  minHours: min,
  maxHours: min < max ? max : min
})

export const healthBehavior = (health: number): Behavior => ({
  code: "health",
  currenthealth: health || 100,
  maxhealth: health || 100
})

export const emotionStatesBehavior = (emotions: EmotionState[]): Behavior => ({
  code: "emotionstates",
  states: emotions
})

export const taskAIBehavior = (tasks: AITask[]): Behavior => ({
  code: "taskai",
  aitasks: tasks
})
