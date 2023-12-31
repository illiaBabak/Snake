import { getTargetElement } from 'src/utils/getTargetElement';
import { getTargetElements } from 'src/utils/getTargetElements';

type ReturnValue = {
  container?: HTMLDivElement;
  overlayStart?: HTMLDivElement;
  tutorialOverlay?: HTMLDivElement;
  map?: HTMLDivElement;
  panel?: HTMLDivElement;
  showTutorialButton?: HTMLDivElement;
  closeTutorialButton: Element;
  startButton?: HTMLDivElement;
  speedInput?: HTMLInputElement;
  speedText?: HTMLParagraphElement;
  colorSnakeInput?: HTMLInputElement;
  colorMapInput?: HTMLInputElement;
  sizeMap?: HTMLSelectElement;
  settings?: HTMLDivElement;
  pauseButton?: HTMLDivElement;
  obstaclesInput?: HTMLInputElement;
  teleportInput?: HTMLInputElement;
  addPresetButton?: HTMLDivElement;
  listEls?: HTMLDivElement[];
  headerText?: HTMLHeadElement;
  presetText?: HTMLInputElement;
  showSettingsCheck?: HTMLInputElement;
  newColorField?: HTMLInputElement;
  newColorSnake?: HTMLInputElement;
  newColorShadow?: HTMLInputElement;
  newColorPage?: HTMLInputElement;
  newStartImg?: HTMLInputElement;
  mapFlip?: HTMLInputElement;
  directionFlip?: HTMLInputElement;
  changeSpeed?: HTMLInputElement;
  changeOpacity?: HTMLInputElement;
  changeColor?: HTMLInputElement;
  setAnimation?: HTMLInputElement;
  newSpeedInput?: HTMLInputElement;
  animationImgInput?: HTMLInputElement;
  shouldObstaclesInput?: HTMLInputElement;
  shouldTeleportInput?: HTMLInputElement;
  shouldAnimationInput?: HTMLInputElement;
  newMapSize?: HTMLSelectElement;
  closeModalButton?: HTMLDivElement;
  acceptButton?: HTMLDivElement;
  newSpeedText?: HTMLParagraphElement;
  featureMessage?: HTMLDivElement;
  lineAnimation?: HTMLDivElement;
  loginInput?: HTMLInputElement;
  passwordInput?: HTMLInputElement;
  errorMsgModal?: HTMLDivElement;
  squares?: HTMLDivElement[];
  scoreDiv?: HTMLDivElement;
  containerSettings?: HTMLDivElement;
  startImgDiv?: HTMLDivElement;
  scoreText?: HTMLParagraphElement;
  errorMessage?: HTMLDivElement;
  overlay?: HTMLDivElement;
  pauseDiv?: HTMLDivElement;
};

