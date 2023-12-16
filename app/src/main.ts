import { animate, calculateTileSize, createSprite, generateCells, getMaxWindowSize, initialize } from "./utils"
import { CONSTANTS } from "./constants"

const map = generateCells(20);
const { app, container, graphics, spriteMap } = initialize<keyof typeof CONSTANTS.spriteImportDefinitions>(CONSTANTS.spriteImportDefinitions, map.length);

map.forEach((row, x) => {
  row.forEach((_cell, y) => {
    // draw outer boundary, y = 0 || y = map.length - 1 || x = 0 || x = map.length - 1
    if (y === 0 || y === map.length - 1 || x === 0 || x === map.length - 1) {
      map[x][y] = 1;
    }
  })
})

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

animate(app, draw);