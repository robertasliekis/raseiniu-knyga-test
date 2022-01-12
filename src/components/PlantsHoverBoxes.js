import React, { Component } from "react";
import { connect } from "react-redux";
import plantsLoop from "../videos/plants-loop.mp4";

export class PlantsHoverBoxes extends Component {
  render() {
    const plantNumbers = [
      this.props.pageNumber * 4 - 3,
      this.props.pageNumber * 4 - 2,
      this.props.pageNumber * 4 - 1,
      this.props.pageNumber * 4,
    ];

    const plantContainerNumbers = [1, 2, 3, 4];

    return (
      <div className="plants-wrapper">
        {plantContainerNumbers.map((number, index) => {
          return (
            <div
              className={`plant plant${number}`}
              id={`plant${plantNumbers[index]}`}
              key={`plant${number}`}
              //   onMouseEnter={(event) =>
              //     this.mouseEnterHandler(event, "plant", this.openPageVideoRef)
              //   }
              //   onMouseLeave={this.mouseLeaveHandler}
            >
              {plantNumbers[index]}
            </div>
          );
        })}

        <div className="border-box-left border-box">
          <video autoPlay muted type="video/mp4" ref={this.cornerVideoLeftRef}>
            <source src={plantsLoop} type="video/mp4" />
          </video>
        </div>
        <div className="border-box-right border-box">
          <video autoPlay muted type="video/mp4" ref={this.cornerVideoRightRef}>
            <source src={plantsLoop} type="video/mp4" />
          </video>
        </div>

        <div
          className="border-box-left-button border-box-button border-box-left border-box"
          //   onMouseEnter={(event) => this.mouseEnterHandler(event, "corner", this.cornerVideoLeftRef)}
          //   onMouseLeave={this.mouseLeaveHandler}
        >
          Button left
        </div>
        <div
          className="border-box-right-button border-box-button border-box-right border-box"
          //   onMouseEnter={(event) =>
          //     this.mouseEnterHandler(event, "corner", this.cornerVideoRightRef)
          //   }
          //   onMouseLeave={this.mouseLeaveHandler}
        >
          Button right
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.changePageNumber.pageNumber,
  };
};

export default connect(mapStateToProps)(PlantsHoverBoxes);