export function getCoreElements(): ReturnValue {
  const container = getTargetElement('container', document.getElementsByTagName('div'));
  const overlayStart = getTargetElement('overlay-start', document.getElementsByTagName('div'));
  const overlay = getTargetElement('overlay-modal', document.getElementsByTagName('div'));
  const tutorialOverlay = getTargetElement('tutorial-overlay', document.getElementsByTagName('div'));
  const map = getTargetElement('map', document.getElementsByTagName('div'));
  const settings = getTargetElement('settings', document.getElementsByTagName('div'));
  const panel = getTargetElement('admin-panel', document.getElementsByTagName('div'));
  const addPresetButton = getTargetElement('add-preset', document.getElementsByTagName('div'));
  const showTutorialButton = getTargetElement('show-tutorial-button', document.getElementsByTagName('div'));
  const closeTutorialButton = document.getElementsByClassName('start-button')[0];
  const startButton = getTargetElement('start-try-again', document.getElementsByTagName('div'));
  const speedInput = getTargetElement('speed-input', document.getElementsByTagName('input'));
  const speedText = getTargetElement('speed-p', document.getElementsByTagName('p'));
  const colorSnakeInput = getTargetElement('color-snake-input', document.getElementsByTagName('input'));
  const colorMapInput = getTargetElement('color-map-input', document.getElementsByTagName('input'));
  const sizeMap = getTargetElement('map-size', document.getElementsByTagName('select'));
  const pauseButton = getTargetElement('pause', document.getElementsByTagName('div'));
  const obstaclesInput = getTargetElement('obstacles-input', document.getElementsByTagName('input'));
  const teleportInput = getTargetElement('teleport-input', document.getElementsByTagName('input'));
  const listEls = getTargetElements('list-el', document.getElementsByTagName('div'));
  const headerText = getTargetElement('new-preset-h1', document.getElementsByTagName('h1'));
  const presetText = getTargetElement('preset-text', document.getElementsByTagName('input'));
  const showSettingsCheck = getTargetElement('show-settings-check', document.getElementsByTagName('input'));
  const newColorSnake = getTargetElement('new-color-snake', document.getElementsByTagName('input'));
  const newColorField = getTargetElement('new-color-field', document.getElementsByTagName('input'));
  const newColorShadow = getTargetElement('new-color-shadow', document.getElementsByTagName('input'));
  const newColorPage = getTargetElement('new-color-page', document.getElementsByTagName('input'));
  const newStartImg = getTargetElement('new-start-img', document.getElementsByTagName('input'));
  const mapFlip = getTargetElement('map-flip', document.getElementsByTagName('input'));
  const directionFlip = getTargetElement('direction-flip', document.getElementsByTagName('input'));
  const changeSpeed = getTargetElement('change-speed', document.getElementsByTagName('input'));
  const changeOpacity = getTargetElement('change-opacity', document.getElementsByTagName('input'));
  const changeColor = getTargetElement('change-color', document.getElementsByTagName('input'));
  const setAnimation = getTargetElement('set-animation', document.getElementsByTagName('input'));
  const newSpeedInput = getTargetElement('new-speed-input', document.getElementsByTagName('input'));
  const newSpeedText = getTargetElement('new-speed-p', document.getElementsByTagName('p'));
  const animationImgInput = getTargetElement('animation-img', document.getElementsByTagName('input'));
  const shouldObstaclesInput = getTargetElement('new-obstacles-input', document.getElementsByTagName('input'));
  const shouldTeleportInput = getTargetElement('new-teleport-input', document.getElementsByTagName('input'));
  const shouldAnimationInput = getTargetElement('set-animation', document.getElementsByTagName('input'));
  const newMapSize = getTargetElement('new-map-size', document.getElementsByTagName('select'));
  const featureMessage = getTargetElement('feature-message', document.getElementsByTagName('div'));
  const closeModalButton = getTargetElement('cancel', document.getElementsByTagName('div'));
  const acceptButton = getTargetElement('accept', document.getElementsByTagName('div'));
  const lineAnimation = getTargetElement('line-animation-img', document.getElementsByTagName('div'));
  const loginInput = getTargetElement('login-input', document.getElementsByTagName('input'));
  const passwordInput = getTargetElement('password-input', document.getElementsByTagName('input'));
  const errorMsgModal = getTargetElement('error-message-modal', document.getElementsByTagName('div'));
  const squares = getTargetElements('grid-div', document.getElementsByTagName('div'));
  const scoreDiv = getTargetElement('score-div', document.getElementsByTagName('div'));
  const containerSettings = getTargetElement('container-settings', document.getElementsByTagName('div'));
  const startImgDiv = getTargetElement('start-img', document.getElementsByTagName('img'));
  const scoreText = getTargetElement('score', document.getElementsByTagName('p'));
  const errorMessage = getTargetElement('error-message', document.getElementsByTagName('div'));
  const pauseDiv = getTargetElement('pause-div', document.getElementsByTagName('div'));

  return {
    pauseDiv,
    overlay,
    errorMessage,
    scoreText,
    startImgDiv,
    containerSettings,
    scoreDiv,
    squares,
    errorMsgModal,
    passwordInput,
    loginInput,
    lineAnimation,
    container,
    featureMessage,
    newSpeedText,
    acceptButton,
    closeModalButton,
    newMapSize,
    shouldAnimationInput,
    shouldTeleportInput,
    shouldObstaclesInput,
    animationImgInput,
    newSpeedInput,
    setAnimation,
    mapFlip,
    directionFlip,
    changeSpeed,
    changeOpacity,
    changeColor,
    headerText,
    presetText,
    showSettingsCheck,
    newColorField,
    newColorSnake,
    newColorShadow,
    newColorPage,
    newStartImg,
    overlayStart,
    tutorialOverlay,
    addPresetButton,
    map,
    panel,
    showTutorialButton,
    closeTutorialButton,
    startButton,
    speedInput,
    speedText,
    colorSnakeInput,
    colorMapInput,
    sizeMap,
    settings,
    pauseButton,
    obstaclesInput,
    teleportInput,
    listEls,
  };
}
