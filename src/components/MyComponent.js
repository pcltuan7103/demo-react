//Class Component
//Function Component
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Le Tuan",
    address: "Da Nang",
    age: 22,
  };

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and My address is {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
