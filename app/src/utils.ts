import * as PIXI from "pixijs";

export const getMaxWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return Math.min(width, height);
}

export const initialize = <T extends string>(spriteImportDefinitions: Record<string, SpriteImportDefinition>, gridSize: number) => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    width: getMaxWindowSize(),
    height: getMaxWindowSize(),
    backgroundColor: 0x000000,
    antialias: true,
    resolution: 1,
  });

  const element = document.querySelector<HTMLElement>("#app")!;
  element.appendChild(app.view);

  const container = new PIXI.Container();
  app.stage.addChild(container);

  const graphics = new PIXI.Graphics();
  container.addChild(graphics);

  const spriteMap = generateSpriteMap<T>(spriteImportDefinitions);

  const tileSize = getMaxWindowSize() / gridSize;

  window.addEventListener("resize", () => {
    handleSizeChange(app, spriteMap, tileSize);
  })

  handleSizeChange(app, spriteMap, tileSize);

  return { app, graphics, container, spriteMap, tileSize };
}

export const handleSizeChange = (app: PIXI.Application<HTMLCanvasElement>, spriteMap: Record<string, PIXI.Sprite>, tileSize: number) => {
  console.log("handleSizeChange");
  const size = getMaxWindowSize();

  const width = size
  const height = size

  app.renderer.resize(width, height);

  for (const key of Object.keys(spriteMap)) {
    const sprite = spriteMap[key];

    sprite.width = tileSize;
    sprite.height = tileSize;
  }
}

export const loadSprite = (path: string, anchor?: Partial<{x: number, y: number}>, prefix = "assets/") => {
  const sprite = PIXI.Sprite.from(`${prefix}${path}`);

  sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  if (anchor) {
    sprite.anchor.set(anchor.x, anchor.y);
  }

  return sprite;
}

export type SpriteImportDefinition = {
  path: string,
  width: number,
  height: number,
  anchor?: Partial<{x: number, y: number}>,
} | {
  path: string,
  size?: number,
  anchor?: Partial<{x: number, y: number}>,
}

const generateSpriteMap = <T extends string>(spriteImportDefinitions: Record<string, SpriteImportDefinition>, prefix = "assets/") => {
  const spriteMap: Record<string, PIXI.Sprite> = {};

  const keys = Object.keys(spriteImportDefinitions);

  for (const key of keys) {
    const definition = spriteImportDefinitions[key];
    const sprite = loadSprite(definition.path, definition.anchor, prefix);

    spriteMap[key] = sprite;
  }

  return spriteMap as (Record<T, PIXI.Sprite> & Record<string, PIXI.Sprite>);
}

export const createSprite = (sprite: PIXI.Sprite) => {
  const newSprite = new PIXI.Sprite(sprite.texture);

  newSprite.anchor.set(sprite.anchor.x, sprite.anchor.y);
  newSprite.width = sprite.width;
  newSprite.height = sprite.height;

  return newSprite;
}

export const generateCells = (size: number) => {
  const cells: number[][] = [];

  for (let x = 0; x < size; x++) {
    cells[x] = [];

    for (let y = 0; y < size; y++) {
      cells[x][y] = 0;
    }
  }

  return cells;
}

export const animate = (app: PIXI.Application<HTMLCanvasElement>, draw: () => void) => {
  app.ticker.add(() => {
    draw();
  });
}