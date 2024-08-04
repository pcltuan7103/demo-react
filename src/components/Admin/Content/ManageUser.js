import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  return (
    <div classNameName="manage-user-container">
      <div classNameName="title">Manage User</div>
      <div classNameName="users-content">
        <div>
          <button>Add New User</button>
        </div>
        <div>
          <ModalCreateUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
