import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {FaEllipsisVertical} from 'react-icons/fa6';
import { Link } from "react-router-dom";
const AssignmentsBar = ({courseId}) => {
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
      <div style={{ display: 'flex' }}>
        <input type="text" className="form-control w-25" placeholder="Search for Assignments" />
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-secondary"><AiOutlinePlus/> Group</button>

          <Link
              to={`/Kanbas/Courses/${courseId}/Assignments/Creator`}
              className="mt-auto assignment-link"
            >
              <button className="btn btn-danger"><AiOutlinePlus/> Assignments</button>
            </Link>

          
          <button className="btn btn-secondary"><FaEllipsisVertical/> </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentsBar;
