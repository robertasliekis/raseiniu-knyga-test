import { combineReducers } from "redux";
import changePageNumber from "./changePageNumberReducer";
import hoveredChanged from "./hoveredReducer";
import mouseEnterOrnament from "./mouseEnterOrnamentReducer";
import mouseEnterContent from "./mouseEnterContentReducer";
import mouseEnterMovie from "./mouseEnterMovieReducer";
import resetChanged from "./ResetReducer";
import changeLanguage from "./changeLanguageReducer";

export default combineReducers({
  changePageNumber: changePageNumber,
  hoveredChanged: hoveredChanged,
  mouseEnterOrnament: mouseEnterOrnament,
  mouseEnterContent: mouseEnterContent,
  mouseEnterMovie: mouseEnterMovie,
  resetChanged: resetChanged,
  changeLanguage: changeLanguage,
});
