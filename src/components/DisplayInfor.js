import React from "react";
import "./DisplayInfor.scss";

class DisplayInfor extends React.Component {
  state = {
    isShowListUsers: true,
  };

  handleShowHide(event) {
    this.setState({
      isShowListUsers: !this.state.isShowListUsers,
    });
  }

  render() {
    const { listUsers } = this.props;

    return (
      <div className="display-infor-container">
        <div>
          <span
            onClick={(event) => {
              this.handleShowHide(event);
            }}
          >
            {this.state.isShowListUsers === true
              ? "Hide List User"
              : "Show List User"}
          </span>
        </div>
        {this.state.isShowListUsers && (
          <div>
            {listUsers.map((user, index) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
