import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faHome, faNewspaper, faCog, faBox, faTicket, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  // Use the current location to determine the active button
  const location = useLocation();
  // State to manage the collapsed/expanded state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("activeButton") || location.pathname
  );

  // Handle button clicks and update the active button
  const handleClick = (buttonName, path) => {
    if (activeButton !== path) {
      setActiveButton(path);
      localStorage.setItem("activeButton", path);
    }
  };

  // Use useEffect to add a resize event listener and handle collapsing the sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector(".Sidebar");
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <ul>
        {/* Sidebar buttons with links */}
        <br></br>

        <div>
          <Link to="/home">
            <button
              onClick={() => handleClick("home", "/home")}
              className={`icon-button ${
                activeButton === "/home" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon icon={faHome} className="icon" title="Home" />
                <span className="label">Home</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/ShiftCalendar">
            <button
              onClick={() => handleClick("ShiftCalendar", "/ShiftCalendar")}
              className={`icon-button ${
                activeButton === "/ShiftCalendar" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon icon={faBox} className="icon" title="Shift Calendar" />
                <span className="label">ShiftCalendar</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/ProgramCalendar">
            <button
              onClick={() => handleClick("ProgramCalendar", "/ProgramCalendar")}
              className={`icon-button ${
                activeButton === "/ProgramCalendar" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon icon={faBox} className="icon" title="Program Calendar" />
                <span className="label">ProgramCalendar</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/BeamDest">
            <button
              onClick={() => handleClick("BeamDestination", "/BeamDestination")}
              className={`icon-button ${
                activeButton === "/BeamDestination" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon icon={faBox} className="icon" title="Beam Destination" />
                <span className="label">BeamDestination</span>
              </div>
            </button>
          </Link>
        </div>

      </ul>
    </div>


  );
}

export default Sidebar;