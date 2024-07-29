import React from "react";

class DisplayInfor extends React.Component {
  render() {
    const { age, name } = this.props;

    return (
      <div>
        <div>My name is {name}</div>
        <div>My old is {age}</div>
      </div>
    );
  }
}

export default DisplayInfor;
