export const actionTypes = {
  ranch: {
    ADD_TIME: "ADD_TIME",
    ADD_GOLD: "ADD_GOLD",
    SPEND_GOLD: "SPEND_GOLD",
  },
  chicken: {
    KILL_CHICKEN: "KILL_CHICKEN",
    FEED_CHICKEN: "FEED_CHICKEN",
    HATCH_CHICKEN: "HATCH_CHICKEN",
    MAKE_HUNGRY: "MAKE_HUNGRY",
  },
  egg: {
    LAY_EGG: "LAY_EGG",
    REMOVE_EGG: "REMOVE_EGG",
  },
}

export const ranchConstants = {
  GAME_CYCLE_MS: 500,
}

export const chickenConstants = {
  YOUNG_AGE: (24 * 3),
  CHANCE_HUNGRY: 0.02,
  CHANCE_LAY: 0.025,
  TIME_TO_DEATH: 30,
  FEED_PRICE: 10,
}

export const eggConstants = {
  HATCHABLE_CHANCE: 0.25,
  DEFAULT_GOLD_VALUE: 10,
  INCUBATION_TIME: (ranchConstants.GAME_CYCLE_MS * 30),
  MAX_EGGS_PER_CHICKEN: 3,
}