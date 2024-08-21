import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  useEffect(() => {
    fecthQuestion();
  }, [quizId]);

  const fecthQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <div className="question"></div>
          <div className="answer">
            <div className="a-child"></div>
            <div className="a-child"></div>
            <div className="a-child"></div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Back</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content"></div>
    </div>
  );
};

export default DetailQuiz;
