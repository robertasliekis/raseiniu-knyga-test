import React, { Component } from "react";
import { connect } from "react-redux";

import videoIntro from "../info/videoImport";

import videoAnimatedLeft from "../videos/animated/left.mp4";
import videoAnimatedRight from "../videos/animated/right.mp4";

import videoPlants0 from "../videos/plants/page1plants.mp4";
import videoPlants1 from "../videos/plants/page1plants.mp4";
import videoPlants2 from "../videos/plants/page2plants.mp4";
import videoPlants3 from "../videos/plants/page3plants.mp4";
import videoPlants4 from "../videos/plants/page4plants.mp4";
import videoPlants5 from "../videos/plants/page5plants.mp4";
import videoPlants6 from "../videos/plants/page6plants.mp4";
import videoPlants7 from "../videos/plants/page7plants.mp4";

import plantSound from "../sounds/plants_moving.mp3";

const videoPlants = [videoPlants0, videoPlants1, videoPlants2, videoPlants3, videoPlants4, videoPlants5, videoPlants6, videoPlants7];

export class VideoBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.videoBackgroundRef = React.createRef();
    this.videoRef = React.createRef();
    this.videoAnimatedLeftRef = React.createRef();
    this.videoAnimatedRightRef = React.createRef();

    // OLD CODE BELOW
    this.cornerVideosContainerRef = React.createRef();
    this.cornerVideo1Ref = React.createRef();
    this.cornerVideo2Ref = React.createRef();
    this.cornerVideo3Ref = React.createRef();
    this.cornerVideo4Ref = React.createRef();

    this.plantAudio1Ref = React.createRef();
    this.plantAudio2Ref = React.createRef();
    this.plantAudio3Ref = React.createRef();
    this.plantAudio4Ref = React.createRef();
  }

  componentDidMount() {
    this.videoBackgroundRef.current.classList.add("opacity-animation-class");
    this.cornerVideosContainerRef.current.classList.add("corner-videos-animation-class");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== prevProps.page || this.props.languageIndex !== prevProps.languageIndex) {
      this.videoBackgroundRef.current.classList.remove("opacity-animation-class");
      this.videoBackgroundRef.current.classList.add("opacity-animation-class");
      // this.cornerVideosContainerRef.current.classList.remove("corner-videos-animation-class");
      //  this.cornerVideosContainerRef.current.classList.add("corner-videos-animation-class");
    }

    if (this.props.cornerIndex !== prevProps.cornerIndex) {
      switch (this.props.cornerIndex) {
        case "left":
          this.videoAnimatedLeftRef.current.play();
          // this.plantAudio1Ref.current.play();
          break;
        case "right":
          this.videoAnimatedRightRef.current.play();
          // this.plantAudio2Ref.current.play();
          break;
        default:
      }
    }
  }

  render() {
    const setPlayBack = () => {
      this.videoRef.current.playbackRate = 2;
    };

    return (
      <div ref={this.videoBackgroundRef} className="video-background-container " key={`containerKey${this.props.page}`}>
        <video autoPlay muted ref={this.videoRef} onCanPlay={() => setPlayBack()} key={`videoKey${this.props.languageIndex}${this.props.page}`}>
          <source src={videoIntro[this.props.languageIndex][this.props.page]} type="video/mp4" style={{ display: "none" }} />
        </video>
        <video autoPlay muted type="video/mp4" ref={this.videoAnimatedLeftRef} className="video-animated-left video-animated">
          <source src={videoAnimatedLeft} type="video/mp4" />
        </video>
        <video autoPlay muted type="video/mp4" ref={this.videoAnimatedRightRef} className="video-animated-right video-animated">
          <source src={videoAnimatedRight} type="video/mp4" />
        </video>
        {/* old code below*/}
        <div style={{ display: "none" }}>
          <div className="corner-videos-container " ref={this.cornerVideosContainerRef} key={`cornerVideosContainerKey${this.props.page}`} style={{ display: this.props.page > 0 ? "flex" : "none" }}>
            <div className="video-box bottom left" style={{ height: this.props.page > 5 ? "69%" : "50%" }}>
              <video autoPlay muted type="video/mp4" ref={this.cornerVideo2Ref} className="video-bottom-left" key={`cornerVideo${this.props.page}`}>
                <source src={videoPlants[this.props.page]} type="video/mp4" />
              </video>
              <audio ref={this.plantAudio2Ref}>
                <source src={plantSound}></source>
              </audio>
            </div>
            <div className="video-box bottom right" style={{ height: this.props.page > 5 ? "69%" : "50%" }}>
              <video autoPlay muted type="video/mp4" ref={this.cornerVideo4Ref} className="video-bottom-right" key={`cornerVideo${this.props.page}`}>
                <source src={videoPlants[this.props.page]} type="video/mp4" />
              </video>
              <audio ref={this.plantAudio4Ref}>
                <source src={plantSound}></source>
              </audio>
            </div>
            <div className="video-box top left" style={{ height: this.props.page > 5 ? "31%" : "50%" }}>
              <video autoPlay muted type="video/mp4" ref={this.cornerVideo1Ref} className="video-top-left" key={`cornerVideo${this.props.page}`}>
                <source src={videoPlants[this.props.page]} type="video/mp4" />
              </video>
              <audio ref={this.plantAudio1Ref}>
                <source src={plantSound}></source>
              </audio>
            </div>
            <div className="video-box top right" style={{ height: this.props.page > 5 ? "31%" : "50%" }}>
              <video autoPlay muted type="video/mp4" ref={this.cornerVideo3Ref} className="video-top-right" key={`cornerVideo${this.props.page}`}>
                <source src={videoPlants[this.props.page]} type="video/mp4" />
              </video>
              <audio ref={this.plantAudio3Ref}>
                <source src={plantSound}></source>
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    cornerIndex: state.mouseEnterOrnament.cornerIndex,
    languageIndex: state.changeLanguage.languageIndex,
  };
};

export default connect(mapStateToProps)(VideoBackground);
