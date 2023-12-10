import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, setQuestion, setQuestions, updateQuestion } from './questionsReducer';
import QuizEditBar from '../QuizEditBar';
import QuizEditBottomBar from '../QuizEditBottomBar';
import QuestionsList from './QuestionsList';
import { AiOutlinePlus } from 'react-icons/ai';

const Questions = (props) => {
  const mode = props.mode;
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const questions = useSelector((state) => state.questionsReducer.questions);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const Added = queryParams.get('Added');
  const navigateToQuestionPage = () => {
    if (mode === "Edit") {
      navigate(`/Kanbas/Courses/${courseId}/Questions/Add/${quizId}?index=${questions.length+1}&ownerQuiz=${quizId}`);
    } else if (mode === "Create") {
      navigate(`/Kanbas/Courses/${courseId}/Questions/Creator?index=${questions.length+1}`);
    }
  };
  useEffect(() => {

    if (!Added) {
        if (mode === "Create") {
          dispatch(setQuestions([]))
        }
    }

}, [quizId]);
  return (
    <div>
      {/* <p>{JSON.stringify(questions)}</p>  */}
      <QuizEditBar mode={mode} />
      {(mode === "Edit"||Added) && (
        <QuestionsList mode={mode} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}/>
      )}
      {(mode === "Create"&&!Added )&& (
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
