import { animations } from "./helpers/animations";
import { EntityShape, QuestGiver, QuestGiverData, QuestGiverShape, QuestGiverShapeType } from "./helpers/types";

interface AiTask {
  code: string;
  priority: number;
  animation?: string;
  animationSpeed?: number;
  attackDurationMs?: number;
  damage?: number;
  damagePlayerAtMs?: number;
  entityCodes?: string[];
  maxcooldown?: number;
  maxduration?: number;
  mincooldown?: number;
  minduration?: number;
  movespeed?: number;
  seekingRange?: number;
  whenInEmotionState?: string;
}

interface Animation {
  code: string;
  animation: string;
  animationSpeed?: number;
  weight?: number;
  blendMode: string;
}

interface Base {
  base: string;
}

interface Behavior {
  code: string;
  showtagonlywhentargeted?: boolean;
  stepHeight?: number;
  selectFromRandomName?: string[];
  minHours?: number;
  maxHours?: number;
  currenthealth?: number;
  maxhealth?: number;
  states?: EmotionState[];
  aitasks?: AiTask[];
  quests?: string[];
  selectrandom?: boolean;
  selectrandomcount?: number;
}

interface EmotionState {
  code: string;
  duration: number;
  chance: number;
  slot: number;
  priority: number;
  accumType: string;
}

interface XY {
  x: number;
  y: number;
}


export interface QuestGiverFileContents {
  code: string;
  class: string;
  canClimb: boolean;
  hitboxSize: XY;
  deadHitboxSize: XY;
  client: {
    renderer: string;
    shape: Base;
    texture: {
      base: string;
      alternates: Base[];
    };
    behaviors: Behavior[];
    animations: Animation[];
  };
  server: {
    attributes: {
      pathfinder: {
        minTurnAnglePerSec: number;
        maxTurnAnglePerSec: number;
      }
    };
    behaviors: Behavior[];
  };
  sounds: {}
}

export const defaultQuestGiverContentsTemplate: QuestGiverFileContents = {
  "code": "acorninnkeeper",
  "class": "EntityAgent",
  "canClimb": true,
  "hitboxSize": {
    "x": 0.6,
    "y": 1.75
  },
  "deadHitboxSize": {
    "x": 0.75,
    "y": 0.5
  },
  "client": {
    "renderer": "Shape",
    "shape": {
      "base": "game:entity/humanoid/trader"
    },
    "texture": {
      "base": "game:entity/humanoid/trader",
      "alternates": [
        {
          "base": "game:entity/humanoid/traderclothes/set1"
        },
        {
          "base": "game:entity/humanoid/traderclothes/set2"
        },
        {
          "base": "game:entity/humanoid/traderclothes/set3"
        },
        {
          "base": "game:entity/humanoid/traderclothes/set4"
        },
        {
          "base": "game:entity/humanoid/traderclothes/set5"
        }
      ]
    },
    "behaviors": [
      {
        "code": "nametag",
        "showtagonlywhentargeted": true
      },
      {
        "code": "repulseagents"
      },
      {
        "code": "controlledphysics",
        "stepHeight": 1.01
      },
      {
        "code": "interpolateposition"
      },
      {
        "code": "questgiver"
      }
    ],
    "animations": [
      {
        "code": "die",
        "animation": "die",
        "animationSpeed": 1.75,
        "weight": 10,
        "blendMode": "addAverage"
      },
      {
        "code": "hurt",
        "animation": "hurt",
        "animationSpeed": 2,
        "blendMode": "addAverage"
      },
      {
        "code": "rowdywelcome",
        "animation": "rowdywelcome",
        "blendMode": "addAverage"
      },
      {
        "code": "lazywelcome",
        "animation": "lazywelcome",
        "blendMode": "addAverage"
      },
      {
        "code": "lazynod",
        "animation": "lazynod",
        "blendMode": "addAverage"
      }
    ]
  },
  "server": {
    "attributes": {
      "pathfinder": {
        "minTurnAnglePerSec": 720,
        "maxTurnAnglePerSec": 1440
      }
    },
    "behaviors": [
      {
        "code": "nametag",
        "showtagonlywhentargeted": true,
        "selectFromRandomName": ["Rosto", "Solom"]
      },
      {
        "code": "repulseagents"
      },
      {
        "code": "controlledphysics",
        "stepHeight": 1.01
      },
      {
        "code": "reviveondeath",
        "minHours": 24,
        "maxHours": 72
      },
      {
        "code": "health",
        "currenthealth": 100,
        "maxhealth": 100
      },
      {
        "code": "emotionstates",
        "states": [
          {
            "code": "aggressiveondamage",
            "duration": 6,
            "chance": 0.6,
            "slot": 0,
            "priority": 2,
            "accumType": "noaccum"
          },
          {
            "code": "fleeondamage",
            "duration": 10,
            "chance": 0.4,
            "slot": 0,
            "priority": 1,
            "accumType": "max"
          }
        ]
      },
      {
        "code": "taskai",
        "aitasks": [
          {
            "code": "meleeattack",
            "entityCodes": ["player"],
            "priority": 2,
            "damage": 1000,
            "mincooldown": 2500,
            "maxcooldown": 3500,
            "attackDurationMs": 900,
            "damagePlayerAtMs": 300,
            "animation": "Attackbalanced",
            "animationSpeed": 2,
            "whenInEmotionState": "aggressiveondamage"
          },
          {
            "code": "seekentity",
            "entityCodes": ["player"],
            "priority": 1.5,
            "mincooldown": 1000,
            "maxcooldown": 1500,
            "seekingRange": 20,
            "movespeed": 0.035,
            "animation": "Runbalanced",
            "animationSpeed": 1.75,
            "whenInEmotionState": "aggressiveondamage"
          },
          {
            "code": "fleeentity",
            "entityCodes": ["player"],
            "priority": 1.5,
            "movespeed": 0.035,
            "seekingRange": 12,
            "animation": "Runbalanced",
            "animationSpeed": 1.75,
            "whenInEmotionState": "fleeondamage"
          },
          {
            "code": "idle",
            "priority": 1.2,
            "minduration": 2500,
            "maxduration": 2500,
            "mincooldown": 2000,
            "maxcooldown": 10000,
            "animation": "laughbalanced"
          },
          {
            "code": "idle",
            "priority": 1.2,
            "minduration": 2500,
            "maxduration": 2500,
            "mincooldown": 5000,
            "maxcooldown": 30000,
            "animation": "idle2"
          },
          {
            "code": "lookaround",
            "priority": 0.5
          }
        ]
      },
      {
        "code": "questgiver",
        "quests": [],
        "selectrandom": false,
        "selectrandomcount": 3
      }
    ]
  },
  "sounds": {}
}

