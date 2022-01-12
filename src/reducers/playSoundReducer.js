const initialState = {
  playForrestSound: false,
  playMeadowSound: false,
  playGardenSound: false,
};

const changePageNumber = (state = initialState, action) => {
  switch (action.type) {
    case "PLAY_FORREST_SOUND":
      return { ...state, playForrestSound: action.payload };
    case "PLAY_MEADOW_SOUND":
      return { ...state, playMeadowSound: action.payload };
    case "PLAY_GARDEN_SOUND":
      return { ...state, playGardenSound: action.payload };
    default:
      return state;
  }
};

export default changePageNumber;
