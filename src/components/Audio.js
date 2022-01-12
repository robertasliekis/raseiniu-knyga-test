import React, { Component } from "react";
import { connect } from "react-redux";

import forrestSound from "../sounds/forrest.mp3";
import meadowSound from "../sounds/meadow.mp3";
import gardenSound from "../sounds/garden.mp3";

export class Audio extends Component {
  constructor(props) {
    super(props);
    this.audioForrestRef = React.createRef();
    this.audioMeadowRef = React.createRef();
    this.audioGardenRef = React.createRef();
  }
  componentDidMount() {
    this.audioForrestRef.current.play();
    this.audioForrestRef.current.volume = 0.01;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== prevProps.page) {
      if (this.props.page >= 0 && this.props.page < 4) {
        this.audioForrestRef.current.volume = 0.01;
        this.audioForrestRef.current.play();
        this.audioMeadowRef.current.pause();
        this.audioGardenRef.current.pause();
      } else if (this.props.page >= 4 && this.props.page < 6) {
        this.audioMeadowRef.current.volume = 0.06;
        this.audioMeadowRef.current.play();
        this.audioForrestRef.current.pause();
        this.audioGardenRef.current.pause();
      } else if (this.props.page >= 6) {
        this.audioGardenRef.current.volume = 1;
        this.audioGardenRef.current.play();
        this.audioForrestRef.current.pause();
        this.audioMeadowRef.current.pause();
      }
    }

    if (this.props.movieOpen !== prevProps.movieOpen) {
      if (this.props.movieOpen) {
        this.audioForrestRef.current.pause();
      } else {
        this.audioForrestRef.current.play();
      }
    }
  }

  render() {
    return (
      <div className="audio-background">
        <audio loop ref={this.audioForrestRef}>
          <source src={forrestSound}></source>
        </audio>
        <audio loop ref={this.audioMeadowRef}>
          <source src={meadowSound}></source>
        </audio>
        <audio loop ref={this.audioGardenRef}>
          <source src={gardenSound}></source>
        </audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    movieOpen: state.mouseEnterMovie.movieOpen,
  };
};

export default connect(mapStateToProps)(Audio);
