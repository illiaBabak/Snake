import { PRESET_KEYS } from "src/variables/constants";
import { KeysPressed } from "./preset";

export type LoginData = {
    login: string;
    password: string;
}

export type KeyOfPreset = (typeof PRESET_KEYS)[number];

export type DefaultSettings = {
    direction: number,
    rowLength: number,
    rotateDirection: boolean,
    score: number,
    intervalTime: number,
    interval: NodeJS.Timeout | null,
    isPaused: boolean,
    isGameOver: boolean,
    canPressKey: boolean,
    isChangeOpacity: boolean,
    keysPressed: KeysPressed,
    currentSnake: number[];
}