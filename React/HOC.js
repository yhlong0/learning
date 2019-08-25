import React, { Component } from "react";

function withHover(WrappedComponent, propName = "isHover") {
  return class WithHover extends Component {
    state = { isHover: false };
    mouseOver = () => this.setState({ isHover: true });
    mouseOut = () => this.setState({ isHover: false });

    render() {
      const props = {
        [propName]: this.state.isHover,
        ...this.props
      };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <WrappedComponent {...props} />
        </div>
      );
    }
  };
}

export default withHover;
