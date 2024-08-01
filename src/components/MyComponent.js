//Class Component
//Function Component
import React from "react";
import AddUserinfor from "./AddUserInfor";
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
        id: 3,
        name: "Duy",
        age: 22,
      },
    ],
  };

  handleAddNewUser = (userObj) => {
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };

  handleDeleteUser = (userId) => {
    let listUsersClone = [...this.state.listUsers];
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    this.setState({
      listUsers: listUsersClone,
    });
  };

  //JSX
  render() {
    return (
      <div>
        <AddUserinfor handleAddNewUser={this.handleAddNewUser} />
        <br />
        <br />
        <DisplayInfor
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        />
      </div>
    );
  }
}

export default MyComponent;
