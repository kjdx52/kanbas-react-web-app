import React from 'react';
import {FaFileImport,FaFileExport} from 'react-icons/fa6';
import {BsFillGearFill} from 'react-icons/bs';

const GradesUpperButtons = () => {
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
      <button className="btn btn-secondary mx-2"> <FaFileImport/> Import</button>
      <button className="btn btn-secondary mx-2"> <FaFileExport/> Export</button>
      <button className="btn btn-secondary mx-2"> <BsFillGearFill/> </button>
      </div>
      <div className='container'>
        <div className="row">
        <div className="col"><h5>Student Names</h5></div>
        <div className="col"><h5>Assignments Names</h5></div>
      </div>

      <div className="row">
        <div className="col pe-5"><input className="form-control" type="text" placeholder="Search Students" /></div>
        <div className="col pe-5"><input className="form-control" type="text" placeholder="Search Assignments" /></div>
      </div>
      </div>
      

      <button className="btn btn-secondary my-3"> <i className="fa-solid fa-filter"></i> Apply Filters</button>
    
    </div>
  );
}

export default GradesUpperButtons;
