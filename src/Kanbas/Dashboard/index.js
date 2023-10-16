import db from "../Database";
import { Link } from "react-router-dom";
function Dashboard() {
  const courses = db.courses;
  return (
    <div className="ms-3">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <div class="d-flex flex-row flex-wrap ">
        {courses.map((course, index) => (
          <div className="px-4 py-4">
            <div class="card" style={{ width: "280px" }}>
              <img
                src="logo192.png"
                class="card-img-top"
                alt="..."
                style={{ height: "200px" }}
              />
              <div class="card-body">
                <h5 class="card-title">{course.name}</h5>

                <Link
                  key={course._id}
                  to={`/Kanbas/Courses/${course._id}`}
                  className="btn btn-primary"
                >
                  {course.name}
                </Link>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
