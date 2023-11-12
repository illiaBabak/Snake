export type Preset = {
    key: string;
    name: string;
    showSettings: boolean;
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

export type KeysPressed = {
    [key: string]: boolean;
};