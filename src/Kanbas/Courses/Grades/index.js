import db from "../../Database";
import { useParams } from "react-router-dom";
import GradesUpperButtons from "./GradesUpperButtons";
function Grades() {
  const { courseId } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  const enrollments = db.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
  return (
    <div className="my-2 mx-2">
      <GradesUpperButtons />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <th>Student Name</th>
            {assignments.map((assignment) => (
              <th>{assignment.title}</th>
            ))}
          </thead>

          <tbody>
            {enrollments.map((enrollment) => {
              const user = db.users.find(
                (user) => user._id === enrollment.user
              );
              return (
                <tr>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  {assignments.map((assignment) => {
                    const grade = db.grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return <td>{grade?.grade || ""}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
