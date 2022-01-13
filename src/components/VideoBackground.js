import React, { Component } from "react";
import { connect } from "react-redux";

import videoIntro from "../info/videoImport";
import videoAnimatedLeft from "../videos/animated/left.mp4";
import videoAnimatedRight from "../videos/animated/right.mp4";
import videoAnimatedCorner from "../videos/animated/right.mp4";

export class VideoBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.videoBackgroundRef = React.createRef();
    this.videoRef = React.createRef();
    this.videosAnimatedWrapper = React.createRef();
    this.videoAnimatedLeftRef = React.createRef();
    this.videoAnimatedRightRef = React.createRef();
    this.videoAnimatedCornerRef = React.createRef();
  }

  componentDidMount() {
    this.videoBackgroundRef.current.classList.add("opacity-animation-class");
    this.videosAnimatedWrapper.current.classList.add("ornaments-popup-animation");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== prevProps.page || this.props.languageIndex !== prevProps.languageIndex) {
      this.videoBackgroundRef.current.classList.remove("opacity-animation-class");
      this.videoBackgroundRef.current.classList.add("opacity-animation-class");

      this.videosAnimatedWrapper.current.classList.remove("ornaments-popup-animation");
      this.videosAnimatedWrapper.current.classList.add("ornaments-popup-animation");
    }

    if (this.props.ornamentIndex !== prevProps.ornamentIndex || this.props.ornamentHoverCount !== prevProps.ornamentHoverCount) {
      switch (this.props.ornamentIndex) {
        case "left":
          this.videoAnimatedLeftRef.current.play();
          break;
        case "right":
          this.videoAnimatedRightRef.current.play();
          break;
        case "corner":
          this.videoAnimatedCornerRef.current.play();
          break;
        default:
      }
    }
  }

  render() {
    const setPlayBack = () => {
      this.videoRef.current.playbackRate = 1;
    };

    return (
      <div ref={this.videoBackgroundRef} className="video-background-container " key={`containerKey${this.props.page}${this.props.languageIndex}`}>
        <video autoPlay muted ref={this.videoRef} onCanPlay={() => setPlayBack()}>
          <source src={videoIntro[this.props.languageIndex][this.props.page]} type="video/mp4" style={{ display: "none" }} />
        </video>
        <div className="videos-animated-wrapper" ref={this.videosAnimatedWrapper}>
          <video autoPlay muted type="video/mp4" ref={this.videoAnimatedLeftRef} className="video-animated left animation">
            <source src={videoAnimatedLeft} type="video/mp4" />
          </video>
          <video autoPlay muted type="video/mp4" ref={this.videoAnimatedRightRef} className="video-animated right animation">
            <source src={videoAnimatedRight} type="video/mp4" />
          </video>
          <video autoPlay muted type="video/mp4" ref={this.videoAnimatedCornerRef} className="video-animated corner animation">
            <source src={videoAnimatedCorner} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    languageIndex: state.changeLanguage.languageIndex,
    ornamentIndex: state.mouseEnterOrnament.ornamentIndex,
    ornamentHoverCount: state.mouseEnterOrnament.ornamentHoverCount,
  };
};

export default connect(mapStateToProps)(VideoBackground);
