//Class Component
//Function Component
import React from "react";
import Userinfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      {
        id: 1,
        name: "Tuan",
        age: 16,
      },
      {
        id: 2,
        name: "Vy",
        age: 21,
      },
      {
        id: 1,
        name: "Duy",
        age: 22,
      },
    ],
  };

  //JSX
  render() {
    return (
      <div>
        <Userinfor />
        <br />
        <br />
        <DisplayInfor listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
