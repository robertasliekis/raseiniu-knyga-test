import React, { Component } from "react";
import { connect } from "react-redux";
import hoverZones from "../info/info";

import { changePageNumber, mouseEnterOrnament, mouseEnterContent, mouseEnterMovie, hoveredChanged, changeLanguage } from "../actions";

export class HoverZones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hoveredType: "",
      infoIndex: null,
      ornamentIndex: null,
      posX: null,
      posY: null,
    };
    this.hoverZonesContainerRef = React.createRef();
  }

  mouseEnterHandler = (type, index = 0) => {
    this.setState({ hovered: true, hoveredType: type });
    this.props.hoveredChanged(true);
    switch (type) {
      case "info":
        this.setState({
          infoIndex: index,
        });
        break;
      case "ornament":
        this.setState({
          ornamentIndex: index,
        });
        break;
      default:
        break;
    }
  };

  mouseLeaveHandler = () => {
    this.props.hoveredChanged(false);
    this.clearTimer();
    this.setState({ hovered: false });
  };

  onTimeout = () => {
    switch (this.state.hoveredType) {
      case "ornament":
        this.props.mouseEnterOrnament(this.state.ornamentIndex);
        break;
      case "info":
        let infoWindowOpen = { contentIndex: this.state.infoIndex, open: true };
        this.props.mouseEnterContent(infoWindowOpen);
        break;
      case "language":
        this.setState({ hovered: false });
        this.clearTimer();
        this.props.changeLanguage();
        break;
      default:
    }
  };

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
        if (this.state.hoveredType === "info") {
          hoverTime = 1400;
        } else if (this.state.hoveredType === "ornament") {
          hoverTime = 50;
        } else {
          hoverTime = 1000;
        }
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }
    if (this.props.page !== prevProps.page || this.props.language !== prevProps.language) {
      this.hoverZonesContainerRef.current.classList.remove("hover-zones-animation-class");
      this.hoverZonesContainerRef.current.classList.add("hover-zones-animation-class");
    }
  }

  componentDidMount() {
    this.hoverZonesContainerRef.current.classList.add("hover-zones-animation-class");
  }

  zoneCoordinatesClicked(e) {
    let posX = (e.pageX / window.screen.availWidth) * 100;
    let posY = (e.pageY / window.screen.availHeight) * 100;
    this.setState({ posX: posX, posY: posY });
    if (this.state.posX && this.state.posY && true) {
      console.log("start");
      console.log(Math.floor(this.state.posX), Math.floor(this.state.posY));
      console.log(Math.floor(posX - this.state.posX), Math.floor(posY - this.state.posY));
    }
  }

  render() {
    const plantContainerNumbers = [1, 2, 3, 4];
    const ornamentHoverZones = ["left", "right"];
    const plantNumbers = [this.props.page * 4 - 3, this.props.page * 4 - 2, this.props.page * 4 - 1, this.props.page * 4];

    return (
      <div className="hover-zones-container" ref={this.hoverZonesContainerRef} key={`hoverZonesKey${this.props.page}${this.props.language}`} onClick={(e) => this.zoneCoordinatesClicked(e)}>
        {hoverZones[this.props.page].box.map((hoverZone, index) => {
          return (
            <div
              className="hover-zone white-box-hover-border"
              key={index}
              style={{ top: `${hoverZone.posY}%`, left: `${hoverZone.posX}%`, width: `${hoverZone.width}%`, height: `${hoverZone.height}%` }}
              onMouseEnter={() => this.mouseEnterHandler("info", index)}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
          );
        })}
        {ornamentHoverZones.map((ornamentHoverZone, index) => {
          return (
            <div
              className={`hover-zone ornament ${ornamentHoverZone}`}
              key={index}
              onMouseEnter={() => this.mouseEnterHandler("ornament", ornamentHoverZone)}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
          );
        })}
        <div className="btn btn-language">
          <div className="white-box-hover-border"></div>
          <div className={`language ${this.props.language}`} onMouseEnter={() => this.mouseEnterHandler("language")} onMouseLeave={this.mouseLeaveHandler}></div>
        </div>
        {/*  OLD CODE BELOW */}
        <div className="plants-wrapper" style={{ display: "none" }}>
          <div className="hover-zone corner-zone" id="corner1" onMouseEnter={(event) => this.mouseEnterHandler(event, "corner")} onMouseLeave={this.mouseLeaveHandler}></div>
          <div className="hover-zone corner-zone" id="corner2" onMouseEnter={(event) => this.mouseEnterHandler(event, "corner")} onMouseLeave={this.mouseLeaveHandler}></div>
          <div className="plant-zone-wrapper">
            {plantContainerNumbers.map((number, index) => {
              return (
                <div
                  className={`plant-zone plant${number} hover-zone`}
                  id={`plant${plantNumbers[index]}`}
                  key={`plant${number}`}
                  onMouseEnter={(event) => this.mouseEnterHandler(event, "plant")}
                  onMouseLeave={this.mouseLeaveHandler}
                >
                  <div className="white-box" id={`plant${plantNumbers[index]}`}></div>
                </div>
              );
            })}
          </div>
          <div className="hover-zone corner-zone" id="corner3" onMouseEnter={(event) => this.mouseEnterHandler(event, "corner")} onMouseLeave={this.mouseLeaveHandler}></div>
          <div className="hover-zone corner-zone" id="corner4" onMouseEnter={(event) => this.mouseEnterHandler(event, "corner")} onMouseLeave={this.mouseLeaveHandler}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    language: state.changeLanguage.language,
  };
};

const mapDispatchToProps = {
  changePageNumber,
  mouseEnterOrnament,
  mouseEnterContent,
  mouseEnterMovie,
  hoveredChanged,
  changeLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(HoverZones);
