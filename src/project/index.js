import Signin from "../users/signin";
import Signup from "../users/signup";
import Account from "../users/account";
import UserTable from "../users/table";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "../Nav.js";
import Sidebar from "./Sidebar";
function Project() {
  return (
    <div>
    <Nav />
    <div className="row">
      <div className="col-2">
        <Sidebar/>
      </div>
      <div className="col-10">
        <Routes>
          <Route path="/" element={<Navigate to="/project/home" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/admin/users" element={<UserTable />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}
export default Project;

