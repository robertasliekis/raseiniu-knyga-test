export const changePageNumber = (number) => {
  return {
    type: "CHANGE_PAGE_NUMBER",
    payload: number,
  };
};

export const resetChanged = () => {
  return {
    type: "RESET_CHANGED",
  };
};

export const mouseEnterOrnament = (number) => {
  return {
    type: "MOUSE_ENTER_CORNER",
    payload: number,
  };
};

export const mouseEnterContent = (number) => {
  return {
    type: "MOUSE_ENTER_PLANT",
    payload: number,
  };
};

export const mouseEnterMovie = (bool) => {
  return {
    type: "MOUSE_ENTER_MOVIE",
    payload: bool,
  };
};

export const hoveredChanged = (bool) => {
  return {
    type: "HOVERED",
    payload: bool,
  };
};

export const playForrestSound = (bool) => {
  return {
    type: "PLAY_FORREST_SOUND",
    payload: bool,
  };
};

export const playMeadowSound = (bool) => {
  return {
    type: "PLAY_MEADOW_SOUND",
    payload: bool,
  };
};

export const playGardenSound = (bool) => {
  return {
    type: "PLAY_GARDEN_SOUND",
    payload: bool,
  };
};

export const changeLanguage = (index) => {
  return {
    type: "CHANGE_LANGUAGE",
    payload: index,
  };
};
