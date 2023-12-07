import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import questionsReducer from "../Courses/Quizzes/QuizzesEditor/Questions/questionsReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    questionsReducer
  }
});


export default store;