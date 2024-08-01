import React, { useState } from "react";

const AddUserInfor = (props) => {
  const [user, setUser] = useState({
    name: "Le Tuan",
    address: "Da Nang",
    age: 22,
  });

  const { handleAddNewUser } = props;

  const handleOnChangeInput = (event) => {
    setUser({
      ...user,
      name: event.target.value,
    });
  };

  const handleOnChangeAge = (event) => {
    setUser({
      ...user,
      age: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-ramdom",
      name: user.name,
      age: user.age,
    });
  };

  return (
    <div>
      My name is {user.name} and I'm {user.age}
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <label>Your name</label>
        <input
          value={user.name}
          type="text"
          onChange={(event) => {
            handleOnChangeInput(event);
          }}
        />
        <label>Your age</label>
        <input
          value={user.age}
          type="text"
          onChange={(event) => {
            handleOnChangeAge(event);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfor;
