import React, { useEffect } from 'react';
import { useNavigate, useParams, Link,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as quizClient from "../client";
import * as questionClient from "./Questions/client"

function QuizEditBottomBar(props) {
    const mode = props.mode;
    const quiz = useSelector((state) => state.quizzesReducer.quiz);
    const questions = useSelector((state) => state.questionsReducer.questions);
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const Added = queryParams.get('Added');

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const handleSave = async (toPublish) => {
        if(quiz.dueDate==null||quiz.availableFromDate==null||quiz.availableUntilDate==null
            ||quiz.quizname?.length==0){
                alert("Please Complete all input!")
                return;
            }
            let totalPoints = 0;
            if(mode==="Edit"){
                if(!Added){
                    if(toPublish){
                        const publicQuiz =  {...quiz , isPublish:true};
                        quizClient.updateQuiz(publicQuiz);
                    }else{
                        quizClient.updateQuiz(quiz);
                    }
                }else{
                    quizClient.updateQuiz(quiz);
                questionClient.deleteQuestionsByQuizId(quiz._id);
                await sleep(200);
                let newquestion = JSON.parse(JSON.stringify(questions));
                newquestion.forEach(q => {
                    if(q._id){
                        delete q._id
                    }
                    console.log(totalPoints+" "+q.points);
                    totalPoints+=parseInt(q.points);
                    questionClient.createQuestion(quiz._id,q);
                });
                let scoredQuiz = JSON.parse(JSON.stringify(quiz));
                scoredQuiz.points = totalPoints;
                if(toPublish){
                    scoredQuiz.isPublish = true;
                }
                quizClient.updateQuiz(scoredQuiz);
                }
                
            }else{//Create
                let newquiz;
                if(!Added){
                    if(toPublish){
                        const publicQuiz =  {...quiz , isPublish:true};
                        quizClient.createQuiz(courseId,publicQuiz);
                    }else{
                       newquiz = await quizClient.createQuiz(courseId,quiz); 
                    }
                }else{
                    newquiz = await quizClient.createQuiz(courseId,quiz);
                // questionClient.deleteQuestionsByQuizId(newquiz._id);
                questions.forEach(q => {
                    questionClient.createQuestion(newquiz._id,q);
                    totalPoints+=q.points;
                });
                let scoredQuiz = JSON.parse(JSON.stringify(newquiz));
                scoredQuiz.points = totalPoints;
                if(toPublish){
                    scoredQuiz.isPublish = true;
                }
                quizClient.updateQuiz(scoredQuiz);
                }
                
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
                <button onClick={()=>handleSave(true)} className="btn btn-danger ms-2">
                    Save & Publish
                </button>
                <button onClick={()=>handleSave(false)} className="btn btn-danger ms-2">
                    Save
                </button>

            </div>

        </div>

    );
}
export default QuizEditBottomBar;