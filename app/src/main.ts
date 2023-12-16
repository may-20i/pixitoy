import { animate, createSprite, generateCells, getMaxWindowSize, initialize } from "./utils"
import { CONSTANTS } from "./constants"

const map = generateCells(10);
const { app, container, graphics, spriteMap, tileSize } = initialize<keyof typeof CONSTANTS.spriteImportDefinitions>(CONSTANTS.spriteImportDefinitions, map.length);

const draw = () => {
  app.renderer.clear(); // Clear the renderer
  container.removeChildren(); // Clear the container

  map.forEach((row, x) => {
    row.forEach((cell, y) => {
      const sprite = createSprite(spriteMap.floor_0);

      sprite.x = x * tileSize;
      sprite.y = y * tileSize;

      container.addChild(sprite);
    });
  });

  app.renderer.render(container);
  window.requestAnimationFrame(draw);
};

draw();