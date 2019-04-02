class Toggle extends Component {
  state = {
    on: false,
  }
  
  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }
  
  render() {
    return (
      <div>
        {this.state.on && this.props.children}
        <button onClick={this.toggle}>Show/Hide</button>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div>
        <Toggle>
          <h1>This goes to props.children</h1>
        </Toggle>
      </div>
    )
  }
}
