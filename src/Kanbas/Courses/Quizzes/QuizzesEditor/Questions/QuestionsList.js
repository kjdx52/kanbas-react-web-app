import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, setQuestion, setQuestions, updateQuestion } from './questionsReducer';
import * as client from "./client";
import { FaEdit } from "react-icons/fa";


const QuestionsList = (props) => {
    const {mode,currentQuestionIndex, setCurrentQuestionIndex} = props;
    const { courseId, quizId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Added = queryParams.get('Added');
    const questions = useSelector((state) => state.questionsReducer.questions);
    const question = useSelector((state) => state.questionsReducer.question);

    const dispatch = useDispatch();
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const currentQuestion = questions.find(question => question.index === currentQuestionIndex);
    const handleButtonClick = (direction) => {
        if (direction === "before" && currentQuestionIndex > 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (direction === "next" && currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    useEffect(() => {

        if (!Added) {
            if (mode === "Edit") {
                client.findQuestionsForQuiz(quizId)
                    .then((questions) => { dispatch(setQuestions(questions)) }
                    );
            } else {
                dispatch(setQuestions([]))
            }
        }

    }, [quizId]);
    return (
        <div className='mb-4'>
            {/* {mode} */}
            {/* {JSON.stringify(questions)} */}
            {(questions.length > 0 && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    className='my-2'>


                    <div style={{ width: "60%", border: '1px solid grey', }}>
                        <div style={{ backgroundColor: "lightGrey" }}>
                            <div className='row'>
                                <div className='col'>
                                    <span className='mx-2 fw-bold'>Question {currentQuestion.index}</span>
                                </div>
                                <div className='col text-end mx-2'>
                                    <span>{currentQuestion.points} pts</span>
                                    <Link
                                        to={`/Kanbas/Courses/${courseId}/Questions/Update/${currentQuestion._id? currentQuestion._id:"temporary"}?index=${currentQuestionIndex}&ownerQuiz=${mode==="Create"? "Creator":quizId}`}
                                        onClick={() => { dispatch(setQuestion(currentQuestion)) }}
                                    >
                                        <button className='btn-secondary ms-2'><FaEdit /></button>
                                    </Link>

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
                                                checked={currentQuestion.answerForTF === true}
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
                                                checked={currentQuestion.answerForTF === false}
                                            />
                                            False
                                        </label>
                                    </div>


                                </div>
                            )}
                            {
                                currentQuestion.type === "Fill in the blank" && (
                                    <div>
                                        {currentQuestion.answerForBlank.map((answer, index) => (
                                            <div key={index} className='border-top mx-3 my-3'>
                                                <label>{`Correct answer ${index + 1}:`}</label>
                                                <input
                                                    className='mx-2'
                                                    type="text"
                                                    value={answer}
                                                    readOnly={true}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                )
                            }
                            {
                                currentQuestion.type === "Multiple Choice" && (
                                    <div>
                                        <div>
                                            {currentQuestion.MCQchoice.map((choice, index) => (
                                                <div key={index} className='mx-3 my-3 border-top'>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name="mcqOption"
                                                            checked={choice.isCorrect}
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
                questions.length > 0 && (<div style={{ width: "80%" }} className='text-end'>
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
    );
};

export default QuestionsList;