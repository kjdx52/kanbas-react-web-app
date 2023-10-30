import { React, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./modulesReducer";

function ModuleList() {
  const { courseId } = useParams();
  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();



  return (
    <ul className="list-group">
      <li className="list-group-item">
        <div style={{ display: "flex" }}>

          <div className="col">
            <div className="row">
              <input className="form-control" value={module.name}
                onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
              />
            </div>
            <div className="row">
              <textarea className="form-control" value={module.description}
                onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
              />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center ms-4" style={{ width: 120 }}>
            <button className="btn btn-success mb-2" style={{ height: "40px", width: "80px" }}
              onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
              Add
            </button>
            <button className="btn btn-primary" style={{ height: "40px", width: "80px" }}
              onClick={() => dispatch(updateModule(module))}>
              Update
            </button>
          </div>



        </div>


      </li>

      {
        modules
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item list-group-item-secondary">
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                </div>
                <div>
                  <button
                    style={{ height: "40%" }}
                    className="btn btn-success"
                    onClick={() => dispatch(setModule(module))}>
                    Edit
                  </button>

                  <button
                    style={{ height: "40%" }}
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteModule(module._id))}>
                    Delete
                  </button>
                </div>

              </div>



            </li>
          ))
      }
    </ul>
  );
}
export default ModuleList;

