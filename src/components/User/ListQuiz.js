import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";

const ListQuiz = () => {
  const [arrayQuiz, setArrayQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrayQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.descroption}</p>
                <button className="btn btn-primary">Start now</button>
              </div>
            </div>
          );
        })}
      {arrayQuiz && arrayQuiz === 0 && <div>You don't have any quiz</div>}
    </div>
  );
};
export default ListQuiz;
