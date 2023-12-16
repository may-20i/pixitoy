import { animate, generateCells, generateSpriteMap, initialize } from "./utils"
import { CONSTANTS } from "./constants"

const { app, container, graphics } = initialize();

const map = generateCells(10);
const spriteMap = generateSpriteMap<keyof typeof CONSTANTS.spriteImportDefinitions>(CONSTANTS.spriteImportDefinitions);
const tile_size = 16;
const keys = Object.keys(spriteMap);

for (const key of keys) {
  const sprite = spriteMap[key];

  sprite.width = tile_size;
  sprite.height = tile_size;
}

const draw = () => {
  app.renderer.clear(); // Clear the renderer
};

animate(app, draw);
