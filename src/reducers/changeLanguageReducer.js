const initialState = {
  languageIndex: 0,
  language: "lt",
};

const changeLanguage = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      let language = state.language === "lt" ? "en" : "lt";
      let languageIndex = state.language === "lt" ? 1 : 0;
      return { ...state, languageIndex: languageIndex, language: language };
    default:
      return state;
  }
};

export default changeLanguage;
