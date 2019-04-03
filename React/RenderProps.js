class Toggle extends Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render() {
    return (
      <div>
        {this.state.on && this.props.children}
        <button onClick={this.toggle}>Show/Hide</button>
      </div>
    );
  }
}

class RenderPropsToggle extends Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render() {
    const { render } = this.props;
    return (
      <div>
        {render({
          on: this.state.on,
          toggle: this.toggle
        })}
      </div>
    );
  }
}

class RPChildrenToggle extends Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render() {
    const { children } = this.props;
    return children({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Toggle>
          <h1>This goes to props.children</h1>
        </Toggle>
        <RenderPropsToggle
          render={({ on, toggle }) => (
            <div>
              {on && <h1>Show Me</h1>}
              <button onClick={toggle}>Show/Hide</button>
            </div>
          )}
        />
        <RPChildrenToggle>
          {({ on, toggle }) => (
            <div>
              {on && <h1>Show Me</h1>}
              <button onClick={toggle}>Show/Hide</button>
            </div>
          )}
        </RPChildrenToggle>
      </div>
    );
  }
}
