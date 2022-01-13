const initialState = {
  ornamentIndex: "",
  ornamentHoverCount: 0,
};

const mouseEnterOrnament = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_ENTER_CORNER":
      return { ...state, ornamentIndex: action.payload, ornamentHoverCount: state.ornamentHoverCount + 1 };
    default:
      return state;
  }
};

export default mouseEnterOrnament;
