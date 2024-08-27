import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import {
  FaRegPlusSquare,
  FaRegMinusSquare,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import LightBox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, qID, aID) => {
    let questionsClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };
      let index = questionsClone.findIndex((item) => item.id === qID);
      if (index > -1) {
        questionsClone[index].answers.push(newAnswer);
      }
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === qID);
      if (index > -1) {
        questionsClone[index].answers = questionsClone[index].answers.filter(
          (item) => item.id !== aID
        );
      }
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, qID, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === qID);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleAnswerQuestion = (type, aID, qID, value) => {
    let questionsClone = _.cloneDeep(questions);
    let qIndex = questionsClone.findIndex((item) => item.id === qID);
    if (qIndex > -1) {
      questionsClone[qIndex].answers = questionsClone[qIndex].answers.map(
        (answer) => {
          if (answer && answer.id === aID) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChangeFileQuestion = (qID, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qID);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].image = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;

    // Validate answers
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexQ = i;
          indexA = j;
          break;
        }
      }
      if (!isValidAnswer) break;
    }

    if (!isValidAnswer) {
      toast.error(
        `Answer ${indexA + 1} in Question ${indexQ + 1} cannot be empty!`
      );
      return;
    }

    // Validate questions
    let isValidQuestion = true;
    let indexQ1 = 0;

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }

    if (!isValidQuestion) {
      toast.error(`Question ${indexQ1 + 1} cannot be empty!`);
      return;
    }

    // Submit questions and answers
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.image
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Questions and answers created successfully!");
    setQuestions(initQuestions);
  };

  const handlePreviewImage = (qID) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qID);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].image),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="form-group col-6">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div className="q-main mb-4" key={question.id}>
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      value={question.description}
                      placeholder="name@example.com"
                      onChange={(event) => {
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        );
                      }}
                    />
                    <label>Question {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(event) => {
                        handleOnChangeFileQuestion(question.id, event);
                      }}
                    />
                    <span>
                      {question.image ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handlePreviewImage(question.id);
                          }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span
                      onClick={() => {
                        handleAddRemoveQuestion("ADD", "");
                      }}
                    >
                      <FaRegPlusSquare className="icon-add" />
                    </span>

                    {questions.length > 1 && (
                      <span
                        onClick={() => {
                          handleAddRemoveQuestion("REMOVE", question.id);
                        }}
                      >
                        <FaRegMinusSquare className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) => {
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            );
                          }}
                        />
                        <div className="form-floating answer-name">
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={(event) => {
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              );
                            }}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() => {
                              handleAddRemoveAnswer("ADD", question.id);
                            }}
                          >
                            <FaPlusCircle className="icon-add" />
                          </span>

                          {question.answers.length > 1 && (
                            <span
                              onClick={() => {
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                );
                              }}
                            >
                              <FaMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => {
                handleSubmitQuestionForQuiz();
              }}
              className="btn btn-warning"
            >
              Save Questions
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <LightBox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => {
              setIsPreviewImage(false);
            }}
          ></LightBox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
