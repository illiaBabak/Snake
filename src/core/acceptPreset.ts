import { addOrEditPreset } from './addOrEditPreset';
import { getAdminData } from './getAdminData';
import { openOrCloseModal } from './openOrCloseModal';
import { getCoreElements } from './getCoreElements';
import { DEFAULT_PRESET } from './handleInput';

export function acceptPreset(key?: string): void {
  const { errorMsgModal, loginInput, passwordInput, lineAnimation, newSpeedText, headerText, addPresetButton } =
    getCoreElements();
  if (
    !lineAnimation ||
    !loginInput ||
    !passwordInput ||
    !errorMsgModal ||
    !newSpeedText ||
    !headerText ||
    !addPresetButton
  )
    return;

  const adminData = getAdminData();
  const isValidAdmin = adminData.some((el) => el.login === loginInput.value && el.password === passwordInput.value);

  if (isValidAdmin) {
    addOrEditPreset(key);
    openOrCloseModal();
    loginInput.value = '';
    passwordInput.value = '';
    errorMsgModal.classList.add('hidden');
    newSpeedText.innerText = '4';
    lineAnimation.classList.add('disabled');
    headerText.innerText = 'New preset';
    addPresetButton.innerText = 'Add preset';
    addPresetButton.classList.add('disabled');
    sessionStorage.removeItem('selectedPresetKey');

    const allProperties = Object.keys(DEFAULT_PRESET);
    allProperties.forEach(property => {
      delete DEFAULT_PRESET[property as keyof typeof DEFAULT_PRESET];
    });

  } else errorMsgModal.classList.remove('hidden');
}
