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
        <button>Show/Hide</button>
      </div>
    )
  }
}
