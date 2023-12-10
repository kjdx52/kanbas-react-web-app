
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";
import { RiForbidLine } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";
import { format, parseISO } from 'date-fns';
const QuizScreen = () => {
  const [quizData, setQuizData] = useState(null);
  const { courseId, quizId } = useParams();
  const formatDate = (isoDate) => {
    return format(parseISO(isoDate), "MMM d 'at' hh:mma");
  };
  const handlePublishClick = (quiz) => {
    const newQuiz = { ...quiz, isPublish: !quiz.isPublish };
    client.updateQuiz(newQuiz).then((status) => {
      setQuizData(newQuiz);
    });


  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await client.findQuizById(quizId);
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    quizId && fetchQuizData();

  }, [quizId]);
  return (
    <div>


      {quizData && (
        <div style={{ width: "80%" }}>
          <div style={{ textAlign: 'right', borderBottom: '1px solid lightGrey', paddingBottom: '5px' }}>
            <button
            onClick={()=>handlePublishClick(quizData)}
              className={`btn mx-1 ${quizData.isPublish ? 'btn-success' : 'btn-danger'}`}
            >
              {quizData.isPublish ? <FaRegCircleCheck className='pb-1' size={22} /> : <RiForbidLine className='pb-1' size={22} />}{' '}
              {quizData.isPublish ? 'Published' : 'Unpublished'}
            </button>
            <button className='btn btn-light mx-1'>Preview</button>
            <Link
                key={quizData._id}
                to={`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quizData._id}`}
                // onClick={() => { dispatch(setQuiz(Quiz)) }}
              >
                <button className='btn btn-light mx-2'><FaPencil /> Edit</button>
              </Link>
            
          </div>
          <h3>{quizData.quizname}</h3>
          <div class="container my-3">
            <div class="row my-2">
              <div class="col-4 text-end fw-bold">
                Shuffle Answers
              </div>
              <div class="col">
                {quizData.isShuffle ? "Yes" : "No"}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-4 text-end fw-bold">
                Time Limit
              </div>
              <div class="col">
                {quizData.isTimeLimited ? quizData.minutes : "No"}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-4 text-end fw-bold">
                Multiple Attempts
              </div>
              <div class="col">
                {quizData.isMultipleAttempts ? quizData.attemptTimes : "No"}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-4 text-end fw-bold">
                Show Correct Answers
              </div>
              <div class="col">
                {quizData.showCorrectAnswers}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-4 text-end fw-bold">
                One Question At a Time
              </div>
              <div class="col">
                {quizData.isOneQuestionAtaTime ? "Yes" : "No"}
              </div>
            </div>
          </div>
          <div className='container'>

            <div className='row' style={{borderBottom: '1px solid lightGrey', paddingBottom: '5px' }}>
              <div className='col'>
                Due
              </div>
              <div className='col'>
                For
              </div>
              <div className='col'>
                Available From
              </div>
              <div className='col'>
                Untill
              </div>

            </div>
            <div className='row' style={{color:"grey", borderBottom: '1px solid lightGrey', paddingBottom: '5px' }}>
              <div className='col'>
                {formatDate(quizData.dueDate)}
              </div>
              <div className='col'>
                Everyone
              </div>
              <div className='col'>
              {formatDate(quizData.availableFromDate)}
              </div>
              <div className='col'>
              {formatDate(quizData.availableUntilDate)}
              </div>

            </div>
          </div>
          <div className='text-center my-3'>
            <button className='btn btn-danger'>Preview</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default QuizScreen;
