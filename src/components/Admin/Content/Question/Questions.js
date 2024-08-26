import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import {
  FaRegPlusSquare,
  FaRegMinusSquare,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="form-group col-6">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add Question:</div>
        <div>
          <div className="questions-content">
            <div className="form-floating description">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">Upload Image</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <FaRegPlusSquare className="icon-add" />
              </span>

              <span>
                <FaRegMinusSquare className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <FaPlusCircle className="icon-add" />
              </span>

              <span>
                <FaMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
