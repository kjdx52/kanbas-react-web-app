import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import "./index.css";
function KanbasNavigation() {
  const links = ["Account", "Dashboard", "Courses", "Calendar"];

  const linkToIconMap = {
    Account: <BiUserCircle className="wd-icon wd-account-icon" />,
    Dashboard: <RiDashboard3Fill className="wd-icon" />,
    Courses: <FaBook className="wd-icon" />,
    Calendar: <BsFillCalendar2WeekFill className="wd-icon" />,
  };

  const { pathname } = useLocation();
  return (
    <div>
    <div className="list-group wd-kanbas-navigation " style={{ width: 100, position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,}}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/Kanbas/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          {linkToIconMap[link]}
          <br/>
          <div className="wd-kanbas-navigation-words">
            {link}
          </div>
          
        </Link>
      ))}
    </div>
    <div style={{width:100}}>

    </div>

    </div>
  );
}
export default KanbasNavigation;