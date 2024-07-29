//Class Component
//Function Component
import React from "react";
import Userinfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  //JSX
  render() {
    return (
      <div>
        <Userinfor />
        <br />
        <br />
        <DisplayInfor name="Tuan" age="22" />
        <hr />
        <DisplayInfor name="Vy" age="21" />
      </div>
    );
  }
}

export default MyComponent;
