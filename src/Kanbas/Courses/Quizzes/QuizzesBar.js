import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {FaEllipsisVertical} from 'react-icons/fa6';
import { useNavigate, useParams, Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz } from './quizzesReducer';
import * as client from "./client";
const QuizzesBar = ({courseId,showDelete, setShowDelete}) => {
  const dispatch = useDispatch();
  const handleEllipsisClick = () => {
    setShowDelete(!showDelete);
  };
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
      <div style={{ display: 'flex' }}>
        <input type="text" className="form-control w-25" placeholder="Search for Quizzes" />
        <div style={{ marginLeft: 'auto' }}>

          <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes/Creator`}
              className="mt-auto quiz-link"
            >
              <button className="btn btn-danger" ><AiOutlinePlus/> Quizzes</button>
            </Link>
            <button
            className={`btn ${showDelete ? 'btn-dark' : 'btn-secondary'}`}
            onClick={handleEllipsisClick}
          >
            <FaEllipsisVertical/> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizzesBar;
