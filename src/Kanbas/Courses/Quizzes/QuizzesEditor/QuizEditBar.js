
import React from 'react';
import { useNavigate, useParams, Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz } from '../quizzesReducer';
import * as client from "../client";
import "./QuizEditBar.css";
import { RiForbidLine } from "react-icons/ri";
import { FaRegCircleCheck } from "react-icons/fa6";
const QuizEditBar = (props) => {
  const { pathname } = useLocation();
  const quiz = useSelector((state) => state.quizzesReducer.quiz);
  const mode = props.mode;
  return (
    <div>

      <div style={{ textAlign: "right", width: "80%" }}>
      <p >
          Points {quiz.points}
          {mode === 'Create' && (
            <>
              <span className='ps-3 text-secondary'><RiForbidLine size={22} /></span>
              <span className='ps-1'>Not published</span>
            </>
          )}
          {mode === 'Edit' && (
            <>
              <span className='ps-2 text-success'><FaRegCircleCheck size={22} /></span>
              <span className='ps-1'>Published</span>
            </>
          )}
        </p>
      </div>

      <nav className="nav nav-tabs mt-2">
        <Link
          to="../details"
          className={`nav-link ${pathname.includes("details") ? "active" : ""}`}
        >
          Details
        </Link>
        <Link
          to="../questions"
          className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}
        >
          Questions
        </Link>
      </nav>
    </div>
  );
};

export default QuizEditBar;
