import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../client";

function QuizEditBottomBar(props) {
    const mode = props.mode;
    const quiz = useSelector((state) => state.quizzesReducer.quiz);
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();
    const handleSave = () => {
        if(quiz.dueDate==null||quiz.availableFromDate==null||quiz.availableUntilDate==null
            ||quiz.quizname?.length==0){
                alert("Please Complete all input!")
                return;
            }
            if(mode==="Edit"){
                client.updateQuiz(quiz)
            }else{
                client.createQuiz(courseId,quiz)
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