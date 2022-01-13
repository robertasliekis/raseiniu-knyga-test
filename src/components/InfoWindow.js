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
      activePage: 0,
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
          imageDescription: this.state.galleryImages[this.state.hoveredImageIndex].description,
        });
        break;

      case "close":
        this.closeWindow();
        this.setState({
          hoveredType: "",
          activeImageIndex: 0,
          galleryImages: [],
          imageDescription: [],
        });
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
  };

  closeWindow() {
    if (this.props.contentOpen) {
      this.windowContainerRef.current.classList.remove("window-container-animation-class1");
      this.windowContainerRef.current.classList.add("window-container-animation-class2");
      this.blockOverlayRef.current.classList.remove("block-overlay-animation");
    }

    let plantClose = { contentIndex: this.props.contentIndex, open: false };
    this.props.mouseEnterContent(plantClose);
    this.props.mouseEnterMovie(false);

    if (this.state.videoPlaying) {
      this.videoRef.current.pause();
      this.videoRef.current.currentTime = 0;
    }

    this.setState({
      galleryImages: [],
      imageDescription: [],
      imageTextBelow: [],
      videoPlaying: false,
      activeVideo: null,
      activePage: 0,
    });
  }

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hovered !== prevProps.hovered) {
      if (this.state.hovered) {
        let hoverTime;
        if (this.state.hoveredType === "close") {
          hoverTime = 1200;
        } else if (this.state.hoveredType === "scroll") {
          hoverTime = 500;
        } else {
          hoverTime = 1000;
        }
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }

    if (this.props.page !== prevProps.page) {
      this.setState({ activePage: 0 });
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
      }
    }

    if (this.props.reset !== prevProps.reset) {
      if (this.props.movieOpen || this.props.contentOpen) {
        this.closeWindow();
      }
    }
  }

  componentDidMount() {
    if (this.props.contentOpen) {
      this.windowContainerRef.current.classList.remove("window-container-animation-class1");
      this.windowContainerRef.current.classList.remove("window-container-animation-class2");
      this.windowContainerRef.current.classList.add("window-container-animation-class1");

      this.blockOverlayRef.current.classList.add("block-overlay-animation");
      this.setContent();
    }
  }

  setContent() {
    let loadedContent = content[this.props.page].box[this.props.contentIndex];

    if (loadedContent.video) {
      this.setState({ activeVideo: loadedContent.footage, videoPlaying: true });
      this.props.mouseEnterMovie(true);
    } else {
      let galleryImages = loadedContent.images;
      let imageDescription = galleryImages[this.state.activeImageIndex].description;
      let imageTextBelow = galleryImages[this.state.activeImageIndex].imageText;
      this.setState({ galleryImages: galleryImages, imageDescription: imageDescription, imageTextBelow: imageTextBelow, activePage: this.props.page });
    }
  }

  render() {
    return (
      <div>
        <div className="window-container" ref={this.windowContainerRef}>
          <div className={`window-content window-content-${this.props.page + 1}-${this.props.contentIndex + 1}`} ref={this.windowContentRef}>
            <div className="content content-left">
              {this.state.galleryImages.length ? (
                <img
                  onError={() => {
                    this.addDefaultSrc();
                  }}
                  src={require(`../images/gallery/${this.state.activePage + 1}/${this.props.contentIndex + 1}_${this.state.activeImageIndex + 1}.jpg`)}
                  className="main-image"
                  alt=""
                />
              ) : null}
              {this.state.galleryImages.length > 1 ? (
                <div className="gallery">
                  {this.state.galleryImages.map((image, key) => {
                    return this.state.activeImageIndex !== key ? (
                      <img
                        alt=""
                        className="gallery-image"
                        onMouseEnter={() => {
                          this.mouseEnterHandler("change-image");
                          this.setState({
                            hoveredImageIndex: key,
                          });
                        }}
                        onMouseLeave={this.mouseLeaveHandler}
                        key={key}
                        src={require(`../images/gallery/${this.state.activePage + 1}/${this.props.contentIndex + 1}_${key + 1}.jpg`)}
                      ></img>
                    ) : null;
                  })}
                </div>
              ) : null}
              {this.state.imageTextBelow.length ? <div className="text-below-image">{this.state.imageTextBelow[this.props.languageIndex]}</div> : null}
            </div>
            {this.state.imageDescription.length ? <div className="content content-right">{this.state.imageDescription[this.props.languageIndex]}</div> : null}
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
