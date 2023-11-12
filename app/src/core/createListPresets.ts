import { getTargetElement } from "src/utils/getTargetElement";
import { DEFAULT_PRESETS } from "src/variables/constants";
import { addPresetsListeners } from "./addPresetsListeners";
import { getPresetsFromLocalStorage } from "./getPresetsFromLocalStorage";
import { deletePreset } from "./deletePreset";
import { editPreset } from "./editPreset";

export function createListPresets(isAdmin?: boolean): void {
    const list = getTargetElement(isAdmin ? 'list-wrapper-panel' : 'list-wrapper', document.getElementsByTagName('div'));
    if (!list) return;

    list.innerHTML = '';

    const data = getPresetsFromLocalStorage();
    const presetsToShow = isAdmin ? data : [...DEFAULT_PRESETS, ...data];

    for (let i = 0; i < presetsToShow.length; i++) {
        const listEl = document.createElement('div');
        listEl.classList.add(isAdmin ? 'list-el-admin' : 'list-el');
        listEl.innerText = presetsToShow[i].name;

        if (isAdmin) {
            const editButton = document.createElement('img');
            editButton.setAttribute('src', '/content/edit_button.png')
            editButton.addEventListener('click', () => editPreset(presetsToShow[i].key));
            listEl.appendChild(editButton);

            const deleteButton = document.createElement('div');
            deleteButton.classList.add('delete-button');
            deleteButton.innerText = 'x';
            deleteButton.addEventListener('click', () => deletePreset(presetsToShow[i].key));
            listEl.appendChild(deleteButton);
        }

        list.appendChild(listEl);
    }

    if (!isAdmin) addPresetsListeners();
}