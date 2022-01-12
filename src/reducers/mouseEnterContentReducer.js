const initialState = {
  contentIndex: 0,
  contentOpen: false,
};

const mouseEnterContent = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_ENTER_PLANT":
      return { ...state, contentIndex: action.payload.contentIndex, contentOpen: action.payload.open };
    default:
      return state;
  }
};

export default mouseEnterContent;
