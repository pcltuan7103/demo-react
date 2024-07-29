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
    console.log("My name is ", this.state.name);

    this.setState({
      name: "Tuan",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnMouseOver(event) {
    console.log(event.target);
  }

  handleOnChangeInput(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and My address is {this.state.address}
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            onChange={(event) => {
              this.handleOnChangeInput(event);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
