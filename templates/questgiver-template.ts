import { 
  AITask,
  Animation,
  Base,
  Behavior,
  Coords,
  EmotionState,
  EntityShape,
  MinMaxHours,
  Textures,
} from "./types"
import * as behaviors from './behaviors'
import * as aiTasks from './ai-tasks'
import * as emotionStates from './emotion-states'

interface QuestGiverObj {
  code: string;
  class: "EntityAgent";
  canClimb: boolean;
  hitboxSize: Coords;
  deadHitboxSize: Coords;
  client: {
    renderer: "Shape";
    shape: Base;
    texture: Textures;
    behaviors: Behavior[];
    animations: Animation[];
  };
  server: {
    attributes: {
      pathfinder: {
        minTurnAnglePerSec: 720;
        maxTurnAnglePerSec: 1440;
      }
    };
    behaviors: Behavior[];
  },
  sounds: {}
}

export interface QuestGiverTemplateProps {
  id: string;
  entityShape: EntityShape;
  names: string[];
  reviveOnDeath?: MinMaxHours;
  health?: number;
  emotions?: EmotionState[];
  additionalTasks?: AITask[];
  quests?: string[];
  canSelectRandomQuests?: boolean;
  selectRandomQuestsCount?: number;
  attackPower?: number;
  canAttackPlayer?: boolean;
  attackableEntities?: string[];
  speed?: number;
  seekRange?: number;
}

export const questGiverTemplate = ({
  id,
  entityShape,
  names = ['Mysterious Stranger'],
  reviveOnDeath = {
    min: 24,
    max: 72
  },
  health = 100,
  emotions = [
    emotionStates.aggressiveOnDamageEmotionState,
    emotionStates.fleeOnDamageEmotionState,
  ],
  additionalTasks = [],
  quests = [],
  canSelectRandomQuests = false,
  selectRandomQuestsCount = 1,
  attackPower = 1000,
  canAttackPlayer = true,
  attackableEntities = [],
  speed = 0.035,
  seekRange = 12,
}: QuestGiverTemplateProps): QuestGiverObj => {
  const entityShapeId = `${entityShape.mod}:${entityShape.type}/${entityShape.name}`
  const textureAlternatives: Base[] = []
  entityShape.textureAlternatives?.forEach(alt => {
    const altBase = `${entityShape.mod}:${entityShape.type}/${alt.type}`
    if (!alt.subTypes) {
      textureAlternatives.push({
        base: altBase
      })
      return
    }
    alt.subTypes?.forEach(subAlt => textureAlternatives.push({
      base: `${altBase}/${subAlt}`
    }))
  })

  const tasks: AITask[] = [
    aiTasks.meleeAttackTask({
      damage: attackPower,
      attackEntities: attackableEntities,
      attackPlayer: canAttackPlayer
    }),
    aiTasks.seekEntityTask({
      speed,
      attackEntities: attackableEntities,
      attackPlayer: canAttackPlayer,
    }),
    aiTasks.fleeEntityTask({
      speed,
      attackEntities: attackableEntities,
      attackPlayer: canAttackPlayer,
      seekRange
    }),
  ]
  !!additionalTasks?.length && tasks.push(...additionalTasks)

  return {
    code: id,
    class: "EntityAgent",
    canClimb: true,
    hitboxSize: {
      x: 0.6,
      y: 0.5
    },
    deadHitboxSize: {
      x: 0.75,
      y: 0.5
    },
    client: {
      renderer: "Shape",
      shape: {
        base: entityShapeId
      },
      texture: {
        base: entityShapeId,
        alternates: textureAlternatives
      },
      behaviors: [
        behaviors.nameTagClientBehavior,
        behaviors.repulseAgentsBehavior,
        behaviors.controlledPhysicsBehavior,
        behaviors.interpolatePositionBehavior,
        behaviors.questGiverClientBehavior,
      ],
      animations: entityShape.animations,
    },
    server: {
      attributes: {
        pathfinder: {
          minTurnAnglePerSec: 720,
          maxTurnAnglePerSec: 1440
        }
      },
      behaviors: [
        behaviors.nameTagServerBehavior(names),
        behaviors.repulseAgentsBehavior,
        behaviors.controlledPhysicsBehavior,
        behaviors.reviveOnDeathBehavior(reviveOnDeath),
        behaviors.healthBehavior(health),
        behaviors.emotionStatesBehavior(emotions),
        behaviors.taskAIBehavior(tasks),
        behaviors.questGiverServerBehavior({
          questIds: quests,
          canSelectRandom: canSelectRandomQuests,
          selectRandomCount: selectRandomQuestsCount,
        }),
      ]
    },
    sounds: {}
  }
}