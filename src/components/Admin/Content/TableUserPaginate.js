import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const { listUsers, pageCount } = props;

  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    props.setCurrentPage(+event.selected + 1);
    props.fecthListUsersWithPaginate(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th>{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        props.handleClickBtnView(user);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        props.handleClickBtnUpdate(user);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        props.handleClickBtnDelete(user);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not Found Data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
