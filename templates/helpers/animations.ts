import { Animation } from "./types";

const idleAnimation: Animation = {
  code: "idle",
  animation: "idle",
  blendMode: "AddAverage",
  easeOutSpeed: 4,
  triggeredBy: {
    defaultAnim: true,
  },
};

const sleepAnimation = {
  code: "sleep",
  animation: "sleep",
  easeInSpeed: 4,
  easeOutSpeed: 4,
  blendMode: "average",
};

const sitAnimation = {
  code: "sit",
  animation: "sit",
  easeInSpeed: 4,
  easeOutSpeed: 4,
  blendMode: "average",
};

const dieAnimation: Animation = {
  code: "die",
  animation: "die",
  animationSpeed: 1.75,
  weight: 10,
  blendMode: "AddAverage",
};

const hurtAnimation: Animation = {
  code: "hurt",
  animation: "hurt",
  animationSpeed: 2,
  blendMode: "AddAverage",
};

const rowdyWelcomeAnimation: Animation = {
  code: "rowdywelcome",
  animation: "rowdywelcome",
  blendMode: "AddAverage",
};

const lazyWelcomeAnimation: Animation = {
  code: "lazywelcome",
  animation: "lazywelcome",
  blendMode: "AddAverage",
};

const lazyNodAnimation: Animation = {
  code: "lazynod",
  animation: "lazynod",
  blendMode: "AddAverage",
};

export const animations = {
  dieAnimation,
  hurtAnimation,
  idleAnimation,
  lazyNodAnimation,
  lazyWelcomeAnimation,
  rowdyWelcomeAnimation,
  sitAnimation,
  sleepAnimation,
};
