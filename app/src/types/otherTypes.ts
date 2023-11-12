import { PRESET_KEYS } from "src/variables/constants";

export type LoginData = {
    login: string;
    password: string;
}

export type KeyOfPreset = (typeof PRESET_KEYS)[number];