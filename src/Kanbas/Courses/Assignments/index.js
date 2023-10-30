import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import AssignmentsBar from "./AssignmentsBar";
import { BsGripVertical, BsCalculator } from "react-icons/bs";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignment } from "./assignmentsReducer";

function Assignments() {
  const { courseId } = useParams();
  const assignment = useSelector((state) => state.assignmentsReducer.assignment);
  const assignments = useSelector((state) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId
  );

  const handleDeleteClick = (assignment) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this assignment?");
    if (isConfirmed) {
      dispatch(deleteAssignment(assignment._id));
    }
  };
  return (
    <div className="mx-2">
      <AssignmentsBar courseId={courseId} />
      <div
        className="list-group my-2"
        style={{ borderLeft: "3px solid green" }}
      >
        <div className="list-group-item list-group-item-secondary">
          {courseId}
        </div>

        {courseAssignments.map((Assignment) => (
          <div
            className="list-group-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <BsGripVertical className="ms-2" />
            <BsCalculator className="ms-2" style={{ color: "green" }} />
            <div className="my-0 py-0" style={{ flex: 1 }}>
              <Link
                key={Assignment._id}
                to={`/Kanbas/Courses/${courseId}/Assignments/Edit/${Assignment._id}`}
                className="ms-2 mt-auto assignment-link"
                onClick={() => { dispatch(setAssignment(Assignment)) }}
              >
                {Assignment.title}
              </Link>
              <br />
              <p className="ms-2 mb-0 pb-0" style={{ fontSize: 14, }}>
                Due: {Assignment.dueDate.replace("T", " ")} | ~/{Assignment.points} pts
              </p>
              
            </div>
            <button 
            className="btn btn-danger"
            onClick={() => handleDeleteClick(Assignment)}>
                Delete
              </button>

          </div>
        ))}
      </div>
    </div>
  );
}
export default Assignments;
