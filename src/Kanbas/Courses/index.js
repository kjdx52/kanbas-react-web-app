import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import CourseName from "./CourseName";
import AssignmentCreator from "./Assignments/AssignmentCreator";
import Quizzes from "./Quizzes";
import QuizzesEditor from "./Quizzes/QuizzesEditor";
import QuizScreen from "./Quizzes/QuizScreen";
import QuestionsEditor from "./Quizzes/QuizzesEditor/Questions/QuestionsEditor";
import QuizPreview from "./Quizzes/QuizPreview";
function Courses({  }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const API_BASE = process.env.REACT_APP_API_BASE;
  const URL = `${API_BASE}/courses`;
  const findCourseById = async (courseId) => {
    const response = await axios.get(
      `${URL}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);


  // const course = courses.find((course) => course._id === courseId);
  return (
    <div>
      <CourseName course={course}/>
      <div>
        <CourseNavigation />
        <div>
          <div
            className="overflow-y-scroll position-fixed bottom-0 end-0"
            style={{
              left: "320px",
              top: "50px",
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route
                path="Assignments/Edit/:assignmentId"
                element={<AssignmentEditor />}
              />
              <Route
                path="Assignments/Creator"
                element={<AssignmentCreator />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/Edit/:quizId/*" element={<QuizzesEditor mode="Edit"/>} />
              <Route path="Quizzes/Creator/*" element={<QuizzesEditor mode="Create"/>} />
              <Route path="Quizzes/Screen/:quizId/*" element={<QuizScreen/>} />
              <Route path="Quizzes/Preview/:quizId/*" element={<QuizPreview/>} />
              <Route path="Questions/Add/:quizId/*" element={<QuestionsEditor mode="Add"/>} />
              <Route path="Questions/Creator/*" element={<QuestionsEditor mode="Create"/>} />
              <Route path="Questions/Update/:questionId/*" element={<QuestionsEditor mode="Edit"/>} />
              <Route path="Grades" element={<Grades />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Courses;
