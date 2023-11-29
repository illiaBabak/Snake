import { ChangeEvent } from 'react';
import { getCoreElements } from './getCoreElements';
import { PRESET_KEYS } from 'src/variables/constants';
import { showAlert } from './showAlert';
import { removeAlert } from './removeAlert';
import { KeyOfPreset } from 'src/types/otherTypes';
import { getPresetsFromLocalStorage } from './getPresetsFromLocalStorage';

const REQUIRED_FIELDS: KeyOfPreset[] = ['name', 'startImg', 'animationImg'];
const COLOR_FIELDS = ['fieldColor', 'colorSnake'];

const FIELDS_SET = new Set<KeyOfPreset | string>(PRESET_KEYS);
const isKeyOfPreset = (value: string): value is KeyOfPreset => FIELDS_SET.has(value);
const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const DEFAULT_PRESET: Partial<Record<KeyOfPreset, string | boolean>> = {};

export const handleInput = ({ currentTarget }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
  const key = sessionStorage.getItem('selectedPresetKey');

  const data = getPresetsFromLocalStorage();
  const preset = data.find((obj) => obj.key === key);

  const presetInfo: Partial<Record<KeyOfPreset, string | boolean>> = preset ?? DEFAULT_PRESET;

  const { addPresetButton } = getCoreElements();
  if (!addPresetButton) return;

  const { name, value, labels } = currentTarget;

  if (!isKeyOfPreset(name)) return;

  if ('checked' in currentTarget && typeof presetInfo[name] === 'boolean') presetInfo[name] = currentTarget.checked;
  else presetInfo[name] = value;

  const { fieldColor, colorSnake, shouldAnimation } = presetInfo;
  const isDifferentColor = fieldColor !== colorSnake;

  const isEnabled =
    isDifferentColor &&
    REQUIRED_FIELDS.every((field) => {
      if (!isString(presetInfo[field])) return true;

      return field === 'animationImg'
        ? !shouldAnimation || (presetInfo[field] as string)?.trim()
        : (presetInfo[field] as string)?.trim();
    });

  addPresetButton.classList.toggle('disabled', !isEnabled);

  if (!value && REQUIRED_FIELDS.some((field) => field === name)) {
    const headerTag = labels?.[0].getElementsByTagName('h3')[0];
    const errorText = `*${headerTag?.innerText ?? ''} is required`;
    showAlert(errorText);
  } else if (COLOR_FIELDS.some((field) => field === name) && fieldColor === colorSnake) {
    const errorText = `*Colors should be different`;
    showAlert(errorText);
  } else removeAlert();
};
