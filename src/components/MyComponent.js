//Class Component
//Function Component
import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

const MyComponent = () => {
  const [listUsers, setListUsers] = useState([
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
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };

  const handleDeleteUser = (userId) => {
    let listUserClone = [...listUsers];
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    setListUsers(listUserClone);
  };

  return (
    <div>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <br />
      <br />
      <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default MyComponent;
