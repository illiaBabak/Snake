import { DefaultSettings } from "src/types/otherTypes"

export const gameSettings = {
    key: '',
    name: '',
    startImg: '',
    colorPage: '',
    shadowColor: '',
    shouldAnimation: false,
    colorSnake: '#151515',
    fieldColor: '#ffc66a',
    shouldShowSettings: true,
    shouldMapFlip: false,
    shouldDirectionFlip: false,
    animationImg: '',
    mapSize: '40',
    speed: '4',
    shouldChangeColor: false,
    shouldOpacity: false,
    shouldObstacles: false,
    shouldTeleport: false,
    shouldChangeSpeed: false
}

export const defaultSettings: DefaultSettings = {
    direction: 1,
    rowLength: 40,
    rotateDirection: false,
    score: 0,
    intervalTime: 700,
    interval: null,
    isPaused: false,
    isGameOver: false,
    canPressKey: true,
    isChangeOpacity: false,
    keysPressed: {},
    currentSnake: [3, 2, 1],
}