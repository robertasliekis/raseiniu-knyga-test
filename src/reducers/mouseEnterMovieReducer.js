const initialState = {
  movieOpen: false,
};

const mouseEnterMovie = (state = initialState, action) => {
  switch (action.type) {
    case "MOUSE_ENTER_MOVIE":
      return { ...state, movieOpen: action.payload };
    default:
      return state;
  }
};

export default mouseEnterMovie;
