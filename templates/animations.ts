import { Animation } from "./types"

export const idleAnimation: Animation = {
  "code": "idle",
  "animation": "idle",
  "blendMode": "addAverage",
  "easeOutSpeed": 4,
  "triggeredBy": {
    "defaultAnim": true
  }
}

export const sleepAnimation = {
  "code": "sleep",
  "animation": "sleep",
  "easeInSpeed": 4,
  "easeOutSpeed": 4,
  "blendMode": "average"
}

export const sitAnimation = {
  "code": "sit",
  "animation": "sit",
  "easeInSpeed": 4,
  "easeOutSpeed": 4,
  "blendMode": "average"
}

export const dieAnimation: Animation = {
  "code": "die",
  "animation": "die",
  "animationSpeed": 1.75,
  "weight": 10,
  "blendMode": "addAverage"
}

export const hurtAnimation: Animation = {
  "code": "hurt",
  "animation": "hurt",
  "animationSpeed": 2,
  "blendMode": "addAverage"
}

export const rowdyWelcomeAnimation: Animation = {
  code: "rowdywelcome",
  animation: "rowdywelcome",
  blendMode: "addAverage"
}

export const lazyWelcomeAnimation: Animation = {
  code: "lazywelcome",
  animation: "lazywelcome",
  blendMode: "addAverage"
}

export const lazyNodAnimation: Animation = {
  code: "lazynod",
  animation: "lazynod",
  blendMode: "addAverage"
}
