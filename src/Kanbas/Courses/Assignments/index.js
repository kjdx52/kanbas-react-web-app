import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import AssignmentsBar from "./AssignmentsBar";
import { BsGripVertical, BsCalculator } from "react-icons/bs";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignments = db.assignments;
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <div className="mx-2">
      <AssignmentsBar />
      <div
        className="list-group my-2"
        style={{ borderLeft: "3px solid green" }}
      >
        <div className="list-group-item list-group-item-secondary">
          {courseId}
        </div>

        {courseAssignments.map((assignment) => (
          <div
            className="list-group-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <BsGripVertical className="ms-2" />
            <BsCalculator className="ms-2" style={{ color: "green" }} />
            <Link
              key={assignment._id}
              to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
              style={{ flex: 1 }}
              className="ms-2 assignment-link"
            >
              {assignment.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Assignments;
