import { getTargetElement } from './utils/getTargetElement';

export function showOrHideSettings(isClose: boolean): void {
  const showTutorial = getTargetElement('show-tutorial', document.getElementsByTagName('div'));
  const settingsDiv = getTargetElement('settings', document.getElementsByTagName('div'));

  if (isClose) {
    showTutorial?.classList.remove('hidden');
    settingsDiv?.classList.add('hidden');
  } else {
    showTutorial?.classList.add('hidden');
    settingsDiv?.classList.remove('hidden');
  }
}
