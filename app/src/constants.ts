import { SpriteImportDefinition } from "./utils"

export const CONSTANTS = {
  spriteImportDefinitions: {
    floor_0: {
      path: "floor_1.png",
      size: 16,
    }
  } satisfies Record<string, SpriteImportDefinition>,
} as const