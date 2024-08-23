import React, { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setimage] = useState("");

  const handleChangeFile = (event) => {};
  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz</legend>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Quiz's Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <label>Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              placeholder="Quiz's Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              options={options}
              placeholder="Quiz's type"
            />
          </div>
          <div className="moew-actions form-group">
            <label className="mb-1">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                handleChangeFile(event);
              }}
            />
          </div>
          <input type="submit" value="Submit" />
        </fieldset>
      </div>
      <div className="list"></div>
    </div>
  );
};

export default ManageQuiz;
