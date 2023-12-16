import * as PIXI from "pixijs";

export const getMaxWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return Math.min(width, height);
}

export const initialize = () => {
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

    window.addEventListener("resize", () => {
        handleSizeChange(app);
    })

    return { app, graphics, container };
}

export const handleSizeChange = (app: PIXI.Application<HTMLCanvasElement>) => {
    const width = getMaxWindowSize();
    const height = getMaxWindowSize();

    app.renderer.resize(width, height);
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

export const generateSpriteMap = <T extends string>(spriteImportDefinitions: Record<string, SpriteImportDefinition>, prefix = "assets/") => {
    const spriteMap: Record<string, PIXI.Sprite> = {};

    const keys = Object.keys(spriteImportDefinitions);

    for (const key of keys) {
        const definition = spriteImportDefinitions[key];
        const sprite = loadSprite(definition.path, definition.anchor, prefix);

        spriteMap[key] = sprite;
    }

    return spriteMap as Record<T, PIXI.Sprite>;
}

export const animate = (app: PIXI.Application<HTMLCanvasElement>, draw: () => void) => {
    app.ticker.add(() => {
        draw();
    });
}