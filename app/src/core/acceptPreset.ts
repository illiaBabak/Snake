import { getTargetElement } from "src/utils/getTargetElement";
import { addOrEditPreset } from "./addOrEditPreset";
import { getAdminData } from "./getAdminData";
import { openOrCloseModal } from "./openOrCloseModal";
import { getCoreElements } from "./getCoreElements";

export function acceptPreset(key?: string): void {
    const loginInput = getTargetElement('login-input', document.getElementsByTagName('input'));
    const passwordInput = getTargetElement('password-input', document.getElementsByTagName('input'));
    const errorMsg = getTargetElement('error-message-modal', document.getElementsByTagName('div'));
    const {newSpeedText} = getCoreElements();
    if (!loginInput || !passwordInput || !errorMsg || !newSpeedText) return;

    const adminData = getAdminData();
    const isValidAdmin = adminData.some((el) => el.login === loginInput.value && el.password === passwordInput.value);

    if (isValidAdmin) {
        addOrEditPreset(key);
        openOrCloseModal();
        loginInput.value = '';
        passwordInput.value = '';
        errorMsg.classList.add('hidden');
        sessionStorage.setItem('selectedPresetKey', '');
        newSpeedText.innerText = '4';
    } else errorMsg.classList.remove('hidden');
}