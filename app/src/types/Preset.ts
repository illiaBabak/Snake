export type Preset = {
    key: string;
    name: string;
    shouldShowSettings: boolean;
    colorSnake: string;
    fieldColor: string;
    colorPage: string;
    startImg: string;
    shadowColor: string;
    shouldMapFlip: boolean;
    shouldDirectionFlip: boolean;
    shouldChangeSpeed: boolean;
    shouldOpacity: boolean;
    shouldChangeColor: boolean;
    animationImg: string;
    speed: string;
    shouldObstacles: boolean;
    shouldTeleport: boolean;
    shouldAnimation: boolean;
    mapSize: string;
};

export type KeysPressed = Record<string, boolean>