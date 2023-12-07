import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  question: {},
};


const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions : (state, action) => {
      state.questions = action.payload
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});


export const { addQuestion, deleteQuestion,
  updateQuestion, setQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;

