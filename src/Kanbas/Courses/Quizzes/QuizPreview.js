// QuizPreview.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuiz, updateQuiz } from './quizzesReducer';
import { addQuestion, setQuestion, setQuestions, updateQuestion } from './QuizzesEditor/Questions/questionsReducer';
import * as clientClient from "./client"
import * as questionClient from "./QuizzesEditor/Questions/client"
import "./index.css"
import { format, parseISO } from 'date-fns';
import { ImPencil2 } from "react-icons/im";


const QuizPreview = () => {
    const quiz = useSelector((state) => state.quizzesReducer.quiz);
    const questions = useSelector((state) => state.questionsReducer.questions);
    const dispatch = useDispatch();
    const { courseId, quizId } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const currentQuestion = questions.find(question => question.index === currentQuestionIndex);
    const navigate = useNavigate();

    function getCurrentFormattedDateTime() {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

        return formattedDateTime;
    }
    const formatDate = (isoDate) => {
        return format(parseISO(isoDate), "MMM d 'at' hh:mma");
    };
    const startTime = formatDate(getCurrentFormattedDateTime());
    const handleButtonClick = (direction) => {
        if (direction === "before" && currentQuestionIndex > 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (direction === "next" && currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    const navigateToQuizScreen = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Screen/${quizId}`);
  };

    useEffect(() => {
        clientClient.findQuizById(quizId)
            .then((Quiz) => { dispatch(setQuiz(Quiz)) }
            );
        questionClient.findQuestionsForQuiz(quizId)
            .then((questions) => { dispatch(setQuestions(questions)) }
            );

    }, [quizId]);
    return (
        <div>
            <p>Started: {startTime}</p>
            <h2>{quiz.quizname}</h2>
            <div className='row'>

                <div className='mb-4 col-10'
                //   style={{width:"80%"}}
                >
                    {/* {mode} */}
                    {/* {JSON.stringify(questions)} */}
                    {(questions.length > 0 && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                            className='my-2'>


                            <div style={{ width: "80%", border: '1px solid grey', }}>
                                <div style={{ backgroundColor: "lightGrey" }}>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='mx-2 fw-bold'>Question {currentQuestion.index}</span>
                                        </div>
                                        <div className='col text-end mx-2'>
                                            <span>{currentQuestion.points} pts</span>

                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='mx-2'>{currentQuestion.content}</div>
                                    <br />
                                    <div className='mx-2'>{currentQuestion.instruction}</div>
                                    {currentQuestion.type === "True/False" && (
                                        <div className='my-3'>
                                            <div className='border-top my-3 mx-3'>
                                                <label >
                                                    <input
                                                        type="radio"
                                                        name="TFanswer"
                                                        value="true"
                                                    // checked={currentQuestion.answerForTF === true}
                                                    />
                                                    True
                                                </label>
                                            </div>
                                            <div className='border-top my-2 mx-3'>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="TFanswer"
                                                        value="false"
                                                    // checked={currentQuestion.answerForTF === false}
                                                    />
                                                    False
                                                </label>
                                            </div>


                                        </div>
                                    )}
                                    {
                                        currentQuestion.type === "Fill in the blank" && (
                                            <div>
                                                <div className='border-top mx-3 my-3'>
                                                    <label>{`Your Answer:`}</label>
                                                    <input
                                                        className='mx-2 mt-2'
                                                        type="text"
                                                    />
                                                </div>
                                                {/* {currentQuestion.answerForBlank.map((answer, index) => (
                                            <div key={index} className='border-top mx-3 my-3'>
                                                <label>{`Correct answer ${index + 1}:`}</label>
                                                <input
                                                    className='mx-2'
                                                    type="text"
                                                    // value={answer}
                                                    // readOnly={true}
                                                />
                                            </div>
                                        ))} */}

                                            </div>
                                        )
                                    }
                                    {
                                        currentQuestion.type === "Multiple Choice" && (
                                            <div>
                                                <div>
                                                    {currentQuestion.MCQchoice.map((choice, index) => (
                                                        <div key={index} className='mx-3 my-3 border-top'>
                                                            <label >
                                                                <input
                                                                    type="checkbox"
                                                                    name="mcqOption"
                                                                // checked={choice.isCorrect}
                                                                />
                                                                {choice.text}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    ))}

                    {
                        questions.length > 0 && (<div style={{ width: "90%" }} className='text-end'>
                            <button className='btn btn-secondary ms-3' style={{ width: "90px" }}
                                onClick={() => handleButtonClick("before")}
                            >
                                Before
                            </button>
                            <button className='btn btn-secondary ms-3' style={{ width: "90px" }}
                                onClick={() => handleButtonClick("next")}
                            >
                                Next
                            </button>

                        </div>)
                    }
                    {
                        questions.length === 0 && (
                            <>
                                <br />
                                <br />
                                <br />
                                <br />
                            </>
                        )
                    }


                </div>
                <div className='mb-4 col-2'
                >
                    <div
                        className='text-center'
                        style={{ backgroundColor: "lightGrey" }}>
                        <Link
                            to={`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quizId}`}
                        ><label><ImPencil2 /> Keep Editing</label></Link>
                        
                    </div>
                    <h6>Questions:</h6>
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className={`ms-3 previewQuestionLink ${index + 1 === currentQuestionIndex ? 'active' : ''}`}
                            onClick={() => { setCurrentQuestionIndex(index + 1) }}
                        >
                            {`Question ${index + 1}`}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='border text-end' 
            style={{width:"80%"}}>
                <button 
                onClick={navigateToQuizScreen}
                className='btn btn-secondary mx-1 my-2'>Cancel</button>
                <button 
                onClick={navigateToQuizScreen}
                className='btn btn-secondary mx-2 my-2'>Submit Quiz</button>
            </div>
        </div>
    );
};

export default QuizPreview;
