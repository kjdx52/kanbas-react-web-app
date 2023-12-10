import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import QuizEditBar from '../QuizEditBar';
import QuizEditBottomBar from '../QuizEditBottomBar';
import QuestionsList from './QuestionsList';
import { AiOutlinePlus } from 'react-icons/ai';

const Questions = (props) => {
  const mode = props.mode;
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const navigateToQuestionPage = () => {
    if (mode === "Edit") {
      navigate(`/Kanbas/Courses/${courseId}/Questions/Add/${quizId}`);
    } else if (mode === "Create") {
      navigate(`/Kanbas/Courses/${courseId}/Questions/Creator`);
    }
  };
  return (
    <div>
      <QuizEditBar mode={mode} />
      {mode === "Edit" && (
        <QuestionsList mode={mode} />
      )}
      {mode === "Create" && (
        <>
          <br />
          <br />
          <br />
          <br />
        </>
      )}
      <div className='text-end my-3' style={{ width: "80%" }}>
        <button
        onClick={()=> navigateToQuestionPage()}
          className='btn btn-secondary'
        >
          <AiOutlinePlus /> New Question
        </button>
      </div>
      <div style={{ width: "90%" }}>

        <QuizEditBottomBar mode={mode} />
      </div>

    </div>
  );
};

export default Questions;
