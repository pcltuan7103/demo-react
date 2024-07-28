//Class Component
//Function Component
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Le Tuan",
    address: "Da Nang",
    age: 22,
  };

  handleOnClick(event) {
    console.log(event.target);
  }

  handleOnMouseOver(event) {
    console.log(event.target);
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and My address is {this.state.address}
        <button onClick={this.handleOnClick}>Click me</button>
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
      </div>
    );
  }
}

export default MyComponent;
