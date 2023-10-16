import React from 'react';
import {FaBan} from 'react-icons/fa6';
import {AiFillCheckCircle} from 'react-icons/ai';

const HomeStatus = () => {
  return (
    <div className="float-end d-none d-md-block" style={{ marginLeft: '20px' }}>
      <h5>Course Status</h5>
      <button className="btn btn-secondary"> <FaBan className='mb-1' /> Unpublish</button>
      <button className="btn btn-success"> <AiFillCheckCircle className='mb-1' /> Publish</button>
      <ul className="list-group">
        <li className="list-group-item">Import Existing Content</li>
        <li className="list-group-item">Import From Common</li>
        <li className="list-group-item">Choose Home Page</li>
        <li className="list-group-item">View Course Stream</li>
        <li className="list-group-item">New Announcement</li>
        <li className="list-group-item">New Analytics</li>
        <li className="list-group-item">View Course Notifications</li>
      </ul>
      <div><span style={{ fontWeight: 'bold' }}>Coming Up</span> View Calendar</div>
      <ul className="list-group">
        <li className="list-group-item">Lecture CS5610 AT 19.00</li>
      </ul>
      <ul className="list-group">
        <li className="list-group-item">Lecture CS5610 AT 16.00</li>
      </ul>
    </div>
  );
}

export default HomeStatus;
