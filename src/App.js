import React from "react";
import ChangePageButtons from "./components/ChangePageButtons";
import Audio from "./components/Audio";
import VideoBackground from "./components/VideoBackground";
import HoverZones from "./components/HoverZones";
import InfoWindow from "./components/InfoWindow";

import { connect } from "react-redux";

import "./App.css";
//"https://robertasliekis.github.io/zolynu-paslaptys-update/",
//"homepage": "http://localhost:3000/",

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <ChangePageButtons />
        {/* <Audio /> */}
        <VideoBackground />
        <HoverZones />
        <InfoWindow />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.changePageNumber.pageNumber,
  };
};

export default connect(mapStateToProps)(App);
