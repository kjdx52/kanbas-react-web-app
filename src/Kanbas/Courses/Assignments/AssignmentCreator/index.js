import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignment } from "../assignmentsReducer";



function AssignmentCreator() {
    // const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const setAssignmentDefault = () =>{
        dispatch(setAssignment({ title: "New Assignment",description:"new description",dueDate:null,availableFromDate:null,availableUntilDate:null,"points":100}))
    }

    const handleSave = () => {
        if(assignment.dueDate==null||assignment.availableFromDate==null||assignment.availableUntilDate==null
            ||assignment.title?.length==0){
                alert("Please Complete all input!")
                return;
            }
        dispatch(addAssignment({ ...assignment, course: courseId }));
        setAssignmentDefault();
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    const handleCancel = () => {
        setAssignmentDefault();
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    }

    return (
<form>
        <div className="form-group" style={{width:"80%"}}>
            <h2>Create Assignment</h2>
            <h6><label className="" for="assignmentTitle">Assignment Title</label></h6>
            <input
                id="assignmentTitle"
                value={assignment.title}
                className="form-control mb-2" 
                onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))}
                />
            <h6><label className="" for="assignmentDescription">Assignment Title</label></h6>
            <textarea
                id="assignmentDescription"
                value={assignment.description}
                className="form-control mb-2" 
                onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))}
                />
            <h6><label className="" for="assignmentPoints">Points</label></h6>
            <input
                id="assignmentPoints"
                type="number"
                value={assignment.points}
                className="form-control mb-2" 
                onChange={(e) => dispatch(setAssignment({ ...assignment, points: e.target.value }))}
                />

            <h6><label for="assignmentDueDate">Due</label></h6>
            <input 
            id="assignmentDueDate" 
            class="form-control" 
            type="datetime-local" 
            value={assignment.dueDate} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))}
            />
            <div>
                <div class="row">
                    <div class="col">
                        <h6><label for="assignmentAvailableFromDate">Avaliable From</label></h6>
                    </div>
                    <div class="col">
                        <h6><label for="assignmentAvailableUntilDate">Untill</label></h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                            <input 
                            id="assignmentAvailableFromDate" 
                            class="form-control" 
                            type="datetime-local" 
                            value={assignment.availableFromDate} 
                            onChange={(e) => dispatch(setAssignment({ ...assignment, availableFromDate: e.target.value }))}
                            />

                    </div>
                    <div class="col">
                            <input 
                            id="assignmentAvailableUntilDate" 
                            class="form-control" 
                            type="datetime-local" 
                            value={assignment.availableUntilDate} 
                            onChange={(e) => dispatch(setAssignment({ ...assignment, availableUntilDate: e.target.value }))}
                            />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
            <button onClick={handleCancel} className="btn btn-danger ms-2">
                Cancel
            </button>
            <button onClick={handleSave} className="btn btn-success ms-2">
                Save
            </button>
            </div>
            
        </div>
        </form>
    );
}


export default AssignmentCreator;

