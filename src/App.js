import React from "react";
import ChangePageButtons from "./components/ChangePageButtons";
import VideoBackground from "./components/VideoBackground";
import HoverZones from "./components/HoverZones";
import InfoWindow from "./components/InfoWindow";

import { connect } from "react-redux";

import "./App.css";
//"homepage":"https://robertasliekis.github.io/raseiniu-knyga-test/",
//"homepage": "http://localhost:3000/",

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <ChangePageButtons />
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
