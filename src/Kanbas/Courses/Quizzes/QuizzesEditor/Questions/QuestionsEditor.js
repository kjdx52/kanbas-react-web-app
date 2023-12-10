import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion, setQuestion, setQuestions, updateQuestion } from './questionsReducer';
import * as client from "./client";

function QuestionEditor(props) {
    const mode = props.mode;
    const question = useSelector((state) => state.questionsReducer.question);
    const dispatch = useDispatch();
    const { questionId } = useParams();
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
                "MCQchoice": [],

            }))
        } else if (newType === "True/False") {
            dispatch(setQuestion({
                "type": "True/False",
                "title": "Question Title",
                "content": null,
                "instruction": "Answer with true or false.",
                "points": 1,
                "answerForTF": true

            }))
        } else if (newType === "Fill in the blank") {
            dispatch(setQuestion({
                "type": "Fill in the blank",
                "title": "Question Title",
                "content": null,
                "instruction": "Fill in the blank with the appropriate word.",
                "points": 1,
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

    useEffect(() => {

        if (mode === "Create" || mode === "Add") {
            dispatch(setQuestion({
                "type": "Multiple Choice",
                "title": "Question Title",
                "content": null,
                "instruction": "Choose the correct option.",
                "points": 1,
                "MCQchoice": [],

            }))
            setQuestionType("Multiple Choice")
        } else if (mode === "Edit") {
            client.findQuestionById(questionId)
                .then((Question) => { dispatch(setQuestion(Question)) }
                );
            setQuestionType(question.type);
        }
    }, []);
    return (
        (questionType&&(
<div className=' my-2'>
            {/* {mode}
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
                            <button className='btn btn-light' type="button" onClick={handleAddMCQChoice}>
                                Add Choice
                            </button>

                        </div>
                    )}
                    {questionType === "True/False" && (
                        <div className=''>
                            <h6 className='ms-2 my-2'>Question:</h6>
                            <textarea
                                style={{ width: "90%", margin: "auto", display: "block" }}
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
                        <button type="button" onClick={handleAddBlanAnswer}>
                            Add Answer
                        </button>

                    </div>
                    )}

                </div>
                <br />
            </div>
        </div>
        ))
        

    );
}
export default QuestionEditor


