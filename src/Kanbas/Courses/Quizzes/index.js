import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuizzesBar from "./QuizzesBar";
import { BsGripVertical, BsCalculator } from "react-icons/bs";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, setQuiz, setQuizzes, updateQuiz } from "./quizzesReducer";
import * as client from "./client";
import * as questionClient from "./QuizzesEditor/Questions/client"
import { RiForbidLine } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";

function Quizzes() {
  const { courseId } = useParams();
  const quizzes = useSelector((state) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    client.findQuizzesForCourse(courseId)
      .then((quizzes) => { dispatch(setQuizzes(quizzes)) }
      );
  }, [courseId]);


  const handleDeleteClick = (quiz) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this quiz?");
    if (isConfirmed) {
      questionClient.deleteQuestionsByQuizId(quiz._id);
      client.deleteQuiz(quiz._id).then((status) => {
        dispatch(deleteQuiz(quiz._id));
      });

    }
  };

  const handlePublishClick = (quiz) => {
    const newQuiz = { ...quiz, isPublish: !quiz.isPublish };
    client.updateQuiz(newQuiz).then((status) => {
      dispatch(updateQuiz(newQuiz));
    });


  };

  return (
    <div className="mx-2">
      <QuizzesBar courseId={courseId} showDelete={showDelete} setShowDelete={setShowDelete} />
      {quizzes.length === 0 &&
        (<div style={{ color: "red" }}>Please add Quiz</div>)}
      <div
        className="list-group my-2"
        style={{ borderLeft: "3px solid green" }}
      >
        <div className="list-group-item list-group-item-secondary">
          {courseId}
        </div>

        {quizzes.map((Quiz) => (
          <div
            className="list-group-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <BsGripVertical className="ms-2" />
            <BsCalculator className="ms-2" style={{ color: "green" }} />
            <div className="my-0 py-0" style={{ flex: 1 }}>
              <Link
                key={Quiz._id}
                to={`/Kanbas/Courses/${courseId}/Quizzes/Screen/${Quiz._id}`}
                // to={`/Kanbas/Courses/${courseId}/Quizzes/Edit/${Quiz._id}`}
                className="ms-2 mt-auto quiz-link"
                onClick={() => { dispatch(setQuiz(Quiz)) }}
              >
                {Quiz.quizname}
              </Link>
              <br />
              <p className="ms-2 mb-0 pb-0" style={{ fontSize: 14, }}>
                Due: {Quiz.dueDate.replace("T", " ")} | ~/{Quiz.points} pts
              </p>

            </div>
            <div className="mx-2" onClick={() => handlePublishClick(Quiz)}>
              {Quiz.isPublish ? (
                <span className='ps-2 text-success'><FaRegCircleCheck className=" publish" size={20} /></span>
              ) : (
                <span className='ps-3 text-secondary'><RiForbidLine className=" publish" size={23} /></span>
              )}
            </div>
            {(showDelete && (<button
              className="btn btn-danger"
              onClick={() => handleDeleteClick(Quiz)}>
              Delete
            </button>))}


          </div>
        ))}
      </div>
    </div>
  );
}
export default Quizzes;
