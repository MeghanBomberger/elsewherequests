import { AITask } from "./types"

interface MeleeAttackTaskProps {
  damage?: number;
  attackEntities: string[];
  attackPlayer: boolean;
}
export const meleeAttackTask = ({
  damage = 1000,
  attackEntities,
  attackPlayer,
}: MeleeAttackTaskProps): AITask => {
  const entities: string[] = []
  !!attackPlayer && entities.push("player")
  !!attackEntities?.length && entities.push(...attackEntities)
  return {
    code: "meleeattack",
    entityCodes: entities,
    priority: 2,
    damage: damage,
    mincooldown: 2500,
    maxcooldown: 3500,
    attackDurationMs: 900,
    damagePlayerAtMs: 300,
    animation: "Attackbalanced",
    animationSpeed: 2,
    whenInEmotionState: "aggressiveondamage"
  }
}

interface SeekEntityTaskProps {
  speed: number; 
  attackEntities: string[]; 
  attackPlayer: boolean;
}
export const seekEntityTask = ({
  speed = 0.035,
  attackEntities,
  attackPlayer = false
}: SeekEntityTaskProps): AITask => {
  const entities: string[] = []
  !!attackPlayer && entities.push("player")
  !!attackEntities?.length && entities.push(...attackEntities)
  return {
    code: "seekentity",
    entityCodes: entities,
    priority: 1.5,
    mincooldown: 1000,
    maxcooldown: 1500,
    seekingRange: 20,
    movespeed: speed,
    animation: "Runbalanced",
    animationSpeed: 1.75,
    whenInEmotionState: "aggressiveondamage"
  }
}

interface FleeEntityTaskProps extends SeekEntityTaskProps {
  seekRange?: number;
}

export const fleeEntityTask = ({
  speed = 0.035,
  attackEntities,
  attackPlayer = false,
  seekRange = 12,
}: FleeEntityTaskProps): AITask => {
  const entities: string[] = []
  !!attackPlayer && entities.push("player")
  !!attackEntities?.length && entities.push(...attackEntities)
  return {
    code: "fleeentity",
    entityCodes: entities,
    priority: 1.5,
    movespeed: speed,
    seekingRange: seekRange,
    animation: "Runbalanced",
    animationSpeed: 1.75,
    whenInEmotionState: "fleeondamage"
  }
}

export const laughIdleTask: AITask = {
  code: "idle",
  priority: 1.2,
  minduration: 2500,
  maxduration: 2500,
  mincooldown: 2000,
  maxcooldown: 10000,
  animation: "laughbalanced"
}

export const idleTask: AITask = {
  code: "idle",
  priority: 1.2,
  minduration: 2500,
  maxduration: 2500,
  mincooldown: 5000,
  maxcooldown: 30000,
  animation: "idle2"
}

export const lookAroundTask: AITask = {
  code: "lookaround",
  priority: 0.5
}
