
export const CHALKWORLD_URL: string = "http://127.0.0.1:5173"
export const CHALKBOARD_URL: string = "http://localhost:3000"

// Exported from the world app
export const BOARD_NAVIGATION = [
  {"pointTarget":{"x":1159.9999809265137,"y":0},"name":"Home","color":"#ffffff"},
  {"pointTarget":{"x":289.7245311737061,"y":0},"name":"Map","color":"#a1cf81"},
  {"pointTarget":{"x":386.8071937561036,"y":0},"name":"Papers","color":"#9478c6"},
  {"pointTarget":{"x":409.35074329376226,"y":0},"name":"Experience","color":"#c8c4b1"}
]

export const WORLD_EXISTS_STATE = "world"
export const WORLD_NOT_EXISTS_STATE = "web"
export const WORLD_STATES = [{world: WORLD_EXISTS_STATE}, {world: WORLD_NOT_EXISTS_STATE}] as const
