import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as quizClient from "../client";
import * as questionClient from "./Questions/client"

function QuizEditBottomBar(props) {
    const mode = props.mode;
    const quiz = useSelector((state) => state.quizzesReducer.quiz);
    const questions = useSelector((state) => state.questionsReducer.questions);
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();
    const handleSave = async () => {
        if(quiz.dueDate==null||quiz.availableFromDate==null||quiz.availableUntilDate==null
            ||quiz.quizname?.length==0){
                alert("Please Complete all input!")
                return;
            }
            if(mode==="Edit"){
                quizClient.updateQuiz(quiz);
                questionClient.deleteQuestionsByQuizId(quiz._id);
                questions.forEach(q => {
                    questionClient.createQuestion(quiz._id,q);
                });

            }else{//Create
                const newquiz = await quizClient.createQuiz(courseId,quiz);
                questionClient.deleteQuestionsByQuizId(newquiz._id);
                questions.forEach(q => {
                    questionClient.createQuestion(newquiz._id,q);
                });
            }

            
       
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };
  
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    return (
        <div className="row" style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            padding: '10px',
        }}>
            <div className="col" style={{ textAlign: 'left' }}>
                <input
                    id='isNotify'
                    type='checkbox'
                />
                <label className='ps-2' for="isNotify">Notify users this quiz has changed</label>

            </div>
            <div className="col" style={{ textAlign: 'right' }}>
                <button onClick={handleCancel} className="btn btn-secondary ms-2">
                    Cancel
                </button>
                <button onClick={handleSave} className="btn btn-danger ms-2">
                    Save
                </button>

            </div>

        </div>

    );
}
export default QuizEditBottomBar;