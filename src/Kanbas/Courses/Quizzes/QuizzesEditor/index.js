import React from "react";
import { useNavigate, useParams, Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuiz } from "../quizzesReducer";
import * as client from "../client";
import Details from "./Details";
import Questions from "./Questions";


function QuizzesEditor(props) {
    const mode = props.mode;

    return (
        <div>
            
            <Routes>
                <Route path="/" element={<Navigate to="details" />} />
                <Route path="details/*" element={<Details mode={mode}/>} />
                <Route path="questions/*" element={<Questions mode={mode}/>} />
            </Routes>
        </div>

    );
}
export default QuizzesEditor;