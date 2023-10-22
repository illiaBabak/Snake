import { Preset } from "src/types/Preset";

export const ACCELERATION_FACTOR = 0.96;
export const CLASSES_TO_REMOVE_AFTER_START = ['snake', 'apple', 'super-apple'];
export const CLASSES_TO_REMOVE_IN_APPLE = ['first-teleport', 'second-teleport', 'teleport-el', 'obstacle-el'];
export const KEY_PRESS_COOLDOWN = 0.64;
export const MAX_CHANCE = 15;
export const SPEED_MAP = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const DEFAULT_PRESETS: Preset[] = [
    {
        showSettings: true,
        colorSnake: '#151515',
        fieldColor: '#6b0f0f',
        colorPage: '#151515',
        startImg: 'https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png',
        feature: '',
        shadowColor: '#5e0680'
    },
    {
        showSettings: false,
        colorSnake: 'white',
        fieldColor: '#121212',
        colorPage: '#121212',
        startImg:
            'https://media.istockphoto.com/id/491560070/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/pixel-%D0%B2%D0%B8%D0%B4%D0%B5-%D1%87%D0%B5%D1%80%D0%B5%D0%BF%D0%B0.jpg?s=612x612&w=0&k=20&c=QMgEHQhal_9rN0_Rif7ZN1grn5i3qubEgMy2MIRxnDY=',
        feature: 'horror',
        shadowColor: '#121212'
    },
    {
        showSettings: false,
        colorSnake: '#f16623',
        fieldColor: 'orange',
        colorPage: '#f16623',
        startImg: 'https://cdn.create.vista.com/api/media/small/495186282/stock-vector-pixel-art-halloween-cute-pumpkin',
        feature: 'halloween',
        shadowColor: 'orange'
    },
    {
        showSettings: false,
        colorSnake: '#6bc4fe',
        fieldColor: 'white',
        colorPage: '#6bc4fe',
        startImg: 'https://t3.ftcdn.net/jpg/03/09/09/50/360_F_309095003_4T1lAFRsa0siw4gg4dVfw5aOq84CbWWW.jpg',
        feature: 'winter',
        shadowColor: 'white'
    },
    {
        showSettings: false,
        colorSnake: '#8cb708',
        fieldColor: '#008001',
        colorPage: '#8cb708',
        startImg: 'https://as1.ftcdn.net/v2/jpg/03/73/64/24/1000_F_373642410_JKAcLFw9HFzpmS7FxVxAD2UG52fAkMpu.jpg',
        feature: 'jungle',
        shadowColor: '#008001'
    },
];