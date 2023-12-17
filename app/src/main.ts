import { animate, calculateTileSize, createSprite, generateCells, getMaxWindowSize, initialize } from "./utils"
import { CONSTANTS } from "./constants"
import { generateMazeDfs } from "./maze";

const map = generateCells(10, 0);
const { app, container, graphics, spriteMap } = initialize<keyof typeof CONSTANTS.spriteImportDefinitions>(CONSTANTS.spriteImportDefinitions, map.length);

const randomCoordinate = {
  x: Math.floor(Math.random() * map.length),
  y: Math.random() > 0.5 ? 0 : map.length - 1
}

map[randomCoordinate.x][randomCoordinate.y] = 1;

generateMazeDfs(map, {x: 0, y: 0})

const draw = () => {
  app.renderer.clear(); // Clear the renderer
  container.removeChildren(); // Clear the container

  const tileSize = calculateTileSize(map.length);

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map.length; y++) {
      const cell = map[x][y];

      if (cell < 1) {
        continue;
      }
      const sprite = createSprite(spriteMap.floor_0);

      sprite.x = x * tileSize;
      sprite.y = y * tileSize;

      container.addChild(sprite);
    }
  }

  app.renderer.render(container);
};

animate(app, draw)