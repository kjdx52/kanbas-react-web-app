import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_URL = `${API_BASE}/courses`;
const QUIZZES_URL = `${API_BASE}/quizzes`;
export const findQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_URL}/${courseId}/quizzes`);
  return response.data;
};
export const findQuizById = async (quizId) => {
  const response = await axios.get(`${QUIZZES_URL}/${quizId}`);
  return response.data;
}
export const createQuiz = async (courseId, quiz) => {
    const response = await axios.post(
      `${COURSES_URL}/${courseId}/quizzes`,
      quiz
    );
    return response.data;
  };
  
  export const deleteQuiz = async (quizId) => {
    const response = await axios
      .delete(`${QUIZZES_URL}/${quizId}`);
    return response.data;
  };
  export const updateQuiz = async (quiz) => {
    const response = await axios.
      put(`${QUIZZES_URL}/${quiz._id}`, quiz);
    return response.data;
  };
  