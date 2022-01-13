import React, { Component } from "react";
import { connect } from "react-redux";
import { changePageNumber, resetChanged, mouseEnterContent } from "../actions";

export class ChangePageButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };

    this.handImageRef = React.createRef();
  }

  handleButtonBackClick = () => {
    let currentPage = this.props.page - 1;
    this.props.changePageNumber(currentPage);
  };

  handleButtonNextClick = () => {
    let currentPage = this.props.page + 1;
    this.props.changePageNumber(currentPage);
  };

  mouseEnterHandler = () => {
    this.setState({ hovered: true });
    if (!this.props.movieOpen) {
      //   this.handImageRef.current.classList.add("hand-image-animation");
    }
  };

  mouseLeaveHandler = () => {
    this.setState({ hovered: false });
    this.clearTimer();
    //  this.handImageRef.current.classList.remove("hand-image-animation");
  };

  onTimeout = () => {
    this.props.changePageNumber(0);
    this.props.resetChanged();
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hovered !== prevState.hovered) {
      if (this.state.hovered) {
        let hoverTime;

        if (this.props.movieOpen) {
          hoverTime = 220000;
        } else {
          hoverTime = 120000;
        }

        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return (
      <div className="change-page-container" onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler}>
        <div className="change-page-buttons" style={{ justifyContent: this.props.page + 1 === 1 ? "flex-end" : "space-between" }}>
          <div className="btn btn-back" style={{ display: this.props.page + 1 === 1 ? "none" : "flex" }} onClick={this.handleButtonBackClick}>
            BACK
          </div>
          <h1>PAGE {this.props.page + 1}</h1>
          <div className="btn btn-next" style={{ display: this.props.page + 1 > 9 ? "none" : "flex" }} onClick={this.handleButtonNextClick}>
            NEXT
          </div>
        </div>
        <div className="reset-box-container">
          <div className="reset-box reset-box-left"></div>
          <div className="reset-box reset-box-right"></div>
          <div className="reset-box reset-box-top"></div>
          <div className="reset-box reset-box-bottom"></div>
        </div>
        {/* <div className="hand-image hand-image-animation" ref={this.handImageRef}></div> */}
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

const mapDispatchToProps = {
  changePageNumber,
  resetChanged,
  mouseEnterContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButtons);
