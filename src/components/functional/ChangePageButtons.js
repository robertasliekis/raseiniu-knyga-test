import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { changePageNumber, resetChanged } from "../actions";

function ChangePageButtons({ page, movieOpen, changePageNumber, resetChanged }) {
  // this.handImageRef = React.createRef();

  const [hovered, setHovered] = useState(false);

  const handleButtonBackClick = () => {
    let currentPage = page - 1;
    changePageNumber(currentPage);
  };

  const handleButtonNextClick = () => {
    let currentPage = page + 1;
    changePageNumber(currentPage);
  };

  const mouseEnterHandler = () => {
    setHovered(true);
    if (!movieOpen) {
      // this.handImageRef.current.classList.add("hand-image-animation");
    }
  };

  const mouseLeaveHandler = () => {
    setHovered(false);
    // this.clearTimer();
    // this.handImageRef.current.classList.remove("hand-image-animation");
  };

  const clearTimer = () => {
    clearTimeout(this.timer);
  };

  useEffect(() => {
    const onTimeout = () => {
      changePageNumber(0);
      resetChanged();
    };

    let hoverTime;

    if (hovered) {
      if (movieOpen) {
        hoverTime = 610000;
      } else {
        hoverTime = 120000;
      }
    }

    let timer = setTimeout(onTimeout, hoverTime);

    // else {
    //   clearTimer();
    // }
    return () => {
      window.clearTimeout(timer);
    };
  }, [changePageNumber, hovered, movieOpen, resetChanged]);

  return (
    <div className="change-page-container" onMouseEnter={() => mouseEnterHandler()} onMouseLeave={() => mouseLeaveHandler()}>
      <div className="change-page-buttons" style={{ justifyContent: page === 0 ? "flex-end" : "space-between" }}>
        <div className="btn btn-back" style={{ display: page === 0 ? "none" : "flex" }} onClick={() => handleButtonBackClick()}>
          BACK
        </div>
        <h1>PAGE {page}</h1>
        <div className="btn btn-next" style={{ display: page > 6 ? "none" : "flex" }} onClick={() => handleButtonNextClick()}>
          NEXT
        </div>
      </div>
      <div className="reset-box-container">
        <div className="reset-box reset-box-left"></div>
        <div className="reset-box reset-box-right"></div>
        <div className="reset-box reset-box-top"></div>
        <div className="reset-box reset-box-bottom"></div>
      </div>
      <div className="hand-image hand-image-animation" /*ref={this.handImageRef}*/></div>
    </div>
  );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButtons);
