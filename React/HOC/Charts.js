import React, { Component, Fragment } from "react";

class ChartOne extends Component {
  state = { isHover: false };
  mouseOver = () => this.setState({ isHover: true });
  mouseOut = () => this.setState({ isHover: false });
  render() {
    return (
      <Fragment>
        {this.state.isHover === true ? (
          <p>chart one hovering</p>
        ) : (
          <p>chart one not hovering</p>
        )}
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <h1>Chart One</h1>
        </div>
      </Fragment>
    );
  }
}

function ChartTwo(props) {
  return (
    <Fragment>
      {props.isHover === true ? (
        <p>chart two hovering</p>
      ) : (
        <p>chart two not hovering</p>
      )}
      <div>
        <h1>Chart Two</h1>
      </div>
    </Fragment>
  );
}

function ChartThree(props) {
  return (
    <Fragment>
      {props.isHover === true ? (
        <p>chart three hovering</p>
      ) : (
        <p>chart three not hovering</p>
      )}
      <div>
        <h1>Chart Three</h1>
      </div>
    </Fragment>
  );
}

function ChartFour(props) {
  return (
    <Fragment>
      {props.hovering === true ? (
        <p>chart Four hovering</p>
      ) : (
        <p>chart Four not hovering</p>
      )}
      <div>
        <h1>Chart Four</h1>
        <p>height: {props.height}</p>
      </div>
    </Fragment>
  );
}

export { ChartTwo, ChartOne, ChartThree, ChartFour };