export const traderShape: EntityShape = {
  "displayName": "Trader",
  "mod": "game",
  "id": "trader",
  "type": QuestGiverShapeType.humanoid,
  "textureAlternatives": [
    {
      "type": "humanoid/traderclothes",
      "subTypes": ["set1", "set2", "set3", "set4", "set5"]
    }
  ],
  "additionalAnimations": [
    "rowdywelcome",
    "lazywelcome",
    "lazynod"
  ]
}

interface QuestGiverEntityFileContentsProps {
  giver: QuestGiver,
  shape: EntityShape,
}

export const questGiverEntityFileContents = async ({
  giver,
  shape,
}: QuestGiverEntityFileContentsProps) => {
  const data = defaultQuestGiverContentsTemplate
  
  const entityShapeBase = `${shape.mod}:entity/${shape.type}/${shape.id}`
  const entityShapeAlternates: Base[] = []
  await shape.textureAlternatives.forEach(alt => {
    const baseType = `${shape.mod}:entity/${alt.type}`
    alt.subTypes?.forEach(subAlt => entityShapeAlternates.push({
      base: `${baseType}/${subAlt}`
    }))
  })

  // @ts-ignore
  const additionalAnimations = shape.additionalAnimations?.map(animationId => animations[animationId]) || []
  // @ts-ignore
  const nameTagBehaviorIndex = data.server.behaviors.indexOf((behavior) => behavior.code === "nametag")
  // @ts-ignore
  const reviveOnDeathBehaviorIndex = data.server.behaviors.indexOf((behavior) => behavior.code === "reviveondeath")
  // @ts-ignore
  const healthBehaviorIndex = data.server.behaviors.indexOf((behavior) => behavior.code === "health")
  // @ts-ignore
  const questGiverBehaviorIndex = data.server.behaviors.indexOf((behavior) => behavior.code === "questgiver")

  const formattedQuestIds = giver.quests?.map(quest => `vsquestexample:quest-${quest}`) || []

  data.code = giver.id
  data.client.shape.base = entityShapeBase
  data.client.texture.base = entityShapeBase
  data.client.texture.alternates = entityShapeAlternates
  data.client.animations = [
    animations.dieAnimation,
    animations.hurtAnimation,
    ...additionalAnimations
  ]

  if (!!data.server.behaviors[nameTagBehaviorIndex]?.selectFromRandomName) {
    data.server.behaviors[nameTagBehaviorIndex].selectFromRandomName = giver?.randomizedNames || []
  }
  if (!!data.server.behaviors[reviveOnDeathBehaviorIndex]?.minHours) {
    data.server.behaviors[reviveOnDeathBehaviorIndex].minHours = giver.reviveHours
  }
  if (!!data.server.behaviors[reviveOnDeathBehaviorIndex]?.maxHours) {
    data.server.behaviors[reviveOnDeathBehaviorIndex].maxHours = giver.reviveHours
  }
  if (!!data.server.behaviors[healthBehaviorIndex]?.currenthealth) {
    data.server.behaviors[healthBehaviorIndex].currenthealth = giver.health
  }
  if (!!data.server.behaviors[healthBehaviorIndex]?.maxhealth) {
    data.server.behaviors[healthBehaviorIndex].maxhealth = giver.health
  }
  if (!!data.server.behaviors[questGiverBehaviorIndex]?.quests) {
    data.server.behaviors[questGiverBehaviorIndex].quests = formattedQuestIds
  }

  return JSON.stringify(data)
}
