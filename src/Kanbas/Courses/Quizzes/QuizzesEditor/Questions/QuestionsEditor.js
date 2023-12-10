import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, setQuestion, setQuestions, updateQuestion,updateQuestionByIndex } from './questionsReducer';
import * as client from "./client";

function QuestionEditor(props) {
    const mode = props.mode;
    const navigate = useNavigate();
    const question = useSelector((state) => state.questionsReducer.question);
    const questions = useSelector((state) => state.questionsReducer.questions);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const questionIndex = parseInt(queryParams.get('index'), 10);
    const ownerQuiz = queryParams.get('ownerQuiz')
    const dispatch = useDispatch();
    const { courseId, quizId, questionId } = useParams();
    const [questionType, setQuestionType] = useState(null);
    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setQuestionType(newType);
        if (newType === "Multiple Choice") {
            dispatch(setQuestion({
                "type": "Multiple Choice",
                "title": "Question Title",
                "content": null,
                "instruction": "Choose the correct option.",
                "points": 1,
                "index": questionIndex,
                "MCQchoice": [],

            }))
        } else if (newType === "True/False") {
            dispatch(setQuestion({
                "type": "True/False",
                "title": "Question Title",
                "content": null,
                "instruction": "Answer with true or false.",
                "points": 1,
                "index": questionIndex,
                "answerForTF": true

            }))
        } else if (newType === "Fill in the blank") {
            dispatch(setQuestion({
                "type": "Fill in the blank",
                "title": "Question Title",
                "content": null,
                "instruction": "Fill in the blank with the appropriate word.",
                "points": 1,
                "index": questionIndex,
                "answerForBlank": []

            }))
        }
    };
    const handleChoiceChange = (index, text) => {
        const newChoices = question.MCQchoice.map((choice, i) => {
            if (i === index) {
                return { ...choice, text: text };
            }
            return choice;
        });

        dispatch(setQuestion({
            ...question,
            MCQchoice: newChoices,
        }));
    };

    const handleAnswerChange = (index, text) => {
        const newAnswers = question.answerForBlank.map((answer, i) => {
            if (i === index) {
                return text;
            }
            return answer;
        });

        dispatch(setQuestion({
            ...question,
            answerForBlank: newAnswers,
        }));
    };

    const handleChoiceCheckChange = (index) => {
        const newChoices = question.MCQchoice.map((choice, i) => {
            if (i === index) {
                return { ...choice, isCorrect: !choice.isCorrect };
            }
            return choice;
        });

        dispatch(setQuestion({
            ...question,
            MCQchoice: newChoices,
        }));
    };

    const handleRemoveChoice = (index) => {
        // const removedChoice = question.MCQchoice[index];

        dispatch(setQuestion({
            ...question,
            MCQchoice: question.MCQchoice.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveAnswer = (index) => {

        dispatch(setQuestion({
            ...question,
            answerForBlank: question.answerForBlank.filter((_, i) => i !== index),
        }));
    };
    const handleAddMCQChoice = () => {
        const newChoice = { text: '', isCorrect: false };

        dispatch(setQuestion({
            ...question,
            MCQchoice: [...question.MCQchoice, newChoice],
        }));
    };

    const handleAddBlanAnswer = () => {
        const newAnswers = "";

        dispatch(setQuestion({
            ...question,
            answerForBlank: [...question.answerForBlank, newAnswers],
        }));
    };

    const handleCancel = async () => {
        if (mode === "Create") {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/Creator/questions`)
        } else if (mode === "Add") {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quizId}/questions`)
        } else if (mode === "Edit") {
            if(ownerQuiz == "Creator"){
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/Creator/questions?Added=true`)
            }else{
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${ownerQuiz}/questions?Added=true`)
            }
        }
    };

    const handleSave = async () => {
        if (mode === "Create") {
            dispatch(addQuestion(question));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/Creator/questions?Added=true`)
        } else if (mode === "Add") {
            dispatch(setQuestion({ ...question, quizId: ownerQuiz }))
            dispatch(addQuestion(question));
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quizId}/questions?Added=true`)
        } else if (mode === "Edit") {
            // const Question = await client.findQuestionById(questionId);
            if (questionId == "temporary") {
                if(ownerQuiz == "Creator"){
                    dispatch(updateQuestionByIndex(question))
                }else{
                    dispatch(setQuestion({ ...question, quizId: ownerQuiz }))
                    dispatch(updateQuestionByIndex(question))
                }
                
            } else {
                dispatch(setQuestion({ ...question, _id: questionId, quizId: ownerQuiz }))
                dispatch(updateQuestion(question))
            }
                if(ownerQuiz == "Creator"){
                    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Creator/questions?Added=true`)
                }else{
                    navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${ownerQuiz}/questions?Added=true`)
                }
                


        }
    };


    useEffect(() => {

        if (mode === "Create" || mode === "Add") {
            dispatch(setQuestion({
                "type": "Multiple Choice",
                "title": "Question Title",
                "content": null,
                "instruction": "Choose the correct option.",
                "points": 1,
                "index": questionIndex,
                "MCQchoice": [],

            }))
            setQuestionType("Multiple Choice")
        } else if (mode === "Edit") {
            // client.findQuestionById(questionId)
            //     .then((Question) => { dispatch(setQuestion(Question)) }
            //     );
            if ((!question || question._id != questionId) && questionId != "temporary") {
                navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
            }
            setQuestionType(question.type);
        }
    }, []);
    return (
        (questionType && (
            <div className=' my-2'>
                {/* {questionIndex} */}
                {/* {question._id}
            <br/>
            {questionId}
            {mode}
        <p>{JSON.stringify(question)}</p> */}
                <div className='border' style={{ width: "80%" }}>
                    <div>
                        <input
                            className='mx-2 my-2'
                            value={question.title}
                            onChange={(e) => dispatch(setQuestion({ ...question, title: e.target.value }))}
                        >
                        </input>
                        <select id="dropdown" value={questionType} onChange={handleTypeChange}>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="True/False">True/False</option>
                            <option value="Fill in the blank">Fill in the blank</option>
                        </select>
                        <p className='float-end mx-2 my-2 fw-bold'>pts
                            <input
                                type='number'
                                className='mx-2'
                                style={{ width: "50px" }}
                                value={question.points}
                                onChange={(e) => dispatch(setQuestion({ ...question, points: e.target.value }))}
                                min={0}
                            >
                            </input>
                        </p>
                    </div>
                    <div className='border-top my-3 '>
                        {questionType === "Multiple Choice" && (
                            <div className=''>
                                <h6 className='ms-2 my-2'>Question:</h6>
                                <textarea
                                    style={{ width: "90%", margin: "auto", display: "block" }}
                                    value={question.content}
                                    onChange={(e) => dispatch(setQuestion({ ...question, content: e.target.value }))}
                                >
                                </textarea>
                                <div className='mx-3 my-3'>
                                    {question.MCQchoice.map((choice, index) => (
                                        <div key={index} className='mx-4 my-3 border-top' style={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <input
                                                type="checkbox"
                                                className='ms-3 my-3'
                                                checked={choice.isCorrect}
                                                onChange={() => handleChoiceCheckChange(index)}
                                            />
                                            <textarea
                                                className='ms-2 my-3'
                                                style={{ height: "40px", width: "60%" }}
                                                value={choice.text}
                                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                            />
                                            <button type="button"
                                                className='btn-danger btn ms-2 my-3'
                                                style={{ height: "40px" }}
                                                onClick={() => handleRemoveChoice(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className='btn btn-light ms-3' type="button" onClick={handleAddMCQChoice}>
                                    Add Choice
                                </button>

                            </div>
                        )}
                        {questionType === "True/False" && (
                            <div className=''>
                                <h6 className='ms-2 my-2'>Question:</h6>
                                <textarea
                                    style={{ width: "90%", margin: "auto", display: "block" }}
                                    value={question.content}
                                    onChange={(e) => dispatch(setQuestion({ ...question, content: e.target.value }))}
                                >
                                </textarea>
                                <div className='mx-3 my-3'>
                                    <div className='border-top my-3 mx-3'>
                                        <label >
                                            <input
                                                type="radio"
                                                name="TFanswer"
                                                value="true"
                                                checked={question.answerForTF === true}
                                                onChange={(e) => dispatch(setQuestion({ ...question, answerForTF: !question.answerForTF }))}
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
                                                checked={question.answerForTF === false}
                                                onChange={(e) => dispatch(setQuestion({ ...question, answerForTF: !question.answerForTF }))}
                                            />
                                            False
                                        </label>
                                    </div>


                                </div>

                            </div>
                        )}
                        {questionType === "Fill in the blank" && (
                            <div className=''>
                                <h6 className='ms-2 my-2'>Question:</h6>
                                <textarea
                                    style={{ width: "90%", margin: "auto", display: "block" }}
                                    value={question.content}
                                    onChange={(e) => dispatch(setQuestion({ ...question, content: e.target.value }))}
                                >
                                </textarea>
                                <div className='mx-3 my-3'>
                                    {question.answerForBlank.map((possibleAnswer, index) => (
                                        <div key={index} className='mx-4 my-3 border-top' style={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <textarea
                                                className='ms-2 my-3'
                                                style={{ height: "40px", width: "60%" }}
                                                value={possibleAnswer}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            />
                                            <button type="button"
                                                className='btn-danger btn ms-2 my-3'
                                                style={{ height: "40px" }}
                                                onClick={() => handleRemoveAnswer(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className='btn btn-light ms-3' type="button" onClick={handleAddBlanAnswer}>
                                    Add Answer
                                </button>

                            </div>
                        )}

                    </div>
                    <br />
                    <div className='float-end my-3'>
                        <button className='btn btn-secondary ms-2}'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button className='btn btn-danger ms-2'
                            onClick={handleSave}
                        >
                            Save Question
                        </button>
                    </div>
                </div>
            </div>
        ))


    );
}
export default QuestionEditor


