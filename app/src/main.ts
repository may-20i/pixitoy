import { animate, generateSpriteMap, initialize } from "./utils"
import { CONSTANTS } from "./constants"

const { app, container, graphics } = initialize();

const spriteMap = generateSpriteMap<keyof typeof CONSTANTS.spriteImportDefinitions>(CONSTANTS.spriteImportDefinitions);

const draw = () => {
  app.renderer.clear(); // Clear the renderer
};

animate(app, draw);
