const initialState = {
  hoveredGlobal: false,
};

const hoveredChanged = (state = initialState, action) => {
  switch (action.type) {
    case "HOVERED":
      return { ...state, hoveredGlobal: action.payload };
    default:
      return state;
  }
};

export default hoveredChanged;
