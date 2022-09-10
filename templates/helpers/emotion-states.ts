import { EmotionState, AccumType } from './types'

export const aggressiveOnDamageEmotionState: EmotionState = {
  code: "aggressiveondamage",
  duration: 6,
  chance: 0.6,
  slot: 0,
  priority: 2,
  accumType: AccumType.noaccum
}

export const fleeOnDamageEmotionState: EmotionState = {
  code: "fleeondamage",
  duration: 10,
  chance: 0.4,
  slot: 0,
  priority: 1,
  accumType: AccumType.max
}
