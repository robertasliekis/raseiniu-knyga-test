import React, { Component } from "react";
import { connect } from "react-redux";

import { changePageNumber, mouseEnterContent, mouseEnterMovie } from "../actions";

import content from "../info/info";

export class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hoveredType: "",
      activeImageIndex: 0,
      hoveredImageIndex: 0,
      galleryImages: [],
      imageDescription: [],
      imageTextBelow: [],
      activeVideo: null,
      videoPlaying: false,
    };

    this.windowContainerRef = React.createRef();
    this.windowButtonsRef = React.createRef();
    this.windowContentRef = React.createRef();
    this.blockOverlayRef = React.createRef();
    this.blockOverlayMovieRef = React.createRef();
    this.windowMovieContainerRef = React.createRef();
    this.videoRef = React.createRef();
  }

  mouseEnterHandler = (type) => {
    this.setState({ hovered: true, hoveredType: type });
  };

  mouseLeaveHandler = () => {
    this.clearTimer();
    this.setState({ hovered: false, hoveredType: "" });
  };

  onTimeout = () => {
    switch (this.state.hoveredType) {
      case "change-image":
        this.setState({
          activeImageIndex: this.state.hoveredImageIndex,
        });

        this.setContent();
        break;
      case "close":
        this.closeWindow();
        break;
      case "play-video":
        this.videoRef.current.play();
        this.setState({
          videoPlaying: true,
        });
        break;

      case "pause-video":
        this.videoRef.current.pause();
        this.setState({
          videoPlaying: false,
        });
        break;
      default:
    }

    this.setState({ hovered: false, hoveredType: "" });
  };

  closeWindow() {
    if (this.props.contentOpen) {
      this.windowContainerRef.current.classList.remove("window-container-animation-class1");
      this.windowContainerRef.current.classList.add("window-container-animation-class2");
      this.blockOverlayRef.current.classList.remove("block-overlay-animation");
    }

    this.props.mouseEnterContent({ contentIndex: 0, open: false });
    this.props.mouseEnterMovie(false);

    if (this.state.videoPlaying) {
      this.videoRef.current.pause();
      this.videoRef.current.currentTime = 0;
    }

    this.setState({
      hoveredType: "",
      galleryImages: [],
      imageDescription: null,
      imageTextBelow: null,
      videoPlaying: false,
      activeVideo: null,
      hoveredImageIndex: 0,
      activeImageIndex: 0,
    });
  }

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hovered !== prevState.hovered) {
      if (this.state.hovered) {
        let hoverTime;
        if (this.state.hoveredType === "close") {
          hoverTime = 1200;
        } else {
          hoverTime = 1000;
        }
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }

    if (this.props.page !== prevProps.page || this.props.languageIndex !== prevProps.languageIndex) {
      this.closeWindow();
    }

    if (this.props.contentOpen !== prevProps.contentOpen) {
      if (this.props.contentOpen) {
        this.windowContainerRef.current.classList.remove("window-container-animation-class1");
        this.windowContainerRef.current.classList.remove("window-container-animation-class2");
        this.windowContainerRef.current.classList.add("window-container-animation-class1");
        this.blockOverlayRef.current.classList.add("block-overlay-animation");

        this.setContent();
      } else {
        this.windowContainerRef.current.classList.remove("window-container-animation-class1");
        this.windowContainerRef.current.classList.add("window-container-animation-class2");
        this.blockOverlayRef.current.classList.remove("block-overlay-animation");
        this.closeWindow();
      }
    }

    if (this.props.reset !== prevProps.reset) {
      if (this.props.movieOpen || this.props.contentOpen) {
        this.closeWindow();
      }
    }
  }

  setContent() {
    let loadedContent = content[this.props.page].box[this.props.contentIndex];

    if (loadedContent) {
      if (loadedContent.video) {
        this.setState({ activeVideo: loadedContent.footage, videoPlaying: true });
        this.props.mouseEnterMovie(true);
      } else {
        let galleryImages = loadedContent.images;
        let imageDescription = galleryImages[this.state.activeImageIndex]?.description[this.props.languageIndex];
        let imageTextBelow = galleryImages[this.state.activeImageIndex]?.imageText[this.props.languageIndex];

        this.setState({
          galleryImages: galleryImages,
          imageDescription: imageDescription,
          imageTextBelow: imageTextBelow,
        });
      }
    }
  }

  getImage(className, key = this.state.activeImageIndex) {
    let imagePath;

    try {
      // const imageFormat = this.state.galleryImages[key]?.png ? "png" : "jpg";
      // imagePath = require(`../images/gallery/${this.props.page + 1}/${this.props.contentIndex + 1}_${key + 1}.${imageFormat}`);
      imagePath = require(`../images/gallery/${this.props.page + 1}/${this.props.contentIndex + 1}_${key + 1}.png`);
    } catch (err) {
      imagePath = "";
    }

    return <img src={imagePath} className={className} alt="" />;
  }

  render() {
    return (
      <div className="window-container" ref={this.windowContainerRef}>
        <div
          className={`window-content window-content-${this.props.page + 1}-${this.props.contentIndex + 1}`}
          ref={this.windowContentRef}
          key={this.props.page + this.props.contentIndex + this.state.activeImageIndex}
        >
          <div className="content content-left">
            {this.state.galleryImages.length ? this.getImage("main-image") : null}
            {this.state.galleryImages.length > 1 ? (
              <div className="gallery">
                {this.state.galleryImages.map((image, key) => {
                  return this.state.activeImageIndex !== key ? (
                    <div
                      className="image-wrapper"
                      key={key}
                      onMouseEnter={() => {
                        this.mouseEnterHandler("change-image");
                        this.setState({
                          hoveredImageIndex: key,
                        });
                      }}
                      onMouseLeave={this.mouseLeaveHandler}
                    >
                      {this.getImage("gallery-image", key)}
                    </div>
                  ) : null;
                })}
              </div>
            ) : null}
            {this.state.imageTextBelow ? <div className="text-below-image" dangerouslySetInnerHTML={{ __html: this.state.imageTextBelow }}></div> : null}
          </div>
          {this.state.imageDescription ? <div className="content content-right" dangerouslySetInnerHTML={{ __html: this.state.imageDescription }}></div> : null}
          {this.state.activeVideo ? (
            <div className="video-container">
              <video autoPlay ref={this.videoRef} key={`videoKey${this.props.languageIndex}${this.props.page}`}>
                <source src={this.state.activeVideo} type="video/mp4" />
              </video>
              <div
                className={`btn-play-pause white-box-hover-border ${this.state.videoPlaying ? "pause" : "play"}`}
                onMouseEnter={() => {
                  this.mouseEnterHandler(this.state.videoPlaying ? "pause-video" : "play-video");
                }}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
            </div>
          ) : null}
          <div className={`btn btn-close ${this.state.activeVideo ? "white" : ""}`} onMouseEnter={() => this.mouseEnterHandler("close")} onMouseLeave={this.mouseLeaveHandler}>
            <div className="white-box-hover-border"></div>
          </div>
          <div className="block-overlay" ref={this.blockOverlayRef}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    contentIndex: state.mouseEnterContent.contentIndex,
    contentOpen: state.mouseEnterContent.contentOpen,
    movieOpen: state.mouseEnterMovie.movieOpen,
    reset: state.resetChanged.reset,
    languageIndex: state.changeLanguage.languageIndex,
  };
};

const mapDispatchToProps = {
  changePageNumber,
  mouseEnterContent,
  mouseEnterMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
