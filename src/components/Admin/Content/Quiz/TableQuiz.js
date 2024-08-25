import React, { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [quizUpdate, setQuizUpdate] = useState({});
  const [quizDelete, setquizDelete] = useState({});

  const handleClickBtnUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setQuizUpdate(quiz);
  };

  const handleClickBtnDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setquizDelete(quiz);
  };

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const resetQuizUpdate = () => {
    setQuizUpdate({});
  };

  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.listQuiz &&
            props.listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: "15px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleClickBtnUpdateQuiz(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleClickBtnDeleteQuiz(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        quizUpdate={quizUpdate}
        resetQuizUpdate={resetQuizUpdate}
        fetchQuiz={props.fetchQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        quizDelete={quizDelete}
        fetchQuiz={props.fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
