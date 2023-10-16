import React from "react";
import { useParams, useLocation } from "react-router-dom";
import db from "../../Kanbas/Database";
import { FaBars, FaGlasses } from "react-icons/fa";
import { Link } from 'react-router-dom';

function CourseName() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const [empty, kanbas, courses, id, screen] = pathname.split("/");
  const course = db.courses.find((course) => course._id === courseId);

  return (
    <div className="d-None d-md-block">
      <div className="row align-items-center  d-flex ">
        <div className="col-auto">
          <button className="btn" type="button">
            <FaBars
              className="text-danger mt-2 ms-3"
              style={{ fontSize: "20px" }}
            />
          </button>
        </div>
        <div className="col ps-0 pt-1">
          <nav
            style={{ "-bs-breadcrumb-divider": "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb pt-3">
              <li className="breadcrumb-item">
                <Link to={`/Kanbas/Courses/${course._id}`} className="text-danger text-decoration-none">
                  {course.name}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {screen}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-2 justify-content-end">
          <button
            type="button"
            className="btn btn-light border border-secondary-subtle float-end"
          >
            <FaGlasses /> Student View
          </button>
        </div>
      </div>
    </div>
  );
}
export default CourseName;
