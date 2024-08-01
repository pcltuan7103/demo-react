import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";

const DisplayInfor = (props) => {
  const { listUsers } = props;

  const [isShowHideListUsers, setIsShowHideListUsers] = useState(true);

  const handleShowHideListUsers = () => {
    setIsShowHideListUsers(!isShowHideListUsers);
  };

  useEffect(() => {
    if (listUsers.length === 0) {
      alert("You deleted all user");
    }
  }, [listUsers]);

  return (
    <div className="display-infor-container">
      <div>
        <span
          onClick={() => {
            handleShowHideListUsers();
          }}
        >
          {isShowHideListUsers === true ? "Hide List Users" : "Show List User"}
        </span>
      </div>
      {isShowHideListUsers && (
        <>
          {listUsers.map((user, index) => {
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      props.handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfor;
