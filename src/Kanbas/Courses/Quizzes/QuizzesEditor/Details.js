// Details.js

import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuiz, updateQuiz } from '../quizzesReducer';
import * as client from "../client";
import QuizEditBar from './QuizEditBar';
import QuizEditBottomBar from './QuizEditBottomBar';

const Details = (props) => {
    const mode = props.mode;
    const quiz = useSelector((state) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    const { courseId, quizId } = useParams();
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
    const setQuizDefault = () => {
        dispatch(setQuiz({
            "quizname": "Sample",
            "instruction": "Follow the instructions.",
            "points": 0,
            "type": "Multiple Choice",
            "assignmentGroup": "Homework",
            "minutes": 30,
            "attemptTimes": 3,
            "numberOfQuestions": 0,
            "availableFromDate": getCurrentFormattedDateTime(),
            "availableUntilDate": getCurrentFormattedDateTime(),
            "dueDate": getCurrentFormattedDateTime(),
            "isShuffle": false,
            "isTimeLimited": true,
            "isOneQuestionAtaTime": false,
            "isRequireRespondusLockdownBrowser": false,
            "isRequiredToViewQuizResults": false,
            "isWebcam": false,
            "isLockQuestionAfterAnswer": false,
            "status": "Not available",
            "showCorrectAnswers": "Immediately",
            "courseId": { courseId }
        }))
    }

    useEffect(() => {
        if (mode === "Edit") {
            client.findQuizById(quizId)
                .then((Quiz) => { dispatch(setQuiz(Quiz)) }
                );
        }
        else {
            setQuizDefault();
        }

    }, []);

    return (
        <div>
            <QuizEditBar mode={mode}/>
            {/* <p>{mode}</p>
      <p>{courseId}</p>
      <p>{JSON.stringify(quiz)}</p> */}
            <form className='my-3'>
                <div className="form-group" style={{ width: "80%" }}>
                    <input
                        id="quizname"
                        value={quiz.quizname}
                        className="form-control mb-2"
                        onChange={(e) => dispatch(setQuiz({ ...quiz, quizname: e.target.value }))}
                    />
                    <p>Quiz instructions:</p>
                    <textarea
                        id="instruction"
                        value={quiz.instruction}
                        className="form-control mb-2"
                        onChange={(e) => dispatch(setQuiz({ ...quiz, instruction: e.target.value }))}
                    />
                    <div class="container text-center">
                        <div className="row">
                            <div className='col-4'>
                            </div>
                            <div className='col-8 d-flex'>
                                <h6>Options</h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-4'>
                            </div>
                            <div className='col-8 d-flex'>
                                <input
                                    id='isShuffle'
                                    type='checkbox'
                                    value={quiz.isShuffle}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, isShuffle: e.target.value }))}
                                />
                                <label className='ps-2' for="isShuffle">Shuffle Answers</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                            </div>
                            <div className='col-8 d-flex'>
                                <input
                                    id='isTimeLimited'
                                    type='checkbox'
                                    value={quiz.isTimeLimited}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, isTimeLimited: e.target.value }))}
                                />
                                <label className='ps-2' for="isTimeLimited">Time Limit</label>
                                <input
                                    className='ms-4'
                                    style={{ width: '60px', height: '25px' }}
                                    id='minutes'
                                    type='number'
                                    value={quiz.minutes}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, minutes: e.target.value }))}
                                />
                                <label className='ms-2' for="minutes">Minutes</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                            </div>
                            <div className='col-8 d-flex'>
                                <input
                                    id='isMultipleAttempts'
                                    type='checkbox'
                                    value={quiz.isMultipleAttempts}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, isMultipleAttempts: e.target.value }))}
                                />
                                <label className='ps-2' for="isTimeLimited">Allow Multiple Attempts</label>
                                <input
                                    className='ms-4'
                                    style={{ width: '60px', height: '25px' }}
                                    id='attemptTimes'
                                    type='number'
                                    value={quiz.attemptTimes}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, attemptTimes: e.target.value }))}
                                />
                                <label className='ms-2' for="minattemptTimesutes">Attempt Times</label>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className='col-2'>
                                Assign
                            </div>
                            <div className='border border-secondary p-3 col-10'>
                                <h6 style={{ textAlign: 'left' }}><label for="quizDueDate">Due</label></h6>
                                <input
                                    id="dueDate"
                                    class="form-control"
                                    type="datetime-local"
                                    value={quiz.dueDate}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))}
                                />
                                <br />
                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 style={{ textAlign: 'left' }}><label for="availableFromDate">Avaliable From</label></h6>
                                        </div>
                                        <div className="col">
                                            <h6 style={{ textAlign: 'left' }}><label for="availableUntilDate">Untill</label></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                id="availableFromDate"
                                                className="form-control"
                                                type="datetime-local"
                                                value={quiz.availableFromDate}
                                                onChange={(e) => dispatch(setQuiz({ ...quiz, availableFromDate: e.target.value }))}
                                            />

                                        </div>
                                        <div className="col">
                                            <input
                                                id="availableUntilDate"
                                                className="form-control"
                                                type="datetime-local"
                                                value={quiz.availableUntilDate}
                                                onChange={(e) => dispatch(setQuiz({ ...quiz, availableUntilDate: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <QuizEditBottomBar mode={mode}/>

                </div>
            </form>
        </div>
    );
};

export default Details;
