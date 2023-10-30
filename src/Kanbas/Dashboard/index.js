import { Link } from "react-router-dom";
import { React } from "react";
function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }
) {
  
  return (
    <div className="ms-3">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
      <div className="d-flex justify-content-end">
      <button 
      className="btn btn-success mx-2"
      onClick={addNewCourse} >
        Add
      </button>
      <button 
      className="btn btn-info mx-2"
      onClick={updateCourse} >
        Update
      </button>
      </div>
      


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
                <br/>
                <button
                className="btn btn-secondary"
              onClick={(event) => {
                event.preventDefault();
                setCourse(course);
              }}>
              Edit
            </button>

                <button
                className="btn btn-danger"
              onClick={(event) => {
                event.preventDefault();
                deleteCourse(course._id);
              }}>
              Delete
            </button>

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
